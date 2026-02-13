"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { content } from "@/lib/content";
import { Button } from "./Button";

interface AskScreenProps {
  onYes: () => void;
  onNo: () => void;
}

export function AskScreen({ onYes, onNo }: AskScreenProps) {
  const [noCount, setNoCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const handleNo = (e: React.MouseEvent) => {
    e.preventDefault();
    setNoCount((c) => c + 1);
    
    // Generate random position within a large range
    const maxX = 200;
    const maxY = 200;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    
    setButtonPosition({ x: newX, y: newY });
    onNo();
  };

  const noMessage =
    content.noMicrocopy[noCount % content.noMicrocopy.length];

  return (
    <motion.section
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white/85 px-8 py-8 shadow-lg backdrop-blur-sm">
        <div className="space-y-8">
        <motion.h1
          className="font-display text-4xl font-semibold text-romantic-deep sm:text-5xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {content.ask.question}
        </motion.h1>
        <motion.p
          className="font-body text-lg text-romantic-deep/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {content.ask.subtext}
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="primary" size="lg" onClick={onYes}>
            Yes! 💖
          </Button>
          <motion.div
            animate={{
              x: buttonPosition.x,
              y: buttonPosition.y,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            style={{ position: "relative" }}
          >
            <Button variant="secondary" size="lg" onClick={handleNo}>
              {noCount === 0 ? "Not yet" : noMessage}
            </Button>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
