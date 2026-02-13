"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { content } from "@/lib/content";

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showLine, setShowLine] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showLine < 2) {
        setShowLine(showLine + 1);
      } else {
        setTimeout(onComplete, 500);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [showLine, onComplete]);

  return (
    <motion.section
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="rounded-2xl bg-white/85 px-8 py-8 shadow-lg backdrop-blur-sm">
        <div className="space-y-4">
        {showLine >= 0 && (
          <motion.h1
            className="font-display text-4xl font-semibold text-romantic-deep sm:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.intro.line1}
          </motion.h1>
        )}
        {showLine >= 1 && (
          <motion.p
            className="font-body text-lg text-romantic-deep/80 sm:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.intro.line2}
          </motion.p>
        )}
        </div>
      </div>
    </motion.section>
  );
}
