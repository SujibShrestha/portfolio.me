

import { MotionDiv } from "./MotionDiv";
import Image from "next/image";

export default function About() {
    return (
        <section id="about" className="py-20 z-50 bg-[#0a0a0a] text-white">
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
                        01 // ABOUT
                    </span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                </MotionDiv>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">

                    {/* Left Column - Text content */}
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-8 max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Backend systems. AI that actually works.
                        </h2>

                        <div className="space-y-6 text-gray-400 leading-relaxed text-[15px] md:text-base">
                            <p>
                                I'm a backend and GenAI developer who knows my way around the full stack.
                                I spend most of my time designing APIs, wiring up LLM pipelines, and making
                                sure the infrastructure holding it all together doesn't fall apart under pressure.
                            </p>

                            <p>
                                I enjoy the part of AI development most people skip — prompt engineering,
                                retrieval systems, evals, and getting models to behave reliably in production.
                                The frontend exists too, and I can build it, but the interesting problems
                                for me live a few layers deeper.
                            </p>
                        </div>
                    </MotionDiv>

                    {/* Right Column - Image */}
                    <MotionDiv
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-full max-w-[400px] lg:w-[400px] mx-auto lg:mx-0"
                    >
                        <div className="relative aspect-square rounded-2xl border-2 border-[#00ea7b] shadow-[0_0_20px_rgba(0,234,123,0.15)] overflow-hidden">
                            <Image
                                src="/assets/profile.png"
                                alt="Profile"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                sizes="(max-width: 768px) 100vw, 400px"
                            />
                        </div>
                    </MotionDiv>

                </div>
            </div>
        </section>
    );
}
