import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Mail, Send } from "lucide-react";
import CinematicReveal from "@/components/CinematicReveal";
import AnimatedHeading from "@/components/AnimatedHeading";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:devanshpareek@example.com?subject=Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.open(mailto);
  };

  const inputClass = (field: string) =>
    `w-full bg-card border rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all duration-500 ${
      focused === field
        ? "border-gold/60 shadow-[0_0_20px_hsla(43,60%,55%,0.08)]"
        : "border-border/60 hover:border-border"
    }`;

  return (
    <section id="contact" className="relative py-24 md:py-40 cinematic-gradient" ref={ref}>
      <div className="absolute inset-0 spotlight-gradient opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <CinematicReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60 block mb-4">
              Get in Touch
            </span>
          </CinematicReveal>

          <AnimatedHeading
            text="Let's Work Together"
            className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory leading-tight"
            delay={0.1}
          />
        </div>

        <CinematicReveal delay={0.3}>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                required
                className={inputClass("name")}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                className={inputClass("email")}
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused("")}
              required
              className={`${inputClass("message")} resize-none`}
            />
            <motion.button
              type="submit"
              className="group flex items-center gap-3 bg-gold/10 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold px-8 py-3.5 rounded-md font-body text-sm tracking-widest uppercase transition-all duration-300 mx-auto"
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsla(43, 60%, 55%, 0.15)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send Message
            </motion.button>
          </form>
        </CinematicReveal>

        {/* Social links */}
        <CinematicReveal delay={0.6}>
          <div className="flex items-center justify-center gap-6 mt-16">
            <motion.a
              href="https://www.instagram.com/devansh_pareek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <Instagram className="w-5 h-5" />
              <span className="font-body text-sm">Instagram</span>
            </motion.a>
            <div className="w-px h-4 bg-border" />
            <motion.a
              href="mailto:devanshpareek@example.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              <Mail className="w-5 h-5" />
              <span className="font-body text-sm">Email</span>
            </motion.a>
          </div>
        </CinematicReveal>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 mt-24 pt-8 border-t border-border/20"
      >
        <p className="text-center font-body text-xs tracking-widest text-muted-foreground/40 uppercase">
          © 2025 Devansh Pareek. All rights reserved.
        </p>
      </motion.div>
    </section>
  );
};

export default ContactSection;
