"use client";

import { motion } from "framer-motion";
import { Info, Mountain, Mic2, Wrench, Images, Mail, UserPlus } from "lucide-react";
import { CardNav, type CardNavItem } from "@/components/ui/card-nav";

const navItems: CardNavItem[] = [
  { href: "#register", label: "Register", description: "Secure your spot", icon: UserPlus },
  { href: "#about", label: "About", description: "Discover Elysion", icon: Info },
  { href: "#activities", label: "Activities", description: "Trekking, campfire & more", icon: Mountain },
  { href: "#workshops", label: "Workshops", description: "Hands-on learning", icon: Wrench },
  { href: "#speakers", label: "Speakers", description: "Meet our speakers", icon: Mic2 },
  { href: "#gallery", label: "Gallery", description: "Photos & moments", icon: Images },
  { href: "#contact", label: "Contact", description: "Get in touch", icon: Mail },
];

export const CardNavSection = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8F4ED] border-y border-[#CBA24B]/15">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-body text-sm text-secondary tracking-[0.25em] uppercase">
            Explore
          </span>
          <h2 className="font-hero text-3xl md:text-4xl text-primary mt-3 mb-2">
            Jump to section
          </h2>
          <div className="w-20 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>
        <CardNav items={navItems} gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-7" />
      </div>
    </section>
  );
}
