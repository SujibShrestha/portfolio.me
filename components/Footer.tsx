import React from 'react';
import { Mail, ExternalLink } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.01 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialLink {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
    { href: "https://github.com/SujibShrestha", icon: <GithubIcon />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/sujib-shrestha-245868282/", icon: <LinkedinIcon />, label: "LinkedIn" },
    { href: "https://twitter.com/sujibshrestha", icon: <XIcon />, label: "X / Twitter" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Left - Copyright & Tagline */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <p className="font-mono text-xs text-[#00ea7b] tracking-[0.2em] font-medium">
                            Sujib Shrestha
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                            Backend systems. AI that actually works.
                        </p>
                        <p className="text-gray-600 text-xs mt-3">
                            &copy; {currentYear} Built with Next.js, TypeScript & Tailwind CSS
                        </p>
                    </div>

                    {/* Center - Social Links */}
                    <div className="flex items-center gap-3">
                        {SOCIAL_LINKS.map(({ href, icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-500 transition-all duration-200 hover:border-[#00ea7b]/40 hover:text-[#00ea7b] hover:bg-[#00ea7b]/5"
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Right - Email & Links */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
                        <a
                            href="mailto:sujibshrestha.dev@gmail.com"
                            className="flex items-center gap-2 text-gray-400 hover:text-[#00ea7b] transition-colors text-sm"
                        >
                            <Mail className="w-4 h-4" />
                            <span>sujibshrestha78@gmail.com</span>
                        </a>
                        <div className="flex items-center justify-center md:justify-end gap-6 text-xs text-gray-500">
                            <a
                                href="https://github.com/SujibShrestha"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:text-[#00ea7b] transition-colors"
                            >
                                <ExternalLink size={12} />
                                <span>Source</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}