import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/image";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't add that photo.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        id="photo"
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {value ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-6 sm:flex-row">
          <img
            src={value}
            alt="Your uploaded couple photo"
            className="aspect-[4/5] w-36 arch object-cover shadow-soft"
          />
          <div className="space-y-3 text-center sm:text-left">
            <p className="font-display text-2xl">Lovely choice.</p>
            <p className="text-sm text-muted-foreground">
              This photo will appear in an arch frame on your proposal.
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Button type="button" variant="soft" size="sm" onClick={() => inputRef.current?.click()}>
                <ImagePlus /> Change photo
              </Button>
              <Button type="button" variant="quiet" size="sm" onClick={() => onChange(null)}>
                <X /> Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300",
            dragging
              ? "border-primary bg-secondary/50"
              : "border-input bg-card hover:border-primary/60 hover:bg-muted",
          )}
        >
          <span className="grid size-14 place-items-center rounded-full bg-secondary text-primary">
            {busy ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
          </span>
          <span className="font-display text-2xl">Add a photo of you two</span>
          <span className="text-sm text-muted-foreground">
            Drag it here or click to browse · JPG, PNG or WebP up to 10 MB
          </span>
        </button>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
