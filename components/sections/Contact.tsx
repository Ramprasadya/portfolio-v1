"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Send, Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-20 xl:py-32 relative overflow-hidden">
      <div className="absolute inset-0 radial-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-6 xl:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Get In <span className="text-white/40">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-base md:text-lg text-white/50 max-w-2xl font-light mx-auto"
          >
            Ready to start your next project? Let's discuss how we can build
            something extraordinary together.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <div className="glass-card p-6 md:p-8 flex items-start gap-4 md:gap-6 group">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5 tracking-tight">Email</h3>
                <p className="text-white/40 mb-2 font-light">Drop me a line anytime.</p>
                <a href="mailto:yadavramprasad563@gmail.com" className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-all">
                  yadavramprasad563@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 flex items-start gap-4 md:gap-6 group">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5 tracking-tight">Location</h3>
                <p className="text-white/40 mb-2 font-light">Available for work opportunities.</p>
                <span className="text-white/80">Noida(India)</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="glass-card p-6 md:p-8 lg:p-10"
          >
            <form className="flex flex-col gap-5 md:gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 min-h-[44px] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 min-h-[44px] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-white/70">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                />
              </div>
              <Button size="lg" className="w-full mt-2 gap-2 group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
