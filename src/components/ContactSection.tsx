import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const contacts = [
  {
    name: "Dan V Prabha",
    role: "Chair, IEEE SB CE Munnar",
    phone: "8078126241",
  },
  {
    name: "Mohammed Shammas",
    role: "Organizing Chair",
    phone: "8848466998",
  },
  {
    name: "Lakshmi R",
    role: "Secretary",
    phone: "6238264735",
  },
  {
    name: "Siva T P",
    role: "Event Coordinator",
    phone: "8098845706",
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden scroll-mt-28">
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
            Get in Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mt-4 mb-6">
            Contact Us
          </h2>
          <div className="w-24 h-0.5 bg-gradient-gold mx-auto" />
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-primary/5 border border-primary/10 hover:border-secondary/30 transition-all duration-300 text-center group"
            >
              <h3 className="font-display text-xl text-primary mb-1">
                {contact.name}
              </h3>
              <p className="font-body text-base text-muted-foreground mb-4 leading-tight">
                {contact.role}
              </p>
              {contact.phone ? (
                <a
                  href={`tel:+91${contact.phone}`}
                  className="inline-flex items-center gap-2 font-sans text-secondary hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {contact.phone}
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>

        {/* About IEEE SB */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl text-primary mb-6">
            About IEEE SB CE Munnar
          </h3>
          <p className="font-body text-xl text-foreground/70 leading-relaxed">
            Established in 2005, IEEE SB College of Engineering Munnar hosts four IEEE 
            technical society student chapters and a women in engineering affinity group. 
            With active participation from students across CSE, ECE, EEE, and ME departments, 
            we are committed to fostering technical and creative skills among students.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
