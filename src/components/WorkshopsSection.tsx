import { motion } from "framer-motion";
import { Check, Cpu, Gamepad2, Sparkles } from "lucide-react";
import { programImages } from "@/lib/programImages";

const workshops = [
  {
    icon: Cpu,
    image: programImages.gallery[2],
    title: "Embedded Systems Workshop",
    description:
      "Introduction to microcontrollers and real-time systems. Get hands-on with ESP32 to build and control a smart car through your phone.",
    leader: "Adithyan Anil",
    leaderTitle: "Co-Founder, Tech Manteraz",
    cta: "Explore IoT and smart technology in action!",
  },
  {
    icon: Gamepad2,
    image: programImages.gallery[0],
    title: "Game Development Workshop",
    description:
      "Create your own 3D games using Unity. Learn models, objects, and scripting while designing and building interactive environments.",
    leaders: [
      { name: "Lijin Joseph", title: "Game Developer" },
      { name: "Sabarisuthan S", title: "Game Developer" },
      { name: "Abhishek Suresh M K", title: "Developer" },
    ],
    cta: "Step into the world of game design and start building your own 3D game!",
  },
  {
    icon: Sparkles,
    image: programImages.gallery[1],
    title: "Fashion Choreography Workshop",
    description:
      "Step into fashion and modeling. Learn essential modeling qualities, types of modeling, and how to build a career in the industry.",
    leader: "Shameer Bin Kareem Routher",
    leaderTitle: "Fashion Choreographer & Costume Designer",
    additionalInfo:
      "Get insights into theme-based costumes, designer creativity, and stage presence.",
    cta: "Unleash your confidence, creativity, and runway potential!",
  },
];

export const WorkshopsSection = () => {
  return (
    <section id="workshops" className="py-24 bg-gradient-hero relative overflow-hidden scroll-mt-28">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-body text-lg text-secondary tracking-[0.2em] uppercase">
            Hands-on Learning
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-4 mb-6">
            Workshops
          </h2>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>

        {/* Workshops */}
        <div className="space-y-12">
          {workshops.map((workshop, index) => (
            <motion.div
              key={workshop.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 md:p-12 bg-primary/20 backdrop-blur-sm border border-secondary/20 hover:border-secondary/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Workshop image + icon */}
                <div className="flex flex-col items-center gap-4 flex-shrink-0">
                  <div className="w-full lg:w-64 aspect-video rounded-sm overflow-hidden border border-secondary/30 bg-primary/40">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center border border-secondary/40 bg-secondary/10">
                    <workshop.icon className="w-8 h-8 text-secondary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="font-display text-3xl text-primary-foreground">
                    {workshop.title}
                  </h3>
                  <p className="font-body text-xl text-primary-foreground/80 leading-relaxed">
                    {workshop.description}
                  </p>

                  {workshop.additionalInfo && (
                    <p className="font-body text-lg text-primary-foreground/70 leading-relaxed">
                      {workshop.additionalInfo}
                    </p>
                  )}

                  {/* Single Leader */}
                  {workshop.leader && (
                    <div className="pt-4 border-t border-secondary/20">
                      <p className="font-body text-lg text-primary-foreground/90 mb-1">
                        Led by{" "}
                        <span className="text-secondary font-display font-semibold">
                          {workshop.leader}
                        </span>
                      </p>
                      <p className="font-body text-base text-primary-foreground/60 italic">
                        {workshop.leaderTitle}
                      </p>

                      {workshop.highlights && (
                        <ul className="mt-4 space-y-2">
                          {workshop.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-center gap-3 font-body text-lg text-primary-foreground/70"
                            >
                              <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}

                      {workshop.cta && (
                        <p className="mt-4 font-body text-lg text-secondary italic">
                          {workshop.cta}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Multiple Leaders */}
                  {workshop.leaders && (
                    <div className="pt-4 border-t border-secondary/20">
                      <p className="font-body text-lg text-primary-foreground/90 mb-3">
                        Session Leaders:
                      </p>
                      <ul className="space-y-2">
                        {workshop.leaders.map((leader) => (
                          <li key={leader.name} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                            <span className="font-body text-lg">
                              <span className="text-secondary font-display font-semibold">
                                {leader.name}
                              </span>
                              <span className="text-primary-foreground/60">
                                , {leader.title}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
