"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const previous = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const parent = containerRef.current?.parentElement;
        if (!parent) return;

        const move = (e: MouseEvent) => {
            const dx = e.clientX - previous.current.x;
            const dy = e.clientY - previous.current.y;

            // Calculate angle of movement
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            setRotation(angle);

            previous.current = {
                x: e.clientX,
                y: e.clientY,
            };

            setMouse({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const enter = () => setIsHovering(true);
        const leave = () => setIsHovering(false);

        parent.addEventListener("mousemove", move);
        parent.addEventListener("mouseenter", enter);
        parent.addEventListener("mouseleave", leave);

        return () => {
            parent.removeEventListener("mousemove", move);
            parent.removeEventListener("mouseenter", enter);
            parent.removeEventListener("mouseleave", leave);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: mouse.x - 40,
                            y: mouse.y - 40,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="fixed top-0 left-0 pointer-events-none"
                        transition={{
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 },
                            x: {
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                                mass: 0.8,
                            },
                            y: {
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                                mass: 0.8,
                            }
                        }}
                    >
                        <motion.div
                            animate={{
                                rotate: rotation,
                                y: [0, -10, 0],
                            }}
                            transition={{
                                rotate: {
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 20,
                                },
                                y: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                        >
                            <Image
                                src="/assets/amongus.png"
                                alt="Among Us"
                                width={80}
                                height={80}
                                draggable={false}
                                className="select-none opacity-50"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}