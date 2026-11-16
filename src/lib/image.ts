export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Downscale an image file to a JPEG data URL so it fits in browser storage. */
export function compressImage(file: File, maxSize = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file (JPG, PNG or WebP)."));
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      reject(new Error("That photo is over 10 MB. Please pick a smaller one."));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Couldn't process that photo."));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't read that photo. Try another one."));
    };
    img.src = url;
  });
}
