Add-Type -AssemblyName System.Drawing

function Make-PNG {
    param([string]$path, [int]$size)

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)

    # Background: TaskMind indigo #4F46E5
    $bg = [System.Drawing.Color]::FromArgb(255, 79, 70, 229)
    $g.Clear($bg)

    # Subtle white circle overlay
    $accentColor = [System.Drawing.Color]::FromArgb(60, 255, 255, 255)
    $accentBrush = New-Object System.Drawing.SolidBrush($accentColor)
    $margin = [int]($size * 0.08)
    $innerSize = $size - 2 * $margin
    $g.FillEllipse($accentBrush, $margin, $margin, $innerSize, $innerSize)

    # Draw 'T' letter centered in white
    $fontSize = [float]($size * 0.52)
    $font  = New-Object System.Drawing.Font("Arial", $fontSize, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $sf    = New-Object System.Drawing.StringFormat
    $sf.Alignment     = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect  = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias
    $g.DrawString("T", $font, $brush, $rect, $sf)

    $g.Dispose()
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created: $path ($size x $size px)"
}

$base = "e:\GitHub\Smart-task-planner-app---TaskaMind\assets"

Make-PNG "$base\favicon.png"       32
Make-PNG "$base\icon.png"          1024
Make-PNG "$base\adaptive-icon.png" 1024
Make-PNG "$base\splash.png"        1284

Write-Host "Done. All assets created."
