import React from "react";

interface SocialLink {
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://github.com/SujibShrestha",
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/sujib-shrestha-245868282/",
    label: "LinkedIn",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] border-t border-white/10 text-white">
      <div className="container mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="font-sans text-sm font-medium tracking-[0.2em] text-[#00ea7b]">
              Sujib Shrestha
            </p>
          </div>

          {/* Center */}
          <div>
            <p className="text-sm text-gray-600">&copy; {currentYear} Built with Precision</p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-center space-y-2 text-center md:items-end md:text-right">
            <div className="flex items-center gap-6 text-xs text-gray-500">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors font-mono  hover:text-[#00ea7b]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}