import { MotionDiv } from "./MotionDiv";
import { Mail, MapPin, MessageSquare,  ExternalLink } from "lucide-react";

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

export default function Contact() {
    return (
        <section id="contact" className="py-20 z-50 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                {/* Section Header */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-6 mb-16"
                >
                    <span className="text-gray-300 font-mono text-xs tracking-[0.2em] font-medium whitespace-nowrap">
                        05 // GET IN TOUCH
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </MotionDiv>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left side - Info */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-10"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                                Let&apos;s build something
                                <br />
                                <span className="text-[#00ea7b]">together</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                I&apos;m always open to discussing new projects, creative ideas, or opportunities
                                to be part of something meaningful. Whether it&apos;s a backend system that needs
                                scaling or an AI product that needs shipping &mdash; let&apos;s talk.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6 pt-4 border-t border-white/10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#00ea7b]/10 border border-[#00ea7b]/30 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-[#00ea7b]" />
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-[#00ea7b] uppercase tracking-wider mb-1">Email</p>
                                    <a href="mailto:sujibshrestha78@gmail.com" className="text-gray-300 hover:text-[#00ea7b] transition-colors">
                                        sujibshrestha78@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#00ea7b]/10 border border-[#00ea7b]/30 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-[#00ea7b]" />
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-[#00ea7b] uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-gray-300">Kathmandu,Nepal (Remote)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#00ea7b]/10 border border-[#00ea7b]/30 flex items-center justify-center shrink-0">
                                    <MessageSquare className="w-5 h-5 text-[#00ea7b]" />
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-[#00ea7b] uppercase tracking-wider mb-1">Availability</p>
                                    <p className="text-gray-300">Open to freelance, contract, full-time</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-4 border-t border-white/10">
                            <p className="font-mono text-xs text-[#00ea7b] uppercase tracking-wider mb-4">Find me elsewhere</p>
                            <div className="flex items-center gap-4">
                                {SOCIAL_LINKS.map(({ href, icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-200 hover:border-[#00ea7b]/40 hover:text-[#00ea7b] hover:bg-[#00ea7b]/5"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </MotionDiv>

                    {/* Right side - Contact Form */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#111111] border border-white/10 p-6 md:p-8"
                    >
                        <h3 className="text-xl font-bold mb-6">Send a message</h3>
                        <form className="space-y-5" action="https://formspree.io/f/your-form-id" method="POST">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:border-[#00ea7b] focus:outline-none focus:ring-1 focus:ring-[#00ea7b] transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:border-[#00ea7b] focus:outline-none focus:ring-1 focus:ring-[#00ea7b] transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:border-[#00ea7b] focus:outline-none focus:ring-1 focus:ring-[#00ea7b] transition-all"
                                    placeholder="Project inquiry, collaboration, etc."
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full bg-[#0a0a0a] border border-white/10 text-white px-4 py-3 font-mono text-sm focus:border-[#00ea7b] focus:outline-none focus:ring-1 focus:ring-[#00ea7b] transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full group inline-flex items-center justify-center gap-2 rounded bg-[#00ea7b] px-6 py-3 font-mono text-sm font-bold text-black uppercase tracking-wider transition-all duration-200 hover:bg-[#22c55e] hover:shadow-[0_0_24px_rgba(0,234,123,0.4)]"
                            >
                                Send Message
                                <ExternalLink size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                            </button>
                        </form>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
}