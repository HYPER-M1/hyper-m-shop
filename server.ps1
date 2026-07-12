$port = 8000
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "Server started on port $port..."

# Initialize DB directory
$dbDir = "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\db"
if (!(Test-Path $dbDir)) { New-Item -ItemType Directory -Path $dbDir | Out-Null }

try {
    while ($true) {
        $client = $null
        $stream = $null
        try {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            
            # 1MB buffer to accommodate database JSON file transfers
            $buffer = New-Object System.Byte[] 1048576
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            if ($bytesRead -gt 0) {
                $requestStr = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
                
                # Split headers and body
                $partsSplit = $requestStr -split "`r`n`r`n", 2
                $headersPart = $partsSplit[0]
                $bodyPart = ""
                if ($partsSplit.Length -gt 1) {
                    $bodyPart = $partsSplit[1]
                }
                
                $lines = $headersPart -split "`r`n"
                if ($lines.Length -gt 0) {
                    $requestLine = $lines[0] -split " "
                    if ($requestLine.Length -ge 2) {
                        $method = $requestLine[0]
                        $path = $requestLine[1]
                        
                        # Strip query parameters
                        if ($path.Contains("?")) {
                            $path = $path.Substring(0, $path.IndexOf("?"))
                        }
                        
                        if ($path.StartsWith("/api/")) {
                            $dbName = $path.Substring(5) -replace "[^a-zA-Z0-9_-]", ""
                            $filePath = Join-Path $dbDir "$dbName.json"
                            
                            if ($method -eq "GET") {
                                if (Test-Path $filePath -PathType Leaf) {
                                    $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                                    $header = "HTTP/1.1 200 OK`r`n" +
                                              "Content-Type: application/json; charset=utf-8`r`n" +
                                              "Content-Length: $($fileBytes.Length)`r`n" +
                                              "Access-Control-Allow-Origin: *`r`n" +
                                              "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                                              "Access-Control-Allow-Headers: Content-Type`r`n" +
                                              "Connection: close`r`n`r`n"
                                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                                    $stream.Write($fileBytes, 0, $fileBytes.Length)
                                } else {
                                    $errText = "404 Not Found"
                                    $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errText)
                                    $header = "HTTP/1.1 404 Not Found`r`n" +
                                              "Content-Type: text/plain`r`n" +
                                              "Content-Length: $($errBytes.Length)`r`n" +
                                              "Access-Control-Allow-Origin: *`r`n" +
                                              "Connection: close`r`n`r`n"
                                    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                    $stream.Write($headerBytes, 0, $headerBytes.Length)
                                    $stream.Write($errBytes, 0, $errBytes.Length)
                                }
                            }
                            elseif ($method -eq "POST") {
                                # Parse Content-Length to determine if we need to read more packets
                                $contentLength = 0
                                foreach ($line in $lines) {
                                    if ($line -like "Content-Length:*") {
                                        $contentLength = [int]($line.Split(":")[1].Trim())
                                    }
                                }
                                
                                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyPart)
                                $currentBodyLength = $bodyBytes.Length
                                
                                # Read remainder of socket stream if payload was chunked
                                while ($currentBodyLength -lt $contentLength) {
                                    $chunk = New-Object System.Byte[] 65536
                                    $chunkRead = $stream.Read($chunk, 0, $chunk.Length)
                                    if ($chunkRead -le 0) { break }
                                    
                                    $newBodyBytes = New-Object System.Byte[] ($currentBodyLength + $chunkRead)
                                    [System.Array]::Copy($bodyBytes, 0, $newBodyBytes, 0, $currentBodyLength)
                                    [System.Array]::Copy($chunk, 0, $newBodyBytes, $currentBodyLength, $chunkRead)
                                    $bodyBytes = $newBodyBytes
                                    $currentBodyLength = $bodyBytes.Length
                                }
                                
                                # Save data payload to JSON file
                                [System.IO.File]::WriteAllBytes($filePath, $bodyBytes)
                                
                                $respText = '{"success":true}'
                                $respBytes = [System.Text.Encoding]::UTF8.GetBytes($respText)
                                $header = "HTTP/1.1 200 OK`r`n" +
                                          "Content-Type: application/json; charset=utf-8`r`n" +
                                          "Content-Length: $($respBytes.Length)`r`n" +
                                          "Access-Control-Allow-Origin: *`r`n" +
                                          "Connection: close`r`n`r`n"
                                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                $stream.Write($headerBytes, 0, $headerBytes.Length)
                                $stream.Write($respBytes, 0, $respBytes.Length)
                            }
                            elseif ($method -eq "OPTIONS") {
                                $header = "HTTP/1.1 200 OK`r`n" +
                                          "Access-Control-Allow-Origin: *`r`n" +
                                          "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                                          "Access-Control-Allow-Headers: Content-Type`r`n" +
                                          "Connection: close`r`n`r`n"
                                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                $stream.Write($headerBytes, 0, $headerBytes.Length)
                            }
                        } else {
                            # Static File Serving
                            $cleanPath = $path -replace "\.\.", ""
                            if ($cleanPath -eq "/" -or $cleanPath -eq "") { $cleanPath = "/index.html" }
                            $cleanPath = $cleanPath.Replace("/", "\").TrimStart("\")
                            
                            $filePath = Join-Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop" $cleanPath
                            
                            if (Test-Path $filePath -PathType Leaf) {
                                $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                                $contentType = "application/octet-stream"
                                if ($filePath.EndsWith(".html")) { $contentType = "text/html; charset=utf-8" }
                                elseif ($filePath.EndsWith(".css")) { $contentType = "text/css" }
                                elseif ($filePath.EndsWith(".js")) { $contentType = "application/javascript" }
                                elseif ($filePath.EndsWith(".png")) { $contentType = "image/png" }
                                elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $contentType = "image/jpeg" }
                                elseif ($filePath.EndsWith(".svg")) { $contentType = "image/svg+xml" }
                                
                                $header = "HTTP/1.1 200 OK`r`n" +
                                          "Content-Type: $contentType`r`n" +
                                          "Content-Length: $($fileBytes.Length)`r`n" +
                                          "Access-Control-Allow-Origin: *`r`n" +
                                          "Connection: close`r`n`r`n"
                                          
                                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                $stream.Write($headerBytes, 0, $headerBytes.Length)
                                $stream.Write($fileBytes, 0, $fileBytes.Length)
                            } else {
                                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                                $header = "HTTP/1.1 404 Not Found`r`n" +
                                          "Content-Type: text/plain`r`n" +
                                          "Content-Length: $($errBytes.Length)`r`n" +
                                          "Connection: close`r`n`r`n"
                                $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                                $stream.Write($headerBytes, 0, $headerBytes.Length)
                                $stream.Write($errBytes, 0, $errBytes.Length)
                            }
                        }
                    }
                }
            }
        } catch {
            Write-Host "Error handling stream: $_"
        } finally {
            if ($stream -ne $null) { $stream.Close() }
            if ($client -ne $null) { $client.Close() }
        }
    }
} finally {
    $listener.Stop()
}
