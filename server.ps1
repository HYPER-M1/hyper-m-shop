function Send-JsonResponse($stream, $statusCode, $statusText, $bodyText) {
    try {
        $respBytes = [System.Text.Encoding]::UTF8.GetBytes($bodyText)
        $header = "HTTP/1.1 $statusCode $statusText`r`n" +
                  "Content-Type: application/json; charset=utf-8`r`n" +
                  "Content-Length: $($respBytes.Length)`r`n" +
                  "Access-Control-Allow-Origin: *`r`n" +
                  "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                  "Access-Control-Allow-Headers: Content-Type`r`n" +
                  "Connection: close`r`n`r`n"
        $headerBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
        $stream.Write($headerBytes, 0, $headerBytes.Length)
        $stream.Write($respBytes, 0, $respBytes.Length)
    } catch {
        Write-Host "Warning: Failed to send response: $_"
    }
}

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
                                
                                if ($path -eq "/api/create-order") {
                                    try {
                                        $keyId = [System.Environment]::GetEnvironmentVariable("RAZORPAY_KEY_ID")
                                        $keySecret = [System.Environment]::GetEnvironmentVariable("RAZORPAY_KEY_SECRET")
                                        if ([string]::IsNullOrEmpty($keyId) -or [string]::IsNullOrEmpty($keySecret)) {
                                            $respText = '{"success":false,"error":"Server environment variables RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are not configured."}'
                                            Send-JsonResponse $stream "500" "Internal Server Error" $respText
                                            continue
                                        }

                                        $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes)
                                        $bodyJson = ConvertFrom-Json $bodyText
                                        $amount = $bodyJson.amount

                                        if ($null -eq $amount -or $amount -lt 100) {
                                            $respText = '{"success":false,"error":"Minimum amount is 100 paise (INR 1)."}'
                                            Send-JsonResponse $stream "400" "Bad Request" $respText
                                            continue
                                        }

                                        $helperPath = "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\razorpay-helper-publish\razorpay-helper.exe"
                                        $helperOutput = & $helperPath "create-order" "$amount" 2>&1 | Out-String
                                        $helperOutput = $helperOutput.Trim()

                                        $resObj = ConvertFrom-Json $helperOutput
                                        if ($resObj.success -eq $true) {
                                            $resObj | Add-Member -MemberType NoteProperty -Name "key_id" -Value $keyId
                                            $successJson = ConvertTo-Json $resObj -Compress
                                            Send-JsonResponse $stream "200" "OK" $successJson
                                        } else {
                                            Send-JsonResponse $stream "400" "Bad Request" $helperOutput
                                        }
                                    } catch {
                                        $errMessage = $_.Exception.Message
                                        $respText = "{\`"success\`":false,\`"error\`":\`"$($errMessage -replace '"', '\"')\`"}"
                                        Send-JsonResponse $stream "500" "Internal Server Error" $respText
                                    }
                                }
                                elseif ($path -eq "/api/verify-payment") {
                                    try {
                                        $keyId = [System.Environment]::GetEnvironmentVariable("RAZORPAY_KEY_ID")
                                        $keySecret = [System.Environment]::GetEnvironmentVariable("RAZORPAY_KEY_SECRET")
                                        if ([string]::IsNullOrEmpty($keyId) -or [string]::IsNullOrEmpty($keySecret)) {
                                            $respText = '{"success":false,"error":"Server environment variables RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are not configured."}'
                                            Send-JsonResponse $stream "500" "Internal Server Error" $respText
                                            continue
                                        }

                                        $bodyText = [System.Text.Encoding]::UTF8.GetString($bodyBytes)
                                        $bodyJson = ConvertFrom-Json $bodyText
                                        
                                        $paymentId = $bodyJson.razorpay_payment_id
                                        $orderId = $bodyJson.razorpay_order_id
                                        $signature = $bodyJson.razorpay_signature
                                        
                                        $txnId = $bodyJson.txnId
                                        $username = $bodyJson.username
                                        $contact = $bodyJson.contact
                                        $product = $bodyJson.product
                                        $duration = $bodyJson.duration
                                        $price = $bodyJson.price

                                        if ([string]::IsNullOrEmpty($paymentId) -or [string]::IsNullOrEmpty($orderId) -or [string]::IsNullOrEmpty($signature)) {
                                            $respText = '{"success":false,"error":"Missing required payment verification fields."}'
                                            Send-JsonResponse $stream "400" "Bad Request" $respText
                                            continue
                                        }

                                        $helperPath = "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\razorpay-helper-publish\razorpay-helper.exe"
                                        $helperOutput = & $helperPath "verify-payment" "$paymentId" "$orderId" "$signature" 2>&1 | Out-String
                                        $helperOutput = $helperOutput.Trim()

                                        $resObj = ConvertFrom-Json $helperOutput
                                        if ($resObj.success -eq $true) {
                                            # Update orders.json
                                            $ordersFile = Join-Path $dbDir "orders.json"
                                            $orders = @()
                                            if (Test-Path $ordersFile) {
                                                $ordersContent = [System.IO.File]::ReadAllText($ordersFile)
                                                if (![string]::IsNullOrEmpty($ordersContent.Trim())) {
                                                    $orders = ConvertFrom-Json $ordersContent
                                                    if ($orders -isnot [System.Array]) { $orders = @($orders) }
                                                }
                                            }
                                            
                                            $newOrder = [PSCustomObject]@{
                                                id = $txnId
                                                username = $username
                                                contact = $contact
                                                product = $product
                                                duration = $duration
                                                price = $price
                                                method = "RAZORPAY"
                                                utr = $paymentId
                                                date = (Get-Date).ToString("dd-MM-yyyy HH:mm:ss")
                                                status = "Approved"
                                            }
                                            $orders += $newOrder
                                            [System.IO.File]::WriteAllText($ordersFile, (ConvertTo-Json $orders -Depth 10))
                                            
                                            # Update keys.json
                                            $keysFile = Join-Path $dbDir "keys.json"
                                            $keys = @()
                                            if (Test-Path $keysFile) {
                                                $keysContent = [System.IO.File]::ReadAllText($keysFile)
                                                if (![string]::IsNullOrEmpty($keysContent.Trim())) {
                                                    $keys = ConvertFrom-Json $keysContent
                                                    if ($keys -isnot [System.Array]) { $keys = @($keys) }
                                                }
                                            }
                                            
                                            $keyIdx = -1
                                            for ($i = 0; $i -lt $keys.Length; $i++) {
                                                if ($keys[$i].product -eq $product -and $keys[$i].status -eq "Unused") {
                                                    $keyIdx = $i
                                                    break
                                                }
                                            }
                                            
                                            $allocatedKey = ""
                                            if ($keyIdx -ne -1) {
                                                $keys[$keyIdx].status = "Used"
                                                $keys[$keyIdx].assignedTo = $username
                                                $keys[$keyIdx].orderId = $txnId
                                                $keys[$keyIdx].useDate = (Get-Date).ToString("dd-MM-yyyy")
                                                $allocatedKey = $keys[$keyIdx].key
                                            } else {
                                                $rand = New-Object System.Random
                                                $chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                                                $genKey = "HYPERX-"
                                                for ($j=0; $j -lt 3; $j++) {
                                                    for ($k=0; $k -lt 4; $k++) {
                                                        $genKey += $chars[$rand.Next($chars.Length)]
                                                    }
                                                    if ($j -lt 2) { $genKey += "-" }
                                                }
                                                $allocatedKey = $genKey
                                                
                                                $newKeyObj = [PSCustomObject]@{
                                                    key = $allocatedKey
                                                    product = $product
                                                    duration = $duration
                                                    date = (Get-Date).ToString("dd-MM-yyyy")
                                                    status = "Used"
                                                    assignedTo = $username
                                                    orderId = $txnId
                                                    useDate = (Get-Date).ToString("dd-MM-yyyy")
                                                }
                                                $keys += $newKeyObj
                                            }
                                            
                                            [System.IO.File]::WriteAllText($keysFile, (ConvertTo-Json $keys -Depth 10))
                                            
                                            $verifyRespText = "{\`"success\`":true,\`"key\`":\`"$allocatedKey\`"}"
                                            Send-JsonResponse $stream "200" "OK" $verifyRespText
                                        } else {
                                            Send-JsonResponse $stream "400" "Bad Request" $helperOutput
                                        }
                                    } catch {
                                        $errMessage = $_.Exception.Message
                                        $respText = "{\`"success\`":false,\`"error\`":\`"$($errMessage -replace '"', '\"')\`"}"
                                        Send-JsonResponse $stream "500" "Internal Server Error" $respText
                                    }
                                }
                                else {
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
            Start-Sleep -Milliseconds 100
        } finally {
            if ($stream -ne $null) {
                try { $stream.Close() } catch {}
            }
            if ($client -ne $null) {
                try { $client.Close() } catch {}
            }
        }
    }
} finally {
    $listener.Stop()
}
