"use client";

import { createPortal } from "react-dom";
import { QuizImage } from "./QuizImage";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { content } from "@/lib/content";
import { preloadHeicImages, clearCache, getCached, isHeic } from "@/lib/heicCache";
import { Button } from "./Button";

interface QuizScreenProps {
  onDone: () => void;
}

export function QuizScreen({ onDone }: QuizScreenProps) {
  const quiz = content.quiz;
  const total = quiz.questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const question = useMemo(() => quiz.questions[index], [quiz, index]);

  useEffect(() => {
    const heicSrcs = quiz.questions.map((q) => q.imageSrc);
    preloadHeicImages(heicSrcs);
    return () => clearCache();
  }, [quiz.questions]);

  const handleChoice = (choiceIndex: number) => {
    if (showResult) return;
    setSelected(choiceIndex);
    setShowResult(true);
    if (choiceIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      onDone();
    }
  };

  const isLast = index === total - 1;

  return (
    <motion.section
      className="flex min-h-[80dvh] flex-col items-center px-6 py-10 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full max-w-xl rounded-[var(--radius-panel)] bg-white/70 p-4 shadow-glass backdrop-blur-md sm:p-6">
        <p className="font-body text-xs uppercase tracking-[0.2em] text-romantic-deep/60">
          {index + 1} / {total}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-romantic-deep">
          {quiz.title}
        </h2>
        <p className="mt-1 font-body text-sm text-romantic-deep/75">
          {"prompt" in question && question.prompt
            ? question.prompt
            : "Where was this date?"}
        </p>

        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="group relative h-52 w-full max-w-sm overflow-hidden rounded-3xl border border-romantic-blush bg-romantic-cream/60 shadow-romantic cursor-pointer transition hover:border-romantic-deep/40 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-romantic-deep/30 focus:ring-offset-2"
            aria-label="View full size"
          >
            <QuizImage
              key={question.imageSrc}
              src={question.imageSrc}
              alt={question.imageAlt}
              fill
              className="object-cover transition group-hover:scale-105"
              sizes="(min-width: 768px) 320px, 80vw"
            />
            <span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white shadow-md transition group-hover:bg-romantic-deep/80" aria-hidden>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
          </button>
          <p className="font-body text-xs text-romantic-deep/70">
            Tap photo to view full size
          </p>
        </div>

        <AnimatePresence>
          {lightboxOpen && typeof document !== "undefined" && createPortal(
            <>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="fixed right-4 top-4 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-romantic-deep text-white shadow-lg transition hover:bg-romantic-deep/80 focus:outline-none focus:ring-2 focus:ring-romantic-deep/50 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <motion.div
                className="fixed inset-0 z-[100] flex flex-col items-center overflow-y-auto overflow-x-hidden bg-black/90 px-4 pb-8 pt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setLightboxOpen(false)}
              >
                <div
                  className="flex w-full max-w-[90vw] flex-1 justify-center pt-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const lightboxSrc = isHeic(question.imageSrc)
                      ? getCached(question.imageSrc)
                      : question.imageSrc;
                    if (!lightboxSrc) {
                      return (
                        <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-white/10 font-body text-sm text-white/80">
                          Loading…
                        </div>
                      );
                    }
                    return (
                      <img
                        src={lightboxSrc}
                        alt={question.imageAlt}
                        className="max-h-[calc(100vh-5rem)] w-auto max-w-full object-contain object-top"
                        draggable={false}
                      />
                    );
                  })()}
                </div>
              </motion.div>
            </>,
            document.body
          )}
        </AnimatePresence>

        <div className="mt-6 grid gap-3">
          {question.choices.map((choice, choiceIndex) => {
            const isSelected = selected === choiceIndex;
            const isCorrect = choiceIndex === question.correctIndex;
            const showState = showResult && (isSelected || isCorrect);

            let variant: "secondary" | "primary" | "danger" = "secondary";
            if (showState && isCorrect) variant = "primary";
            if (showState && !isCorrect && isSelected) variant = "danger";

            return (
              <Button
                key={choice}
                variant={variant}
                size="md"
                className="w-full justify-between text-left"
                onClick={() => handleChoice(choiceIndex)}
                disabled={showResult}
              >
                <span className="flex-1">
                  {/* EDIT ANSWER TEXT HERE: quiz.questions[...].choices[...] */}
                  {choice}
                </span>
              </Button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              className="mt-5 space-y-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <p className="font-body text-sm text-romantic-deep/80">
                {isLast
                  ? quiz.completionMessage
                  : selected === question.correctIndex
                    ? "You remembered that one. I love that."
                    : "Honestly still cute that you tried."}
              </p>
              <Button variant="primary" size="md" onClick={handleNext}>
                {isLast ? "Back to your surprise" : "Next memory"}
              </Button>
              <p className="text-xs text-romantic-deep/60">
                Score so far: {score} / {total}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
