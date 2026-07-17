

import { MotionDiv } from "./MotionDiv";
import { Building2, Calendar } from "lucide-react";

interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    location: string;
    description: string[];
    technologies: string[];
    logo?: string;
}

const experiences: Experience[] = [
    {
    id: "exp-1",
    company: "Freelancer",
    role: "Software Developer",
    duration: "March 2026 – Present",
    location: "(Remote)",
    description: [
        "Designed and built custom websites for multiple clients using Next.js and TypeScript, delivering responsive, SEO-friendly frontends from initial concept through deployment.",
        "Developed backend APIs and database schemas with Express.js and PostgreSQL to support client-facing features such as authentication, content management, and contact/lead forms.",
        "Managed end-to-end freelance projects — client communication, scoping, timelines, and delivery — while maintaining clean, documented, and maintainable codebases.",
    ],
    technologies: ["Express.js", "PostgreSQL", "TypeScript", "Next.js"],
},
   
];

export default function Experience() {
    return (
        <section id="exp" className="py-20 z-50 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <h2 className="sr-only">Work Experience</h2>
                {/* Section Header */}
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-6 mb-16"
                >
                    <span className="text-gray-300 font-mono text-xs tracking-[0.2em] font-medium whitespace-nowrap">
                        04 // EXPERIENCE
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </MotionDiv>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <MotionDiv
                                key={exp.id}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative pl-12 md:pl-16"
                            >
                                {/* Timeline dot */}
                                <div className="absolute -left-1.5 top-2 w-4 h-4 rounded-full bg-[#00ea7b] border-2 border-[#0a0a0a] z-10 hidden md:block" />
                                <div className="absolute -left-1.5 top-2 w-4 h-4 rounded-full bg-[#00ea7b] border-2 border-[#0a0a0a] z-10 md:hidden" />

                                {/* Experience Card */}
                                <div className="group relative bg-[#111111] border border-white/10 hover:border-[#00ea7b]/40 transition-all duration-300 p-6 md:p-8 rounded-none">
                                    {/* Company & Role Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#00ea7b]/10 border border-[#00ea7b]/30 flex items-center justify-center shrink-0">
                                                <Building2 className="w-5 h-5 text-[#00ea7b]" />
                                            </div>
                                            <div>
                                                <p className="font-mono text-xs text-[#00ea7b] uppercase tracking-wider">
                                                    {exp.company}
                                                </p>
                                                <h3 className="text-white font-bold text-lg md:text-xl leading-tight group-hover:text-[#00ea7b] transition-colors duration-300">
                                                    {exp.role}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Duration & Location */}
                                        <div className="flex flex-col items-end text-right shrink-0 md:w-52">
                                            <div className="flex items-center gap-1.5 text-gray-400 text-sm font-mono">
                                                <Calendar className="w-3.5 h-3.5 text-[#00ea7b]" />
                                                <span className="whitespace-nowrap">{exp.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono mt-1">
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3 text-gray-400 leading-relaxed text-sm md:text-base mb-6">
                                        {exp.description.map((desc, descIndex) => (
                                            <p key={descIndex} className="relative pl-4 border-l border-white/5 ml-2">
                                                {desc}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="font-mono text-[10px] text-gray-500 uppercase tracking-wider border border-white/10 px-2.5 py-1 bg-white/5 hover:border-[#00ea7b]/50 hover:text-[#00ea7b] transition-all duration-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}