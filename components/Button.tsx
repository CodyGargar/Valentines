"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-[var(--radius-button)] font-body font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-romantic-deep text-white hover:bg-romantic-deep/90 focus:ring-romantic-deep/50",
    secondary:
      "bg-white/80 text-romantic-deep border border-romantic-blush/50 hover:bg-white focus:ring-romantic-deep/30",
    danger:
      "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 focus:ring-red-400/50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const {
    onDrag,
    onDragStart,
    onDragEnd,
    onDragOver,
    onAnimationStart,
    onAnimationEnd,
    ...safeProps
  } = props;

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...safeProps}
    >
      {children}
    </motion.button>
  );
}
