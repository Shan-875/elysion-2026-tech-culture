"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const bounceTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

interface BounceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BounceCard({ children, className, ...props }: BounceCardProps) {
  return (
    <motion.div
      initial={false}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: bounceTransition,
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      transition={bounceTransition}
      className={cn("rounded-lg", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface BounceCardsProps {
  children: React.ReactNode;
  className?: string;
}

export function BounceCards({ children, className }: BounceCardsProps) {
  return (
    <div className={cn("grid gap-4 sm:gap-6", className)}>
      {children}
    </div>
  );
}
