import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import cwatMascot from "@/assets/cwat-mascot.png";
import leftEar from "@/assets/cwat-left-ear.png";
import rightEar from "@/assets/cwat-right-ear.png";
import leftEye from "@/assets/cwat-left-eye.png";
import rightEye from "@/assets/cwat-right-eye.png";
import mouthProp from "@/assets/cwat-mouth-prop.png";

const CANVAS_SIZE = 500;

const props = [
  { src: leftEar, label: "Left Ear" },
  { src: rightEar, label: "Right Ear" },
  { src: leftEye, label: "Left Eye" },
  { src: rightEye, label: "Right Eye" },
  { src: mouthProp, label: "Mouth" },
];

const PfpGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || fabricRef.current) return;
    const fc = new fabric.Canvas(canvasRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: "#1a2a2a",
      preserveObjectStacking: true,
    });
    fabricRef.current = fc;
    setReady(true);

    return () => {
      fc.dispose();
      fabricRef.current = null;
    };
  }, []);

  const addImageToCanvas = (src: string, scale = 0.3) => {
    const fc = fabricRef.current;
    if (!fc) return;
    fabric.Image.fromURL(src, (img) => {
      img.scaleToWidth(CANVAS_SIZE * scale);
      img.set({
        left: CANVAS_SIZE / 2 - (img.getScaledWidth() / 2),
        top: CANVAS_SIZE / 2 - (img.getScaledHeight() / 2),
        cornerColor: "#E889BA",
        cornerStrokeColor: "#E889BA",
        borderColor: "#E889BA",
        cornerSize: 10,
        transparentCorners: false,
      });
      fc.add(img);
      fc.setActiveObject(img);
      fc.renderAll();
    }, { crossOrigin: "anonymous" });
  };

  const handleUploadBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const fc = fabricRef.current!;
      fabric.Image.fromURL(ev.target?.result as string, (img) => {
        const scale = Math.max(CANVAS_SIZE / img.width!, CANVAS_SIZE / img.height!);
        img.set({ scaleX: scale, scaleY: scale, originX: "center", originY: "center" });
        fc.setBackgroundImage(img, () => fc.renderAll(), {
          left: CANVAS_SIZE / 2,
          top: CANVAS_SIZE / 2,
          originX: "center",
          originY: "center",
        });
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      addImageToCanvas(ev.target?.result as string, 0.8);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleUploadProp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      addImageToCanvas(ev.target?.result as string, 0.3);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const deleteSelected = () => {
    const fc = fabricRef.current;
    if (!fc) return;
    const obj = fc.getActiveObject();
    if (obj) {
      fc.remove(obj);
      fc.renderAll();
    }
  };

  const bringForward = () => {
    const fc = fabricRef.current;
    if (!fc) return;
    const obj = fc.getActiveObject();
    if (obj) {
      fc.bringForward(obj);
      fc.renderAll();
    }
  };

  const download = () => {
    const fc = fabricRef.current;
    if (!fc) return;
    fc.discardActiveObject();
    fc.renderAll();
    const url = fc.toDataURL({ format: "png", quality: 1, multiplier: 2 });
    const a = document.createElement("a");
    a.href = url;
    a.download = "cwat-pfp.png";
    a.click();
  };

  return (
    <section id="pfp" className="py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl text-foreground mb-2">
          THE <span className="text-primary">LABORATORY</span>
        </h2>
        <p className="font-body text-muted-foreground mb-10 text-lg">
          Build your anomaly. Drag, scale, and rotate layers natively.
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Canvas */}
          <div className="bg-card/50 backdrop-blur rounded-2xl border-2 border-border p-4 shadow-xl">
            <canvas
              ref={canvasRef}
              className="rounded-xl"
              style={{ maxWidth: "100%", touchAction: "none" }}
            />
          </div>

          {/* Tools Panel */}
          <div className="bg-card/50 backdrop-blur rounded-2xl border-2 border-border p-6 shadow-xl w-full lg:w-80 text-left space-y-6">
            {/* 1. Background */}
            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
                1. Environment (Background)
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const fc = fabricRef.current;
                    if (fc) { fc.setBackgroundImage("" as any, () => {}); fc.backgroundColor = "#0d2618"; fc.renderAll(); }
                  }}
                  className="px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Dark Forest
                </button>
                <button
                  onClick={() => {
                    const fc = fabricRef.current;
                    if (fc) { fc.setBackgroundImage("" as any, () => {}); fc.backgroundColor = "#0d1a2e"; fc.renderAll(); }
                  }}
                  className="px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Spirit Blue
                </button>
                <label className="px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  Upload Custom BG
                  <input type="file" accept="image/*" onChange={handleUploadBg} className="hidden" />
                </label>
              </div>
            </div>

            {/* 2. Subject */}
            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
                2. The Subject
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => addImageToCanvas(cwatMascot, 0.6)}
                  className="px-4 py-2 text-sm font-body rounded-bubble border-2 border-primary bg-primary/10 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Spawn $CWAT
                </button>
                <label className="px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  Upload Your Photo
                  <input type="file" accept="image/*" onChange={handleUploadPhoto} className="hidden" />
                </label>
              </div>
            </div>

            {/* 3. Props */}
            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-widest text-muted-foreground mb-3">
                3. Anomalies & Props
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {props.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => addImageToCanvas(p.src, 0.25)}
                    className="aspect-square rounded-lg border border-border bg-muted/50 p-1 hover:border-primary hover:scale-105 transition-all overflow-hidden"
                    title={p.label}
                  >
                    <img src={p.src} alt={p.label} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
              <label className="block w-full text-center px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                Upload Custom Prop
                <input type="file" accept="image/*" onChange={handleUploadProp} className="hidden" />
              </label>
            </div>

            {/* Layer Controls */}
            <div className="border-t border-border pt-4">
              <h3 className="font-body font-bold text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Layer Controls
              </h3>
              <p className="text-xs text-muted-foreground mb-3">Select an item on the canvas first.</p>
              <div className="flex gap-2">
                <button
                  onClick={deleteSelected}
                  className="flex-1 px-4 py-2 text-sm font-body rounded-bubble border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  Delete Selected
                </button>
                <button
                  onClick={bringForward}
                  className="flex-1 px-4 py-2 text-sm font-body rounded-bubble border border-border bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Bring Forward
                </button>
              </div>
            </div>

            {/* Download */}
            <button
              onClick={download}
              className="w-full py-4 bg-foreground text-background font-body font-bold text-lg rounded-bubble
                         hover:scale-[1.02] active:scale-95 transition-transform animate-pulse-pink"
            >
              Download Masterpiece 🎨
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PfpGenerator;
