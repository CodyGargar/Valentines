"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { AskScreen } from "@/components/AskScreen";
import { IntroScreen } from "@/components/IntroScreen";

const QuizScreen = dynamic(
  () => import("@/components/QuizScreen").then((m) => ({ default: m.QuizScreen })),
  { ssr: false }
);

const GiftsScreen = dynamic(
  () => import("@/components/GiftsScreen").then((m) => ({ default: m.GiftsScreen })),
  { ssr: false }
);

const FloatingDinos = dynamic(
  () => import("@/components/FloatingDinos").then((m) => ({ default: m.FloatingDinos })),
  { ssr: false }
);

const FloatingHearts = dynamic(
  () => import("@/components/FloatingHearts").then((m) => ({ default: m.FloatingHearts })),
  { ssr: false }
);

type Screen = "intro" | "ask" | "quiz" | "gifts";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("answer") === "yes") {
      setScreen("quiz");
    }
  }, []);

  const handleIntroComplete = () => {
    setScreen("ask");
  };

  const handleAskYes = () => {
    setAnswer("yes");
    setScreen("quiz");
  };

  const handleAskNo = () => {
    setAnswer("no");
  };

  const handleQuizDone = () => {
    setScreen("gifts");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-romantic-cream via-romantic-blush/15 to-romantic-cream relative">
      <FloatingDinos />
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <IntroScreen key="intro" onComplete={handleIntroComplete} />
        )}
        {screen === "ask" && (
          <AskScreen
            key="ask"
            onYes={handleAskYes}
            onNo={handleAskNo}
          />
        )}
        {screen === "quiz" && (
          <QuizScreen key="quiz" onDone={handleQuizDone} />
        )}
        {screen === "gifts" && <GiftsScreen key="gifts" />}
      </AnimatePresence>
    </main>
  );
}
