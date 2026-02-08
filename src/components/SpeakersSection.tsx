import { motion } from "framer-motion";
import { User } from "lucide-react";
import { programImages } from "@/lib/programImages";

const speakers = [
  {
    name: "NAJIL UMAIR",
    role: "DevOps Engineer, Synnefo Solutions, Cochin",
    status: "Featured Speaker",
    photo: "/najil-umair.jpg",
  },
];

export const SpeakersSection = () => {
  return (
    <section id="speakers" className="py-24 bg-background relative overflow-hidden scroll-mt-28">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-secondary/0 via-secondary to-secondary/0" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-lg text-secondary tracking-[0.2em] uppercase">
            Speakers
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mt-4 mb-6">
            Speakers
          </h2>
          <div className="mt-2">
            <p className="font-display text-2xl md:text-3xl text-primary text-center">
              Build with Docker
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground text-center">
              "Pack your code in a box"
            </p>
          </div>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                {/* Photo or Placeholder */}
                {speaker.photo ? (
                  <div className="w-32 h-32 mb-6 border-2 border-secondary/30 overflow-hidden bg-primary/5 group-hover:border-secondary/60 transition-colors duration-300">
                    <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 mb-6 border-2 border-secondary/30 bg-primary/5 flex items-center justify-center group-hover:border-secondary/60 transition-colors duration-300">
                    <User className="w-12 h-12 text-secondary/50" />
                  </div>
                )}
                <h3 className="font-display text-2xl text-primary mb-1">
                  {speaker.name}
                </h3>
                <p className="font-body text-lg text-muted-foreground mb-2">
                  {speaker.role}
                </p>
                <span className="font-sans text-sm text-secondary tracking-wide">
                  {speaker.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
