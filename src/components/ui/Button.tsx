"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useSoundEffect } from "@/hooks/useSoundEffect";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "glass" | "vinyl" | "ghost";
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", isLoading, children, className, onClick, onMouseEnter, ...props }: ButtonProps) => {
  const { play } = useSoundEffect();

  const variants = {
    primary: "bg-rose-600 text-white shadow-[0_4px_14px_0_rgba(225,29,72,0.39)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.23)] hover:bg-rose-500",
    glass: "glass-panel text-white/90 shadow-sm hover:bg-white/10 hover:text-white border border-white/5",
    vinyl: "bg-neutral-900 text-white border border-white/10 shadow-inner hover:brightness-110",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    play('hover');
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    play('click');
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      className={`
        relative overflow-hidden px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] 
        flex items-center justify-center gap-2 transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} 
        ${className || ""}
      `}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.95, y: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <motion.div
          className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className={isLoading ? "opacity-80" : ""}>{children}</span>

      {/* Gloss Effect (Life Layer) */}
      {variant === 'primary' && (
        <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 ring-inset pointer-events-none" />
      )}
    </motion.button>
  );
};
