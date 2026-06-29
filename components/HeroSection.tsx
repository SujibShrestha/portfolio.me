
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";


const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// --- Social links ---
const SOCIALS = [
  { href: "https://github.com/SujibShrestha", icon: <GithubIcon />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/sujib-shrestha-245868282/", icon: <LinkedinIcon />, label: "LinkedIn" },
  { href: "https://twitter.com/sujibshrestha", icon: <XIcon />, label: "X / Twitter" },
];

const HeroSection = () => {


  return (
    <section className="relative flex min-h-screen items-center bg-[#0a0a0a] overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(74,222,128,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 lg:px-12">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">

          {/* ── LEFT: text content ── */}
          <div className="flex-1 text-left max-w-xl">
            {/* Greeting */}
            <p className="font-mono text-sm text-[#4ade80] tracking-[0.25em] uppercase mb-4">
              Hi, I&apos;m
            </p>

            {/* Name */}
            <h1 className="font-sans text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
              Sujib{" "}
              <span className="text-[#4ade80]">Shrestha</span>
            </h1>

            {/* Typing subtitle */}
            <div className="mt-4 flex items-center gap-2 font-mono text-lg text-[#a1a1a1] sm:text-xl min-h-[1.75rem]">
              <span>Software Developer</span>
              <span className="inline-block h-5 w-0.5 bg-[#4ade80] animate-pulse" />
            </div>

            {/* Description */}
            <p className="mt-6 text-base text-[#6b6b6b] leading-relaxed sm:text-lg">
              Passionate about building scalable web applications and exploring new
              technologies. Crafting clean, efficient solutions for complex digital
              problems.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded bg-[#4ade80] px-6 py-3 font-mono text-sm font-bold text-black uppercase tracking-wider transition-all duration-200 hover:bg-[#22c55e] hover:shadow-[0_0_24px_rgba(74,222,128,0.4)]"
              >
                View Projects
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="/assets/sujib-shrestha-cv.pdf"
                download
                className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 hover:bg-white/10 hover:border-white/20"
              >
                Download CV
                <Download size={15} />
              </a>
            </div>

            {/* Social icons */}
            <div className="mt-8 flex items-center gap-4">
              {SOCIALS.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#6b6b6b] transition-all duration-200 hover:border-[#4ade80]/40 hover:text-[#4ade80] hover:bg-[#4ade80]/5"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: rotating earth video ── */}
          <div className="hidden md:flex relative flex-shrink-0 items-center justify-center">

            <video
              className="relative h-72 w-72 rounded-full object-cover sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/assets/rotate_earth.mp4" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;