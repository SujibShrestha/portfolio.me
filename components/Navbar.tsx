"use client";

import  { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#exp", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/6"
        : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-4"
        >
          <Image src="/assets/favicon.png" alt="Logo" width={40} height={30} /> <p className="font-mono text-sm font-semibold text-white tracking-wide hover:text-[#4ade80] transition-colors duration-200">Sujib</p>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-mono text-xs text-[#a1a1a1] uppercase tracking-widest hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded bg-[#4ade80] px-4 py-2 font-mono text-xs font-bold text-black tracking-wider uppercase transition-all duration-200 hover:bg-[#22c55e] hover:shadow-[0_0_16px_rgba(74,222,128,0.4)]"
          >
            Hire Me
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/6`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-xs text-[#a1a1a1] uppercase tracking-widest hover:text-white transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center rounded bg-[#4ade80] px-4 py-2 font-mono text-xs font-bold text-black tracking-wider uppercase"
            >
              Hire Me
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;