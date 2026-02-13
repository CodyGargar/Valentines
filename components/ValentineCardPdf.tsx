"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set worker so PDF.js can parse the file (required in browser)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

type ValentineCardPdfProps = {
  pdfUrl: string;
  pageNumber: number;
  onDocumentLoadSuccess?: (numPages: number) => void;
  /** Optional width for the PDF page (default 420). Use a larger value for lightbox. */
  width?: number;
  /** When true, size the page to fit within maxWidth and maxHeight (no scrolling). */
  fitViewport?: boolean;
  maxWidth?: number;
  maxHeight?: number;
};

export function ValentineCardPdf({
  pdfUrl,
  pageNumber,
  onDocumentLoadSuccess,
  width: widthProp,
  fitViewport = false,
  maxWidth = 900,
  maxHeight = 900,
}: ValentineCardPdfProps) {
  const [fitSize, setFitSize] = useState<{ w: number; h: number } | null>(
    widthProp != null ? { w: widthProp, h: Math.round((widthProp / 420) * 520) } : null
  );

  const handlePageLoadSuccess = (page: { width: number; height: number }) => {
    if (fitViewport && page?.width && page?.height) {
      const scale = Math.min(maxWidth / page.width, maxHeight / page.height);
      setFitSize({
        w: Math.round(page.width * scale),
        h: Math.round(page.height * scale),
      });
    }
  };

  const pageWidth = fitViewport ? (fitSize?.w ?? widthProp ?? 420) : (widthProp ?? 420);
  const containerHeight = fitViewport && fitSize ? fitSize.h : Math.round((pageWidth / 420) * 520);

  return (
    <div
      className="flex min-w-0 items-center justify-center"
      style={{ minHeight: containerHeight, width: pageWidth }}
    >
      <Document
        file={pdfUrl}
        loading={
          <div
            className="flex items-center justify-center rounded-lg border border-romantic-blush/50 bg-white font-body text-sm text-romantic-deep/70"
            style={{ minHeight: fitViewport ? maxHeight : containerHeight, width: fitViewport ? maxWidth : pageWidth }}
          >
            Loading card…
          </div>
        }
        error={
          <div
            className="flex items-center justify-center rounded-lg border border-romantic-blush/50 bg-white font-body text-sm text-romantic-deep/70"
            style={{ minHeight: containerHeight, width: pageWidth }}
          >
            Could not load the card.
          </div>
        }
        onLoadSuccess={({ numPages }) => onDocumentLoadSuccess?.(numPages)}
      >
        <Page
          pageNumber={pageNumber}
          width={pageWidth}
          onLoadSuccess={handlePageLoadSuccess}
          className="rounded-lg border-0 bg-transparent [&_.react-pdf__Page__canvas]:max-w-full [&_.react-pdf__Page__canvas]:h-auto"
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
