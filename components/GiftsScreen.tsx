"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { content } from "@/lib/content";
import { Button } from "./Button";
import { ValentineCardPdf } from "./ValentineCardPdf";

const GiftBox3DCanvas = dynamic(() => import("./GiftBox3DCanvas"), {
  ssr: false,
  loading: () => <div className="text-4xl">🎁</div>,
});

const PDF_NUM_PAGES = 4;

export function GiftsScreen() {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [letterPage, setLetterPage] = useState(1);
  const [pdfNumPages, setPdfNumPages] = useState(PDF_NUM_PAGES);
  const [letterLightboxOpen, setLetterLightboxOpen] = useState(false);
  const [viewportFit, setViewportFit] = useState({ w: 900, h: 800 });

  useEffect(() => {
    const update = () =>
      setViewportFit({
        w: Math.round(window.innerWidth * 0.9),
        h: Math.round(window.innerHeight * 0.9),
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleGiftClick = (id: string) => {
    setSelectedGift(id);
    if (id === "letter") setLetterPage(1);
  };

  const handleCloseGift = () => {
    setSelectedGift(null);
    setLetterPage(1);
  };

  const advanceLetterPage = () => {
    if (letterPage < pdfNumPages) {
      setLetterPage((p) => p + 1);
    }
  };

  const goToPrevLetterPage = () => {
    if (letterPage > 1) {
      setLetterPage((p) => p - 1);
    }
  };

  const isLastLetterPage =
    selectedGift === "letter" && letterPage >= pdfNumPages;

  return (
    <motion.section
      className="flex min-h-screen flex-col items-center px-6 py-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="font-display text-3xl font-semibold text-romantic-deep sm:text-4xl">
          {content.gifts.title}
        </h1>
        <p className="font-body text-base text-romantic-deep/70 sm:text-lg">
          {content.gifts.subtitle}
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {content.gifts.boxes.map((box) => (
            <motion.button
              key={box.id}
              onClick={() => handleGiftClick(box.id)}
              className="group relative overflow-hidden rounded-2xl border border-romantic-blush/50 bg-white/70 p-6 shadow-glass backdrop-blur-md transition hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="mb-2 flex h-60 w-full items-center justify-center"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <GiftBox3DCanvas />
              </motion.div>
              <h3 className="font-display text-lg font-semibold text-romantic-deep">
                Your surprise
              </h3>
              <p className="mt-2 font-body text-sm text-romantic-deep/70">
                Tap to reveal
              </p>
            </motion.button>
          ))}
        </div>

        {selectedGift === "target" && (
          <motion.div
            className="mt-8 rounded-2xl bg-white/80 p-6 shadow-glass backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-2xl font-semibold text-romantic-deep">
              {content.gifts.targetGift.heading}
            </h2>
            <p className="mt-3 font-body text-base font-medium text-romantic-deep/90">
              {content.gifts.targetGift.deliveryNote}
            </p>
            <Button className="mt-4" onClick={handleCloseGift}>
              Close
            </Button>
          </motion.div>
        )}

        {selectedGift === "chipotle" && (
          <motion.div
            className="mt-8 rounded-2xl bg-white/80 p-6 shadow-glass backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-2xl font-semibold text-romantic-deep">
              {content.gifts.chipotleGift.heading}
            </h2>
            <p className="mt-3 font-body text-base font-medium text-romantic-deep/90">
              {content.gifts.chipotleGift.deliveryNote}
            </p>
            <Button className="mt-4" onClick={handleCloseGift}>
              Close
            </Button>
          </motion.div>
        )}

        {selectedGift === "letter" && (
          <motion.div
            className="mt-8 rounded-2xl bg-white/80 p-6 shadow-glass backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-display text-2xl font-semibold text-romantic-deep">
              {content.gifts.letter.heading}
            </h2>
            <p className="mt-2 font-body text-sm text-romantic-deep/70">
              {content.gifts.letter.prompt}
            </p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <div
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-romantic-blush/50 bg-white p-2"
                style={{ minHeight: 540 }}
              >
                <button
                  type="button"
                  onClick={goToPrevLetterPage}
                  disabled={letterPage <= 1}
                  aria-label="Previous part"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romantic-deep/90 text-white shadow-md transition hover:bg-romantic-deep disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-romantic-deep/50 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setLetterLightboxOpen(true)}
                  className="flex min-h-[516px] flex-1 justify-center focus:outline-none focus:ring-2 focus:ring-romantic-deep/30 focus:ring-offset-2 rounded-lg overflow-hidden bg-transparent cursor-pointer"
                  aria-label="View full size"
                >
                  <ValentineCardPdf
                    pdfUrl={content.gifts.letter.pdfUrl}
                    pageNumber={letterPage}
                    onDocumentLoadSuccess={setPdfNumPages}
                  />
                </button>
                <button
                  type="button"
                  onClick={advanceLetterPage}
                  disabled={isLastLetterPage}
                  aria-label="Next part"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-romantic-deep/90 text-white shadow-md transition hover:bg-romantic-deep disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-romantic-deep/50 focus:ring-offset-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
              {isLastLetterPage ? (
                <p className="font-body text-center text-sm text-romantic-deep/80">
                  That’s the whole card 💕
                </p>
              ) : (
                <p className="font-body text-center text-sm font-semibold text-romantic-deep">
                  Use the arrows to see the next part. Tap the card to view full size.
                </p>
              )}
              {!isLastLetterPage && (
                <Button
                  variant="primary"
                  onClick={advanceLetterPage}
                  className="w-full"
                >
                  Next part →
                </Button>
              )}
            </div>
            <Button className="mt-4" onClick={handleCloseGift}>
              Close
            </Button>

            <AnimatePresence>
              {letterLightboxOpen && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setLetterLightboxOpen(false)}
                >
                  <div
                    className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLetterLightboxOpen(false);
                      }}
                      className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-romantic-deep text-white shadow-lg transition hover:bg-romantic-deep/80 focus:outline-none focus:ring-2 focus:ring-romantic-deep/50 focus:ring-offset-2 focus:ring-offset-transparent"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                    <div className="flex items-center justify-center rounded-lg bg-white p-4">
                      <ValentineCardPdf
                        pdfUrl={content.gifts.letter.pdfUrl}
                        pageNumber={letterPage}
                        fitViewport
                        maxWidth={viewportFit.w}
                        maxHeight={viewportFit.h}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
