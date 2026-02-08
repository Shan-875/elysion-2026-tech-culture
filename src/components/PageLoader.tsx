import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import comingSoonImg from "@/assets/coming-soon.png";
import heroImage from "@/assets/hero-im.png";

const CURTAIN_DURATION = 0.55;
const CURTAIN_DELAY = 0.08;

interface PageLoaderProps {
  isLoading: boolean;
  exiting: boolean;
  onExitComplete: () => void;
}

export const PageLoader = ({ isLoading, exiting, onExitComplete }: PageLoaderProps) => {
  const [visible, setVisible] = useState(false);
  const exitCompleteRef = useRef(false);

  // As soon as loader opens, show content (hero, text, coming soon)
  useEffect(() => {
    if (isLoading && !exiting) {
      setVisible(false);
      exitCompleteRef.current = false;
      const t = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(t);
    }
  }, [isLoading, exiting]);

  useEffect(() => {
    if (!exiting || exitCompleteRef.current) return;
    const t = setTimeout(() => {
      exitCompleteRef.current = true;
      onExitComplete();
    }, (CURTAIN_DELAY + CURTAIN_DURATION) * 1000);
    return () => clearTimeout(t);
  }, [exiting, onExitComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9996]" aria-hidden="true">
      {/* Full-screen hero image background (no gradient – hero img only) */}
      <motion.div
        className="fixed inset-0 z-[9997] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: exiting ? 0.2 : 0.3 }}
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Content on top of curtains so it’s visible: ELYSION '26 + Coming Soon image */}
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-center px-4"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {visible && (
          <>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute top-8 left-6 sm:top-10 sm:left-10 md:top-12 md:left-12 font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.2em] text-[#FAF5E8]"
              style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
            >
              ELYSION &apos;26
            </motion.h1>

            <motion.img
              src={comingSoonImg}
              alt="Coming Soon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="w-full max-w-xl sm:max-w-2xl object-contain"
              style={{
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.6)) drop-shadow(0 0 48px rgba(203,162,75,0.3))",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Left curtain – hero image as curtain (behind content) */}
      <motion.div
        className="fixed top-0 left-0 w-1/2 h-full z-[9998] overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: exiting ? "-100%" : 0 }}
        transition={{
          duration: CURTAIN_DURATION,
          delay: exiting ? CURTAIN_DELAY : 0,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
      </motion.div>

      {/* Right curtain – hero image as curtain */}
      <motion.div
        className="fixed top-0 right-0 w-1/2 h-full z-[9998] overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: exiting ? "100%" : 0 }}
        transition={{
          duration: CURTAIN_DURATION,
          delay: exiting ? CURTAIN_DELAY : 0,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/25 to-transparent" />
      </motion.div>
    </div>
  );
};
