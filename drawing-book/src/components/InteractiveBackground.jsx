import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const InteractiveBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const particleCount = 20;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />

            {/* Floating Particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-app-gold opacity-20"
                    initial={{
                        x: `${particle.x}vw`,
                        y: `${particle.y}vh`,
                        opacity: 0,
                    }}
                    animate={{
                        y: [
                            `${particle.y}vh`,
                            `${(particle.y + 50) % 100}vh`,
                            `${particle.y}vh`
                        ],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: particle.size,
                        height: particle.size,
                        boxShadow: `0 0 ${particle.size * 2}px #D4AF37`,
                    }}
                />
            ))}

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />
        </div>
    );
};

export default InteractiveBackground;
