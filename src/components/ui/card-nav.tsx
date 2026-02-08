"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardNavItem {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

interface CardNavProps {
  items: CardNavItem[];
  className?: string;
  gridClass?: string;
}

export function CardNav({ items, className, gridClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }: CardNavProps) {
  return (
    <nav className={cn("grid gap-4", gridClass, className)} aria-label="Section navigation">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.href}
            href={item.href}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            whileHover={{
              scale: 1.02,
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group flex flex-col rounded-lg border bg-card p-5 text-card-foreground shadow-sm",
              "border-[#CBA24B]/20 hover:border-[#CBA24B]/50 hover:shadow-[0_8px_30px_-10px_rgba(203,162,75,0.25)]",
              "transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CBA24B]/50"
            )}
          >
            {Icon && (
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#CBA24B]/30 bg-[#CBA24B]/5 text-[#CBA24B] group-hover:bg-[#CBA24B]/15">
                <Icon className="h-5 w-5" />
              </span>
            )}
            <span className="font-display font-semibold text-foreground group-hover:text-[#561420]">
              {item.label}
            </span>
            {item.description && (
              <span className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </span>
            )}
          </motion.a>
        );
      })}
    </nav>
  );
}
