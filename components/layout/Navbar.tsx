"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import logoImage from "@/components/logo/logo.png";
import { GithubIcon } from "../ui/github-icon";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    "https://drive.google.com/file/d/1qasR3RiujyUjOjpdcx-bfPuWteNiUS0l/view?usp=sharing"
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/resume", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 404) {
          setResumeUrl(null);
          return;
        }
        if (!response.ok) throw new Error(`Resume API returned ${response.status}.`);
        const resume = (await response.json()) as { url: string };
        setResumeUrl(resume.url);
      })
      .catch((error: unknown) => console.error("Unable to load resume link:", error));
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-black/40 backdrop-blur-2xl border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center group" aria-label="Ramprasad home">
          <Image
            src={logoImage}
            alt="Ramprasad Yadav logo"
            priority
            className="h-9 w-auto sm:h-12 drop-shadow-[0_0_18px_rgba(59,130,246,0.7)]"
            sizes="(max-width: 640px) 120px, 180px"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md2:flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute inset-x-4 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Actions */}
        <div className="hidden md2:flex items-center gap-4">
          <Link href="https://github.com/Ramprasadya" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <GithubIcon isAnimated={true} className="w-5 h-5 text-orange-500" title="GitHub" />
            </Button>
          </Link>
          {resumeUrl && (
            <Link href={resumeUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" className="gap-2 cursor-pointer">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md2:hidden relative z-10 p-2 text-white/70 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 md2:hidden flex flex-col justify-between overflow-y-auto"
          >
            <ul className="flex flex-col gap-2 text-xl font-medium text-white/70 mt-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-white transition-colors flex items-center min-h-[56px] w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 pb-8 mt-auto">
              {resumeUrl && (
                <Link href={resumeUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="w-full gap-2 cursor-pointer">
                    <Download className="w-4 h-4" />
                    Resume
                  </Button>
                </Link>
              )}
              <Link href="https://github.com/Ramprasadya" target="_blank" rel="noreferrer" className="w-full">
                <Button variant="ghost" className="w-full rounded-xl border border-white/10 gap-2">
                  <GithubIcon isAnimated={true} className="w-5 h-5" />
                  GitHub
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
