$port = 8000
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "Server started on port $port..."

try {
    while ($true) {
        $client = $null
        $stream = $null
        try {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            
            $buffer = New-Object System.Byte[] 8192
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            if ($bytesRead -gt 0) {
                $requestStr = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $bytesRead)
                $lines = $requestStr -split "`r`n"
                if ($lines.Length -gt 0) {
                    $parts = $lines[0] -split " "
                    if ($parts.Length -ge 2) {
                        $path = $parts[1]
                        # Strip query parameters if any
                        if ($path.Contains("?")) {
                            $path = $path.Substring(0, $path.IndexOf("?"))
                        }
                        if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
                        
                        # Security: remove directory traversal
                        $path = $path -replace "\.\.", ""
                        $cleanPath = $path.Replace("/", "\").TrimStart("\")
                        
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
        } catch {
            # Catch aborted connections or connection reset errors safely without crashing the main loop
            Write-Host "Connection handle error: $_"
        } finally {
            if ($stream -ne $null) { $stream.Close() }
            if ($client -ne $null) { $client.Close() }
        }
    }
} finally {
    $listener.Stop()
}
