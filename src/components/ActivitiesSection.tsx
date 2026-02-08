import { motion } from "framer-motion";
import { Mountain, Flame, Stars, Music } from "lucide-react";
import { BounceCards, BounceCard } from "@/components/ui/bounce-cards";
import { programImages } from "@/lib/programImages";

const activities = [
  {
    icon: Mountain,
    title: "Trekking",
    description:
      "Experience the breathtaking beauty of Munnar through guided treks, exploring its scenic landscapes and natural wonders.",
    image: programImages.activities.trekking,
  },
  {
    icon: Flame,
    title: "Campfire",
    description:
      "Gather around the warmth of a campfire, share stories, and create lasting memories under the starlit sky.",
    image: programImages.activities.campfire,
  },
  {
    icon: Stars,
    title: "Prom Night",
    description:
      "A magical night of music, dance, and memories. Dress up and celebrate an unforgettable evening.",
    image: programImages.activities.skyLantern,
  },
  {
    icon: Music,
    title: "Cultural Night",
    description:
      "Immerse yourself in a vibrant celebration of arts, music, and dance showcasing diverse cultural performances.",
    image: programImages.activities.culturalNight,
  },
];

export const ActivitiesSection = () => {
  return (
    <section id="activities" className="py-28 bg-gradient-hero relative overflow-hidden scroll-mt-28">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,800px)] h-[60%] bg-secondary/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-lg text-secondary tracking-[0.25em] uppercase">
            Experiences
          </span>
          <h2 className="font-hero text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-4 mb-2">
            Event Activities
          </h2>
          <p className="font-body text-primary-foreground/70 text-lg max-w-xl mx-auto">
            Trekking, campfire, prom night & cultural night
          </p>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto mt-6" />
        </motion.div>

        <BounceCards className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <BounceCard className="h-full group">
                <div className="h-full flex flex-col bg-primary/25 backdrop-blur-sm border border-secondary/25 hover:border-secondary/50 rounded-lg overflow-hidden transition-all duration-500 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_-12px_rgba(203,162,75,0.15)]">
                  <div className="aspect-video w-full overflow-hidden bg-primary/40 relative">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 lg:p-7 flex flex-col items-center text-center flex-1">
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg border-2 border-secondary/50 mb-4 group-hover:border-secondary group-hover:bg-secondary/15 transition-all duration-300">
                      <activity.icon className="w-7 h-7 text-secondary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="font-hero text-xl lg:text-2xl text-primary-foreground mb-3">
                      {activity.title}
                    </h3>
                    <p className="font-body text-base text-primary-foreground/75 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </BounceCard>
            </motion.div>
          ))}
        </BounceCards>
      </div>
    </section>
  );
};
