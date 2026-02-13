/**
 * In-memory cache of HEIC → converted JPEG object URLs.
 * Preload when quiz starts so images appear instantly as user advances.
 */

const cache = new Map<string, string>();
const urlsToRevoke: string[] = [];

export function isHeic(src: string): boolean {
  return /\.heic$/i.test(src);
}

export function getCached(src: string): string | null {
  return cache.get(src) ?? null;
}

export function setCached(src: string, objectUrl: string): void {
  cache.set(src, objectUrl);
  urlsToRevoke.push(objectUrl);
}

export function clearCache(): void {
  urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
  urlsToRevoke.length = 0;
  cache.clear();
}

/**
 * Preload HEIC images in the background (one at a time to keep UI responsive).
 * Call when quiz screen mounts.
 */
export function preloadHeicImages(sources: string[]): void {
  const heicSources = sources.filter(isHeic);
  if (heicSources.length === 0) return;

  let index = 0;
  function runNext() {
    if (index >= heicSources.length) return;
    const src = heicSources[index];
    index += 1;
    if (cache.has(src)) {
      runNext();
      return;
    }
    fetch(src, { cache: "no-store" })
      .then((res) => res.blob())
      .then((blob) =>
        import("heic2any").then((heic2any) => {
          const result = heic2any.default({ blob, toType: "image/jpeg", quality: 0.9 });
          return Array.isArray(result) ? result[0] : result;
        })
      )
      .then((jpegBlob) => {
        const url = URL.createObjectURL(jpegBlob);
        setCached(src, url);
        runNext();
      })
      .catch(() => runNext());
  }
  runNext();
}
