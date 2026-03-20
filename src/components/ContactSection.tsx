import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Instagram, Mail, Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:devanshpareek@example.com?subject=Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    window.open(mailto);
  };

  return (
    <section id="contact" className="relative py-24 md:py-40 cinematic-gradient" ref={ref}>
      <div className="absolute inset-0 spotlight-gradient opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold/60">
              Get in Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory leading-tight"
          >
            Let's Work <span className="text-gold italic">Together</span>
          </motion.h2>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6 max-w-xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-card border border-border/60 rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-card border border-border/60 rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition-colors duration-300"
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full bg-card border border-border/60 rounded-md px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
          />
          <button
            type="submit"
            className="group flex items-center gap-3 bg-gold/10 border border-gold/40 hover:border-gold hover:bg-gold/20 text-gold px-8 py-3 rounded-md font-body text-sm tracking-widest uppercase transition-all duration-300 mx-auto active:scale-[0.97]"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-16"
        >
          <a
            href="https://www.instagram.com/devansh_pareek"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-body text-sm">Instagram</span>
          </a>
          <div className="w-px h-4 bg-border" />
          <a
            href="mailto:devanshpareek@example.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            <Mail className="w-5 h-5" />
            <span className="font-body text-sm">Email</span>
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 pt-8 border-t border-border/30">
        <p className="text-center font-body text-xs tracking-widest text-muted-foreground/50 uppercase">
          © 2025 Devansh Pareek. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
