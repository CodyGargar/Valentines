"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getCached, setCached } from "@/lib/heicCache";

function isHeic(src: string): boolean {
  return /\.heic$/i.test(src);
}

interface QuizImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Shows quiz photos. For HEIC (not supported in Chrome/Firefox), converts to JPEG in the browser using heic2any.
 */
export function QuizImage({ src, alt, fill, className, sizes }: QuizImageProps) {
  const [convertedUrl, setConvertedUrl] = useState<string | null>(() =>
    isHeic(src) ? getCached(src) : null
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isHeic(src)) {
      setConvertedUrl(null);
      setError(false);
      return;
    }
    const cached = getCached(src);
    if (cached) {
      setConvertedUrl(cached);
      setError(false);
      return;
    }
    setConvertedUrl(null);
    setError(false);
    let cancelled = false;
    fetch(src, { cache: "no-store" })
      .then((res) => res.blob())
      .then((blob) =>
        import("heic2any").then((heic2any) => {
          const result = heic2any.default({ blob, toType: "image/jpeg", quality: 0.9 });
          return Array.isArray(result) ? result[0] : result;
        })
      )
      .then((jpegBlob) => {
        if (cancelled) return;
        const url = URL.createObjectURL(jpegBlob);
        setCached(src, url);
        setConvertedUrl(url);
        setError(false);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (error && isHeic(src)) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl bg-romantic-blush/30 text-center font-body text-sm text-romantic-deep/80">
        This photo is in HEIC format. Add a JPG version to the same folder to see it here.
      </div>
    );
  }

  if (isHeic(src) && convertedUrl) {
    return (
      <img
        src={convertedUrl}
        alt={alt}
        className={className}
        style={
          fill
            ? { objectFit: "cover", position: "absolute", inset: 0, width: "100%", height: "100%" }
            : undefined
        }
      />
    );
  }

  if (isHeic(src) && !convertedUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-3xl bg-romantic-blush/20 font-body text-sm text-romantic-deep/70">
        Loading…
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
    />
  );
}
