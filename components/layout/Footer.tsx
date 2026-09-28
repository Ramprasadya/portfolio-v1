import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import logoImage from "@/components/logo/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 md:py-12 border-t border-white/[0.02] relative bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 md:px-6 xl:px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex items-center gap-3 group">
          <Image
            src={logoImage}
            alt="Ramprasad Yadav logo"
            className="h-10 w-auto opacity-90 drop-shadow-[0_0_18px_rgba(59,130,246,0.6)]"
            sizes="160px"
          />
          <span className="text-white/40 text-sm font-light">
            © {currentYear} Ramprasad. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/Ramprasadya" target="_blank" className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
            <Github className="w-4 h-4" />
          </Link>
          <Link href="https://linkedin.com/in/ramprasad-yadav-0b44b827a/" target="_blank" className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link href="mailto:yadavramprasad563@gmail.com" className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all">
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
