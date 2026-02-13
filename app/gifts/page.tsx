"use client";

import dynamic from "next/dynamic";

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

export default function GiftsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-romantic-cream via-romantic-blush/15 to-romantic-cream relative">
      <FloatingDinos />
      <FloatingHearts />
      <GiftsScreen />
    </main>
  );
}
