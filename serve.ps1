param(
  [string]$Root = "$PSScriptRoot\preview",
  [int]$Port = 8791
)

Add-Type -AssemblyName System.Net.HttpListener -ErrorAction SilentlyContinue

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root on http://localhost:$Port/"

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css"; ".js"="application/javascript";
  ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".webp"="image/webp";
  ".svg"="image/svg+xml"; ".gif"="image/gif"; ".ico"="image/x-icon"
}

while ($listener.IsListening) {
  try {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response
    $path = $req.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $Root ($path.TrimStart("/") -replace "/", "\")

    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $ct = $mime[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $res.ContentType = $ct
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
    $res.OutputStream.Close()
  } catch {
    Write-Host "Error: $_"
  }
}
