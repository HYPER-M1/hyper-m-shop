$port = 8000
$localDir = "C:\Users\manis\.gemini\antigravity\scratch\hyperx-wear"
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
$listener.Start()
Write-Host "HyperX Clothes Development Server started on http://localhost:$port"
Write-Host "Press Ctrl+C to stop the server."

function Send-JsonResponse($stream, $statusCode, $statusText, $jsonText) {
    $respBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonText)
    $header = "HTTP/1.1 $statusCode $statusText`r`n" +
              "Content-Type: application/json; charset=utf-8`r`n" +
              "Content-Length: $($respBytes.Length)`r`n" +
              "Access-Control-Allow-Origin: *`r`n" +
              "Connection: close`r`n`r`n"
    $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    $stream.Write($respBytes, 0, $respBytes.Length)
}

try {
    while ($true) {
        if (-not $listener.Pending()) {
            Start-Sleep -Milliseconds 100
            continue
        }
        
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream)
        
        # Read request header
        $requestLine = $reader.ReadLine()
        if ($null -eq $requestLine) {
            $client.Close()
            continue
        }
        
        $tokens = $requestLine -split " "
        if ($tokens.Length -lt 2) {
            $client.Close()
            continue
        }
        
        $method = $tokens[0]
        $url = $tokens[1]
        
        # Parse path
        $uri = New-Object System.Uri("http://localhost:$port$url")
        $path = $uri.AbsolutePath
        
        if ($path -eq "/" -or $path -eq "") {
            $path = "/index.html"
        }
        
        # Clean path to prevent directory traversal
        $cleanPath = $path -replace "\.\.", ""
        $cleanPath = $cleanPath.Replace("/", "\").TrimStart("\")
        
        # Resolve clean paths (e.g. /collection to collection.html)
        $filePath = Join-Path $localDir $cleanPath
        if (-not (Test-Path $filePath -PathType Leaf) -and (Test-Path "$filePath.html" -PathType Leaf)) {
            $filePath = "$filePath.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $contentType = "application/octet-stream"
            
            if ($filePath.EndsWith(".html")) { $contentType = "text/html; charset=utf-8" }
            elseif ($filePath.EndsWith(".css")) { $contentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $contentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $contentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $contentType = "image/jpeg" }
            elseif ($filePath.EndsWith(".svg")) { $contentType = "image/svg+xml" }
            elseif ($filePath.EndsWith(".webp")) { $contentType = "image/webp" }
            elseif ($filePath.EndsWith(".ico")) { $contentType = "image/x-icon" }
            
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
        
        $stream.Close()
        $client.Close()
    }
} finally {
    $listener.Stop()
}
