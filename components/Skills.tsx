import { MotionDiv } from "./MotionDiv";

export default function Skills() {
    const skills = [
        {
            category: "Backend",
            items: [
                "ExpressJS",
                "FastAPI",
                "SQL/NoSQL DB",
                "PostgreSQL"
            ]
        },
        {
            category: "AI",
            items: [
                "RAG",
                "LLM",
                "Fine-Tuning",
                "Vector DB",
                "LangChain",

            ]
        },
        {
            category: "Frontend",
            items: [
                "Next.js",
                "React.js",
                "TailwindCSS"
            ]
        },
        {
            category: "Tools & Platforms",
            items: [
                "Docker",
                "Git",
                "Postman",
                "Vercel",
                "GitHub Actions"
            ]
        }
    ]

    return (
        <section id="skills" className="py-20 z-50 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-6 mb-16"
                >
                    <span className="text-gray-300 font-mono text-xs tracking-[0.2em] font-medium whitespace-nowrap">
                        02 // SKILLS
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                </MotionDiv>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skillGroup, index) => (
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-white/10 p-6 md:p-8 bg-[#0a0a0a] hover:border-[#00ea7b]/50 transition-colors group relative overflow-hidden"
                        >
                            {/* Subtle background glow effect on hover */}
                            <div className="absolute inset-0 bg-[#00ea7b]/0 group-hover:bg-[#00ea7b]/2 transition-colors duration-500 pointer-events-none" />

                            <h3 className="text-[#00ea7b] font-mono text-sm font-bold uppercase tracking-widest mb-6">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((item, itemIndex) => (
                                    <span
                                        key={itemIndex}
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-xs md:text-sm text-gray-300 font-mono hover:text-white hover:border-white/30 transition-all cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </MotionDiv>
                    ))}
                </div>

            </div>
        </section>
    )
}