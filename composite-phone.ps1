$bgRemoverCode = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class BgRemoverFinal {
    public static void Remove(string inputPath, string outputPath) {
        using (Bitmap src = new Bitmap(inputPath)) {
            int w = src.Width;
            int h = src.Height;
            using (Bitmap dest = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
                bool[,] visited = new bool[w, h];
                bool[,] isBg = new bool[w, h];
                Queue<Point> q = new Queue<Point>();
                for (int x = 0; x < w; x++) { q.Enqueue(new Point(x, 0)); q.Enqueue(new Point(x, h - 1)); }
                for (int y = 1; y < h - 1; y++) { q.Enqueue(new Point(0, y)); q.Enqueue(new Point(w - 1, y)); }
                while (q.Count > 0) {
                    Point p = q.Dequeue();
                    int x = p.X, y = p.Y;
                    if (x < 0 || x >= w || y < 0 || y >= h || visited[x, y]) continue;
                    visited[x, y] = true;
                    Color c = src.GetPixel(x, y);
                    if (c.R > 230 && c.G > 230 && c.B > 230) {
                        isBg[x, y] = true;
                        q.Enqueue(new Point(x+1, y)); q.Enqueue(new Point(x-1, y));
                        q.Enqueue(new Point(x, y+1)); q.Enqueue(new Point(x, y-1));
                    }
                }
                for (int pass = 0; pass < 4; pass++) {
                    bool[,] next = (bool[,])isBg.Clone();
                    for (int y = 1; y < h - 1; y++)
                        for (int x = 1; x < w - 1; x++)
                            if (!isBg[x, y]) {
                                bool nb = isBg[x+1,y]||isBg[x-1,y]||isBg[x,y+1]||isBg[x,y-1]||isBg[x+1,y+1]||isBg[x-1,y-1]||isBg[x+1,y-1]||isBg[x-1,y+1];
                                if (nb) { Color c = src.GetPixel(x,y); if (c.R>130&&c.G>130&&c.B>130) next[x,y]=true; }
                            }
                    isBg = next;
                }
                for (int y = 0; y < h; y++)
                    for (int x = 0; x < w; x++)
                        dest.SetPixel(x, y, isBg[x,y] ? Color.FromArgb(0,0,0,0) : src.GetPixel(x, y));
                dest.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

$compositeCode = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class PhoneCompositorFinal {
    public static void WarpPhone(string srcPath, string destPath, string outputPath) {
        using (Bitmap srcBmp = new Bitmap(srcPath))
        using (Bitmap destBmp = new Bitmap(destPath)) {
            int W = destBmp.Width;
            int H = destBmp.Height;
            
            using (Bitmap resultBmp = new Bitmap(W, H, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(resultBmp)) {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    
                    g.DrawImage(destBmp, 0, 0, W, H);
                    
                    // Crop area of the phone screen in reference image
                    Rectangle srcRect = new Rectangle(276, 192, 164, 218);
                    
                    // Target phone screen coordinates in destination image
                    Point[] destPoints = new Point[] {
                        new Point(72, 145),  // Top-Left
                        new Point(112, 137), // Top-Right
                        new Point(92, 280)   // Bottom-Left
                    };
                    
                    g.DrawImage(srcBmp, destPoints, srcRect, GraphicsUnit.Pixel);
                }
                resultBmp.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $bgRemoverCode -ReferencedAssemblies System.Drawing
Add-Type -TypeDefinition $compositeCode -ReferencedAssemblies System.Drawing

# Step 1: Remove background from original high quality showcase
Write-Host "Step 1: Removing background..."
[BgRemoverFinal]::Remove("C:\Users\manis\.gemini\antigravity\brain\0c716c6a-0615-4c8a-8d93-1dacde739743\media__1783755644384.png", "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\showcase-clean.png")

# Step 2: Warp reference phone screen onto target showcase phone using new class to force reload
Write-Host "Step 2: Warping phone screen..."
[PhoneCompositorFinal]::WarpPhone("C:\Users\manis\.gemini\antigravity\brain\0c716c6a-0615-4c8a-8d93-1dacde739743\media__1783756615391.png", "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\showcase-clean.png", "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\showcase-combined.png")

# Cleanup
Remove-Item -Path "C:\Users\manis\.gemini\antigravity\scratch\hyper-m-shop\showcase-clean.png" -Force -ErrorAction SilentlyContinue
Write-Host "Done!"
