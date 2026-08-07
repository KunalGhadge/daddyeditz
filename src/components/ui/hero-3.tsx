"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref?: string;
  images: string[];
  className?: string;
}

const ActionButton = ({ children, href = "#contact" }: { children: React.ReactNode; href?: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    className="inline-flex items-center gap-3 mt-8 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FF5C28] text-white font-ui font-bold text-[15px] shadow-lg shadow-[#FF5C28]/25 transition-colors hover:bg-[#e04d1e] focus:outline-none focus:ring-2 focus:ring-[#FF5C28]/40 cursor-pointer"
  >
    {children}
    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 7h12M7.5 1.5 13 7l-5.5 5.5" stroke="#FF5C28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  </motion.a>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaHref = "#contact",
  images,
  className,
}) => {
  const FADE_UP = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 90, damping: 22 } },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full min-h-[100svh] overflow-hidden bg-[#F7F6F3] flex flex-col items-center justify-center text-center px-4",
        className
      )}
    >
      {/* Background glows */}
      <div className="absolute top-[-15%] right-[-5%] w-[55%] h-[65%] rounded-full bg-[#FF5C28]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[-5%] w-[40%] h-[50%] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center pt-24 pb-0">
        {/* Location pill */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-2 text-[12px] font-bold text-stone-600 backdrop-blur-sm shadow-sm tracking-wide font-ui"
        >
          <MapPin size={12} className="text-[#FF5C28]" />
          Kamothe, Navi Mumbai · 410209
        </motion.div>

        {/* Tagline badge */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FF5C28]/10 border border-[#FF5C28]/20 px-4 py-1.5 text-[11px] font-bold text-[#FF5C28] uppercase tracking-widest font-ui"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C28] animate-pulse" />
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-bold tracking-[-0.035em] leading-[1.03] text-[#111] max-w-4xl"
        >
          {typeof title === "string"
            ? title.split(" ").map((word, i) => (
                <motion.span key={i} variants={FADE_UP} className="inline-block mr-[0.2em]">
                  {word}
                </motion.span>
              ))
            : title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          transition={{ delay: 0.45 }}
          className="mt-6 max-w-xl text-[16px] sm:text-[18px] text-stone-500 font-body font-medium leading-[1.7]"
        >
          {description}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_UP}
          transition={{ delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <ActionButton href={ctaHref}>{ctaText}</ActionButton>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            className="mt-8 inline-flex items-center gap-2 font-ui font-semibold text-[14px] text-stone-500 hover:text-[#111] transition-colors"
          >
            <span className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <polygon points="4,2 11,6.5 4,11" fill="#888"/>
              </svg>
            </span>
            See my edits
          </motion.a>
        </motion.div>
      </div>

      {/* Animated Image Marquee at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[38%] sm:h-[42%] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)] pointer-events-none overflow-hidden">
        <motion.div
          className="flex gap-5 h-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-full flex-shrink-0"
              style={{ rotate: `${index % 2 === 0 ? -2 : 3}deg` }}
            >
              <img
                src={src}
                alt={`Showcase ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
