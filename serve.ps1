$prefix = "http://127.0.0.1:8000/"
$root = "C:\Users\asad\simple-site"

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Server started on $prefix"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    $path = $request.Url.LocalPath

    if ($path -eq "/") { $path = "/index.html" }
    $filePath = [System.IO.Path]::Combine($root, $path.TrimStart('/'))

    if ([System.IO.File]::Exists($filePath)) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath)
        switch ($ext) {
            ".html" { $contentType = "text/html; charset=utf-8" }
            ".css" { $contentType = "text/css; charset=utf-8" }
            ".js" { $contentType = "application/javascript; charset=utf-8" }
            default { $contentType = "application/octet-stream" }
        }

        $response.StatusCode = 200
        $response.ContentType = $contentType
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    }
    else {
        $response.StatusCode = 404
        $response.ContentType = "text/plain; charset=utf-8"
        $message = "Not Found"
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($message)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }

    $response.OutputStream.Close()
}
