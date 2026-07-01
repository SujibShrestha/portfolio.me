"use client";

import { MotionDiv } from "../MotionDiv";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { GitFork, ExternalLink, ArrowRight } from "lucide-react";

interface Project {
    id: string;
    number: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const projects: Project[] = [
    {
        id: "PopcornList",
        number: "01",
        title: "Popcorn List",
        description:
            "A real-time analytics engine processing millions of events per second with an AI-powered monitoring dashboard built for enterprise observability.",
        image: "/screenshot/popcornlist.png",
        tags: ["React.js", "Express.js", "Postgress"],
        githubUrl: "https://github.com/SujibShrestha/Movie-watchlist",
        liveUrl: "https://movie-watchlist-py3q.vercel.app/",
    },
    {
        id: "AI video summary assistant",
        number: "02",
        title: "AI video summary assistant",
        description:
            "Summarize youtube video using AI agent that can answer questions about the video",
        image: "/screenshot/videosummarizer.png",
        tags: ["Python", "LangChain", "Chroma", "GroqAi", "HuggingFace"],
        githubUrl: "https://github.com/SujibShrestha/video-agent",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 z-50 bg-[#0a0a0a] text-white">
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
                        03 // SELECTED WORK
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </MotionDiv>

                {/* Project Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <MotionDiv
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className={
                                /* Make the first card span full width on md+ */
                                index === 0
                                    ? "md:col-span-2 lg:col-span-1"
                                    : ""
                            }
                        >
                            <Card className="bg-[#111111] border-white/10 rounded-none overflow-hidden group hover:border-[#00ea7b]/40 transition-all duration-300 h-full flex flex-col">
                                {/* Project Image */}
                                <div className="relative w-full aspect-video overflow-hidden border-b border-white/10">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

                                    {/* Project number badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="font-mono text-xs text-[#00ea7b] bg-[#0a0a0a]/80 backdrop-blur-sm px-2 py-1 border border-[#00ea7b]/30">
                                            {project.number}
                                        </span>
                                    </div>
                                </div>

                                <CardHeader className="px-6 pt-6 pb-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <CardTitle className="text-white font-bold text-lg leading-tight group-hover:text-[#00ea7b] transition-colors duration-300">
                                            {project.title}
                                        </CardTitle>
                                        {/* Action links */}
                                        <div className="flex items-center gap-3 shrink-0 mt-1">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${project.title} GitHub`}
                                                    className="text-gray-500 hover:text-white transition-colors duration-200"
                                                >
                                                    <GitFork size={16} />
                                                </a>
                                            )}
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${project.title} live site`}
                                                    className="text-gray-500 hover:text-white transition-colors duration-200"
                                                >
                                                    <ExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="px-6 py-4 flex-1">
                                    <CardDescription className="text-gray-400 text-sm leading-relaxed">
                                        {project.description}
                                    </CardDescription>
                                </CardContent>

                                <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-[10px] text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-1 bg-white/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View project link */}
                                    {project.liveUrl && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-[#00ea7b] transition-colors duration-200 shrink-0 ml-4"
                                        >
                                            VIEW PROJECT
                                            <ArrowRight size={12} />
                                        </a>
                                    )}
                                </CardFooter>
                            </Card>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}
