"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export function FloatingDinos() {
  const cols = 6;
  const rows = 5;
  const dinoCount = cols * rows;
  const dinoSize = 120;
  const [durations, setDurations] = useState<number[]>([]);

  useEffect(() => {
    // Generate random durations only on client to avoid hydration mismatch
    setDurations(
      Array.from({ length: dinoCount }, () => 3 + Math.random() * 2)
    );
  }, [dinoCount]);

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-visible pointer-events-none grid p-4"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: dinoCount }, (_, i) => (
        <div
          key={i}
          className="flex items-center justify-center opacity-20 animate-float"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: durations[i] ? `${durations[i]}s` : "3.5s",
          }}
        >
          <Image
            src="/Dino.png"
            alt=""
            width={dinoSize}
            height={dinoSize}
            className="object-contain"
            style={{
              width: `${dinoSize}px`,
              height: `${dinoSize}px`,
            }}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
