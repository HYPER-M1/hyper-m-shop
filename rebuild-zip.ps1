Remove-Item -Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\*.zip" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop-temp.zip" -Force -ErrorAction SilentlyContinue

$files = Get-ChildItem -Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\*" -Exclude "*.zip"
Compress-Archive -Path $files -DestinationPath "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop-temp.zip" -Force
Move-Item -Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop-temp.zip" -Destination "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\hyper-m-shop.zip" -Force
Write-Host "Zip updated successfully!"
