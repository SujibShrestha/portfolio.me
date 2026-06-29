"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);

    const previous = useRef({ x: 0, y: 0 });

    useEffect(() => {
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

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-1"
            animate={{
                x: mouse.x - 40,
                y: mouse.y - 40,
            }}
            transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                mass: 0.8,
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
                    className="select-none"
                />
            </motion.div>
        </motion.div>
    );
}