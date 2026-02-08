import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export const LocationSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden scroll-mt-28">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
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
            Find Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-4 mb-6">
            Location
          </h2>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-video w-full border border-secondary/30 overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.5!2d77.05!3d10.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCollege+of+Engineering+Munnar!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="College of Engineering Munnar Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          {/* Address Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center border border-secondary/40 flex-shrink-0">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-primary-foreground mb-2">
                  College of Engineering Munnar
                </h3>
                <p className="font-body text-lg text-primary-foreground/70 leading-relaxed">
                  Near Govt. High School, Munnar P.O
                  <br />
                  Idukki, Kerala - 685612
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir//College+of+Engineering+Munnar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-primary font-display font-semibold tracking-wider hover:shadow-gold transition-all duration-300 group"
            >
              <Navigation className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
