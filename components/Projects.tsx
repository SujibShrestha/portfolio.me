"use client";

import { MotionDiv } from "./MotionDiv"; 
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
    problemSolved?: string;
    features?: string[];
    results?: string;
}

const projects: Project[] = [
    {
        id: "PopcornList",
        number: "01",
        title: "Popcorn List",
        description:
            "A cinematic watchlist application (Popcorn List) that lets users discover, search, and manage movies with a sleek dashboard UI, integrated with TMDB API or custom database.",
        image: "/screenshot/popcornlist.png",
        tags: ["React.js", "Express.js", "PostgreSQL"],
        githubUrl: "https://github.com/SujibShrestha/Movie-watchlist",
        liveUrl: "https://movie-watchlist-py3q.vercel.app/",
        problemSolved: "Users struggle to keep a unified record of movies they plan to watch or have watched. Popcorn List provides a centralized, real-time application to manage watchlists, browse details, and view viewing statistics seamlessly.",
        features: [
            "Real-time TMDB API integration for up-to-date movie details",
            "User watchlists with custom status tracking (To Watch, Watched)",
            "Dynamic analytics dashboard visualizing watch time and genre breakdown",
            "Responsive UI with instant client-side searching and filtering"
        ],
        results: "Enabled users to organize watchlists in under 2 seconds and reduced search latency to less than 150ms through client-side caching.",
    },
    {
        id: "AI video summary assistant",
        number: "02",
        title: "AI Video Summary Assistant",
        description:
            "An intelligent AI agent that processes long-form YouTube videos to extract concise summaries and answers user questions about the video content in real-time.",
        image: "/screenshot/videosummarizer.png",
        tags: ["Python", "LangChain", "Chroma DB", "Groq AI", "Hugging Face"],
        githubUrl: "https://github.com/SujibShrestha/video-agent",
        problemSolved: "Consuming hours of technical or educational video content is highly time-inefficient. This assistant solves this by transcribing videos and providing a smart retrieval system to answer specific questions instantly.",
        features: [
            "Automated video transcription and text processing pipeline",
            "Semantic chunking and vector embeddings using Hugging Face",
            "Local vector storage with Chroma DB for high-speed similarity search",
            "Context-aware Q&A agent built with LangChain and Groq AI (LLaMA-3)"
        ],
        results: "Saved up to 90% of information retrieval time for users, processing video transcripts and generating summaries in under 5 seconds.",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20 z-50 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <h2 className="sr-only">Selected Projects Portfolio</h2>
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
                                        alt={`${project.title} - Full Stack Project Screenshot`}
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#111111]/80 via-transparent to-transparent" />

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

                                <CardContent className="px-6 py-4 flex-1 space-y-4">
                                    <CardDescription className="text-gray-300 text-sm leading-relaxed">
                                        {project.description}
                                    </CardDescription>

                                    {(project.problemSolved || project.features || project.results) && (
                                        <details className="group/details mt-4 border-t border-white/5 pt-3">
                                            <summary className="font-mono text-[10px] text-[#00ea7b] uppercase tracking-wider cursor-pointer list-none flex items-center justify-between hover:text-[#22c55e] transition-colors">
                                                <span>View Case Study / SEO Details</span>
                                                <span className="transition-transform duration-200 group-open/details:rotate-180">▼</span>
                                            </summary>
                                            <div className="mt-3 space-y-3 text-xs text-gray-400 leading-relaxed">
                                                {project.problemSolved && (
                                                    <div>
                                                        <strong className="text-white block font-mono text-[9px] uppercase tracking-wide mb-1">Problem Solved:</strong>
                                                        <p>{project.problemSolved}</p>
                                                    </div>
                                                )}
                                                {project.features && (
                                                    <div>
                                                        <strong className="text-white block font-mono text-[9px] uppercase tracking-wide mb-1">Key Features:</strong>
                                                        <ul className="list-disc pl-4 space-y-1">
                                                            {project.features.map((feat, idx) => (
                                                                <li key={idx}>{feat}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {project.results && (
                                                    <div>
                                                        <strong className="text-white block font-mono text-[9px] uppercase tracking-wide mb-1">Results:</strong>
                                                        <p>{project.results}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </details>
                                    )}
                                </CardContent>

                                <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-mono text-[10px] text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 bg-white/5"
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
                                            className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-[#00ea7b] transition-colors duration-200 shrink-0 ml-4"
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
