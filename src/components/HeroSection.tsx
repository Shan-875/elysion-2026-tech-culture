import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import elysionLogo from "@/assets/elysion-logo.png";
import heroImage from "@/assets/hero-im.png";
import calendarDatesImg from "@/assets/calendar-dates.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-02-14T10:00:00+05:30");

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-28"
    >
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover min-h-full min-w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden z-[1]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-l border-t border-[#CBA24B]/25" />
      <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 border-r border-t border-[#CBA24B]/25" />
      <div className="absolute bottom-0 left-0 w-24 h-24 md:w-32 md:h-32 border-l border-b border-[#CBA24B]/25" />
      <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-r border-b border-[#CBA24B]/25" />

      <div className="container mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-20 relative z-10">
        <div className="flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-12"
          >
            <img
              src={elysionLogo}
              alt="Elysion 2026"
              className="h-20 md:h-28 lg:h-36 object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
          {/* Hero tagline – Roxborough CF–like font */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-hero text-primary-foreground/90 text-lg md:text-xl tracking-wide mb-2"
          >
            The Digital Gates Are Open
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="font-body text-primary-foreground/70 text-sm md:text-base tracking-[0.05em] max-w-md"
          >
            Experience the grandeur of ELYSION online. Your journey begins here.
          </motion.p>

          {/* Main Content: Two-column layout on desktop, stacked on mobile */}
          <div className="w-full max-w-5xl mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* LEFT COLUMN: Calendar + Register button */}
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -4 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center lg:items-end gap-6"
              >
                <div className="w-full max-w-[280px] sm:max-w-[320px]">
                  <div className="relative p-2 rounded-sm bg-gradient-to-br from-[#CBA24B]/20 to-transparent border border-[#CBA24B]/40 ">
                    <img
                      src={calendarDatesImg}
                      alt="14 & 15 February 2026"
                      className="w-full h-auto object-contain rounded"
                    />
                  </div>
                </div>
                <motion.a
                  href="#register"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-gradient-gold text-primary font-display font-semibold text-sm tracking-[0.2em] uppercase rounded-sm shadow-[0_4px_24px_rgba(203,162,75,0.4)] hover:shadow-[0_8px_32px_rgba(203,162,75,0.5)] transition-all duration-300 w-full max-w-[280px] sm:max-w-[320px] text-center"
                >
                  Register Now
                </motion.a>
              </motion.div>

              {/* RIGHT COLUMN: Event Info + Countdown */}
              <div className="flex flex-col gap-8 lg:gap-10">
                
                {/* Event Details – hero font (Roxborough CF–like) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5 font-hero"
                >
                  {/* Date */}
                  <div className="flex flex-col items-center lg:items-start pb-4 border-b border-[#CBA24B]/20">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#CBA24B]/90 mb-2">
                      Date
                    </p>
                    <p className="text-lg md:text-xl text-primary-foreground/95 font-medium">
                      10:00 AM IST
                    </p>
                  </div>

                  {/* Venue */}
                  <div className="flex flex-col items-center lg:items-start pb-4 border-b border-[#CBA24B]/20">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#CBA24B]/90 mb-2">
                      Venue
                    </p>
                    <p className="text-lg md:text-xl text-primary-foreground/95 font-medium">
                      CE Munnar Campus
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div className="flex flex-col items-center lg:items-start">
                    <p className="text-xs uppercase tracking-[0.25em] text-[#CBA24B]/90 mb-2">
                      Eligibility
                    </p>
                    <p className="text-lg md:text-xl text-primary-foreground/95 font-medium text-center lg:text-left">
                      Open to All Engineering Students
                    </p>
                  </div>
                </motion.div>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-4 gap-3 md:gap-4"
                >
                  {[
                    { value: timeLeft.days, label: "days" },
                    { value: timeLeft.hours, label: "hours" },
                    { value: timeLeft.minutes, label: "minutes" },
                    { value: timeLeft.seconds, label: "seconds" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-sm border border-[#CBA24B]/50 bg-[#561420]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(203,162,75,0.15)]">
                        <span className="shimmer font-hero text-2xl md:text-3xl font-bold tabular-nums">
                          {formatNumber(item.value)}
                        </span>
                      </div>
                      <span className="mt-2 font-hero text-xs text-primary-foreground/70 tracking-[0.15em] uppercase">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};