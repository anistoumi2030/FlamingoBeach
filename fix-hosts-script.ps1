$hostsPath = 'C:\Windows\System32\drivers\etc\hosts'
$content = Get-Content $hostsPath
$content = $content -replace '#\s*127\.0\.0\.1\s+localhost', '127.0.0.1       localhost'
$content = $content -replace '#\s*::1\s+localhost', '::1             localhost'
Set-Content -Path $hostsPath -Value $content -Force
Write-Host 'Hosts file updated successfully'
Get-Content $hostsPath | Select-String 'localhost'
