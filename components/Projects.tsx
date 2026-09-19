"use client";

import { useState } from "react";
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
import { GitFork, ExternalLink, ArrowRight, X } from "lucide-react";

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
        id: "TableTap",
        number: "01",
        title: "TableTap",
        description:
            "A QR-based restaurant ordering platform where customers scan a table QR to browse menus, order, and pay from their phone. Orders sync live to the kitchen via WebSockets with role-based dashboards for waiters, kitchen, cashiers, and admins.",
        image: "/screenshot/tabletap.png",
        tags: ["React.js", "Node.js", "PostgreSQL", "WebSockets"],
        githubUrl: "https://github.com/SujibShrestha/TableTap",
        problemSolved: "Traditional restaurant ordering relies on paper menus and manual order relay, causing delays and miscommunication. TableTap digitizes the entire flow — from menu browsing to kitchen alerts — reducing order-to-table time and eliminating middleman errors.",
        features: [
            "Real-time order sync via WebSockets between customer, waiter, and kitchen",
            "Role-based dashboards for waiters, kitchen staff, cashiers, and admins",
            "QR code generation per table for instant menu access",
            "Sales analytics and profit tracking for restaurant owners"
        ],
        results: "60+ commits of active development. Full-stack system handling real-time bidirectional communication across 4 user roles.",
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
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                    <a
                        href="https://github.com/SujibShrestha?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[10px] text-gray-400 uppercase tracking-widest border border-white/10 px-3 py-1.5 hover:text-[#00ea7b] hover:border-[#00ea7b]/40 transition-all duration-200 shrink-0"
                    >
                        More Projects
                    </a>
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
                                        className="object-cover group-hover:scale-105 transition-all duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#111111]/80 via-transparent to-transparent" />
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
                                </CardContent>

                                <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
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
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-[#00ea7b] transition-colors duration-200 shrink-0 ml-4"
                                    >
                                        VIEW DETAILS
                                        <ArrowRight size={12} />
                                    </button>
                                </CardFooter>
                            </Card>
                        </MotionDiv>
                    ))}
                </div>
            </div>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    {/* Modal */}
                    <div
                        className="relative bg-[#111111] border border-white/10 max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 md:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>

                        {/* Modal content */}
                        <span className="font-mono text-[10px] text-[#00ea7b] uppercase tracking-widest">
                            {selectedProject.number} // {selectedProject.title}
                        </span>

                        <h3 className="text-white font-bold text-xl mt-3 mb-4">
                            {selectedProject.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {selectedProject.description}
                        </p>

                        {selectedProject.problemSolved && (
                            <div className="mb-5">
                                <strong className="text-white block font-mono text-[10px] uppercase tracking-wide mb-2">Problem Solved</strong>
                                <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.problemSolved}</p>
                            </div>
                        )}

                        {selectedProject.features && (
                            <div className="mb-5">
                                <strong className="text-white block font-mono text-[10px] uppercase tracking-wide mb-2">Key Features</strong>
                                <ul className="space-y-1.5">
                                    {selectedProject.features.map((feat, idx) => (
                                        <li key={idx} className="text-gray-400 text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-px before:bg-[#00ea7b]">
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedProject.results && (
                            <div className="mb-6">
                                <strong className="text-white block font-mono text-[10px] uppercase tracking-wide mb-2">Results</strong>
                                <p className="text-gray-400 text-sm leading-relaxed">{selectedProject.results}</p>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                            {selectedProject.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[10px] text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 bg-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
