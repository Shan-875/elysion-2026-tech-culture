import { motion } from "framer-motion";
import elysionLogo from "@/assets/elysion-logo.png";
import asces from "@/assets/asces.png";
import ieee from "@/assets/ieee.png";
import ies from "@/assets/ies.png";
import isb from "@/assets/isb.png";
import yuva from "@/assets/yuva.png";

const sponsorLogos = [
  { src: ieee, alt: "IEEE Computer Society" },
  { src: ies, alt: "IEEE Industrial Electronics Society" },
  { src: asces, alt: "ASCES" },
  { src: isb, alt: "IEEE ISB" },
  { src: yuva, alt: "Yuva" },
  { src: "/mtts-logo.png", alt: "IEEE Microwave Theory & Technology Society (MTT-S)" },
  { src: "/partner-logo.png", alt: "Collaboration Partner" },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#561420] ">
      {/* Golden top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CBA24B]/70 to-transparent" />

      <div className="container mx-auto px-6 py-16 md:py-20 max-w-6xl">
        {/* Top row: Logo + description | Quick links */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <img
              src={elysionLogo}
              alt="Elysion 2026"
              className="h-14 md:h-16 object-contain"
            />
            <p className="font-body text-base md:text-lg text-[#FAF5E8]/85 max-w-md leading-relaxed">
              Elysion continues the legacy of innovation and impact, bringing together
              technology, culture, and humanity. Join us for this celebrated technical
              symposium that promises learning, innovation, and collaboration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-x-10 gap-y-3 md:justify-end"
          >
            {["About", "Activities", "Speakers", "Workshops", "Gallery", "Contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-body text-base md:text-lg text-[#FAF5E8]/85 hover:text-[#F3C45E] transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </motion.div>
        </div>

        {/* Sponsor logos */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 border-y border-[#CBA24B]/25"
        >
          <p className="text-center font-body text-xs uppercase tracking-[0.3em] text-[#F3C45E]/80 mb-10">
            In collaboration with
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {sponsorLogos.map(({ src, alt }, index) => (
              <motion.div
                key={alt}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-center h-12 md:h-14 w-auto max-w-[140px]"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-auto object-contain   opacity-95 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 text-center"
        >
          <p className="font-sans text-xs tracking-wide text-[#FAF5E8]/50">
            © 2026 Elysion. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
