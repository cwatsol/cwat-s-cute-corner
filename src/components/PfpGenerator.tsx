import { useRef, useState, useCallback } from "react";
import cwatEyes from "@/assets/cwat-eyes.png";
import cwatMouth from "@/assets/cwat-mouth.png";
import cwatEars from "@/assets/cwat-ears.png";

const PfpGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const size = 512;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;

        // Draw uploaded photo (center crop)
        const scale = Math.max(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

        // Overlay CWAT features
        const loadOverlay = (src: string, x: number, y: number, ow: number, oh: number) =>
          new Promise<void>((resolve) => {
            const overlay = new Image();
            overlay.onload = () => {
              ctx.drawImage(overlay, x, y, ow, oh);
              resolve();
            };
            overlay.src = src;
          });

        Promise.all([
          loadOverlay(cwatEars, size * 0.1, -size * 0.05, size * 0.8, size * 0.4),
          loadOverlay(cwatEyes, size * 0.15, size * 0.25, size * 0.7, size * 0.35),
          loadOverlay(cwatMouth, size * 0.3, size * 0.55, size * 0.4, size * 0.25),
        ]).then(() => {
          setHasImage(true);
          setIsProcessing(false);
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "cwat-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section id="pfp" className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
          CWAT-ify Yourself
        </h2>
        <p className="font-body text-muted-foreground mb-10 text-lg">
          Upload your photo. Become the cat. 🐱
        </p>

        <div className="relative bg-card rounded-bubble border-2 border-border p-8 shadow-lg">
          <canvas
            ref={canvasRef}
            className="mx-auto rounded-xl mb-6 max-w-full"
            style={{ width: 300, height: 300, display: hasImage ? "block" : "none" }}
          />

          {!hasImage && !isProcessing && (
            <div className="w-[300px] h-[300px] mx-auto rounded-xl bg-muted flex items-center justify-center mb-6 border-2 border-dashed border-primary/40">
              <span className="text-muted-foreground font-body text-sm">Your CWAT PFP here</span>
            </div>
          )}

          {isProcessing && (
            <div className="w-[300px] h-[300px] mx-auto rounded-xl bg-muted flex items-center justify-center mb-6">
              <span className="text-primary font-body text-lg animate-pulse">CWAT-ifying... 🐱</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label className="px-8 py-3 bg-primary text-primary-foreground font-body font-bold rounded-bubble cursor-pointer
                              hover:scale-105 active:scale-95 transition-transform">
              Upload Photo 📸
              <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            </label>

            {hasImage && (
              <button
                onClick={handleDownload}
                className="px-8 py-3 bg-foreground text-background font-body font-bold rounded-bubble
                           hover:scale-105 active:scale-95 transition-transform"
              >
                Download PFP 💾
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PfpGenerator;
