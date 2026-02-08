import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

import { programImages } from "@/lib/programImages";

const galleryImages = [
  { id: 1, alt: "Event glimpse", src: programImages.gallery[0] },
  { id: 2, alt: "Event glimpse", src: programImages.gallery[1] },
  { id: 3, alt: "Scenic Munnar", src: programImages.gallery[2] },
  { id: 4, alt: "Campfire night", src: programImages.gallery[3] },
  { id: 5, alt: "Photography workshop", src: programImages.gallery[4] },
  { id: 6, alt: "AR/VR workshop", src: programImages.gallery[5] },
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-28 bg-theme-gallery relative overflow-hidden scroll-mt-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#CBA24B]/40 to-transparent z-10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-sm uppercase tracking-[0.3em] text-secondary">
            Memories
          </span>
          <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-3 mb-2">
            Glimpses of Elysion
          </h2>
          <p className="font-body text-lg text-primary-foreground/70 max-w-xl mx-auto">
            Moments from past editions
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#CBA24B] to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedImage(image.id)}
              className="aspect-square relative overflow-hidden cursor-pointer group rounded-sm border border-[#CBA24B]/20 card-frame-gold bg-primary/20"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#CBA24B]/60 transition-colors duration-300 rounded-sm pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 md:p-8"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/90 hover:text-[#F3C45E] transition-colors p-2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X size={28} />
              </button>
              <motion.img
                key={selectedImage}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                src={galleryImages.find((i) => i.id === selectedImage)?.src}
                alt=""
                className="max-h-[90vh] max-w-full object-contain rounded border border-[#CBA24B]/30"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
