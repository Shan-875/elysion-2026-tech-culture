import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, UserPlus, X } from "lucide-react";
import elysionLogo from "@/assets/elysion-logo.png";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Activities", href: "#activities" },
  { name: "Workshops", href: "#workshops" },
  { name: "Register", href: "#register" },
  { name: "Speakers", href: "#speakers" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[#561420]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.25)] border-b border-[#CBA24B]/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-3 flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src={elysionLogo}
                alt="Elysion 2026"
                className="h-9 sm:h-10 md:h-12 object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-lg text-primary-foreground/90 hover:text-secondary transition-colors duration-300 underline-gold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Register Button - Desktop */}
            <a
              href="#register"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-primary font-display font-semibold text-xs tracking-[0.2em] uppercase rounded-sm shadow-[0_2px_16px_rgba(203,162,75,0.3)] hover:shadow-[0_4px_24px_rgba(203,162,75,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              Register Now
            </a>

            {/* Mobile Menu Button – large touch target */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-primary-foreground p-3 -mr-2 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation rounded-sm border border-primary-foreground/10"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Menu – full overlay style */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden overflow-hidden border-t border-primary-foreground/10 mt-3 pt-4 pb-6"
              >
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block font-body text-lg text-primary-foreground/95 hover:text-secondary py-3.5 px-4 min-h-[48px] flex items-center touch-manipulation rounded-sm hover:bg-primary-foreground/5 transition-colors"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.04 }}
                    className="pt-4"
                  >
                    <a
                      href="#register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center min-h-[52px] flex items-center justify-center px-6 py-4 bg-gradient-gold text-primary font-display font-semibold text-sm tracking-wider rounded-sm shadow-[0_2px_16px_rgba(203,162,75,0.3)] touch-manipulation active:scale-[0.98] transition-transform"
                    >
                      Register Now
                    </a>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile menu backdrop when open – blocks scroll and taps behind */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
};
