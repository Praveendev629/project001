import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaArrowRight, FaCheck } from 'react-icons/fa';

const AuthGate = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating a check for uniformity
        await new Promise(resolve => setTimeout(resolve, 800));

        if (password === 'L.K art') {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                onLogin();
            }, 1000); // Wait for success animation
        } else {
            setError(true);
            setIsLoading(false);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a]">
            {/* Enhanced decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(185,28,28,0.1)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(127,29,29,0.1)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.08)_0%,transparent_70%)]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="z-10 flex flex-col items-center gap-8 p-8 sm:p-10 bg-gradient-to-br from-[#1a1a1a]/70 to-[#0f0f0f]/50 backdrop-blur-2xl rounded-3xl border border-[#b91c1c]/30 shadow-[0_0_50px_rgba(185,28,28,0.2)] w-full max-w-md mx-4 glow"
            >
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                        className="relative flex flex-col items-center gap-4"
                    >
                        <img src="/logo.png" alt="L.K ARTS Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_12px_rgba(185,28,28,0.5)]" />
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider red-text text-center relative z-10">
                            L.K ARTS
                        </h1>
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] rounded-2xl blur opacity-25 -z-10"></div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-[#dc2626] text-xs tracking-widest uppercase font-medium"
                    >
                        Secure Gallery Access
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${isSuccess ? "text-green-400 scale-110" : "text-[#dc2626]/60 group-focus-within:text-[#dc2626] group-focus-within:scale-110"}`}>
                            {isSuccess ? <FaCheck size={18} className="drop-shadow-[0_0_8px_rgba(72,187,120,0.8)]" /> : <FaLock size={18} className="drop-shadow-[0_0_8px_rgba(185,28,28,0.4)]" />}
                        </div>
                        <motion.input
                            type="password"
                            placeholder="Enter Passkey"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading || isSuccess}
                            className={`w-full pl-12 pr-4 py-4 bg-[#1a1a1a]/50 border-2 rounded-xl text-center tracking-[0.2em] text-lg focus:outline-none focus:bg-[#1a1a1a]/70 focus:shadow-[0_0_20px_rgba(185,28,28,0.3)] transition-all duration-300 placeholder:text-[#dc2626]/40 placeholder:tracking-normal placeholder:text-sm ${isSuccess
                                    ? "border-green-500/70 text-green-400 bg-green-900/20 shadow-[0_0_20px_rgba(72,187,120,0.3)]"
                                    : "border-[#b91c1c]/40 text-[#dc2626] hover:border-[#dc2626]/60 focus:border-[#dc2626]"
                                }`}
                            animate={error ? { 
                                x: [-15, 15, -15, 15, 0], 
                                borderColor: "#b91c1c",
                                boxShadow: "0 0 20px rgba(185,28,28,0.4)",
                                backgroundColor: "rgba(185,28,28,0.1)"
                            } : {}}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: isSuccess ? 1 : 1.02 }}
                        whileTap={{ scale: isSuccess ? 1 : 0.98 }}
                        type="submit"
                        disabled={isLoading || isSuccess}
                        className={`relative w-full py-4 font-bold text-sm tracking-[0.2em] uppercase rounded-xl transition-all duration-300 disabled:opacity-100 overflow-hidden group ${isSuccess
                                ? "bg-gradient-to-r from-green-600 to-green-500 text-white shadow-[0_0_30px_rgba(72,187,120,0.6)] border border-green-400/60 glow"
                                : "bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white shadow-[0_0_20px_rgba(185,28,28,0.3)] hover:shadow-[0_0_30px_rgba(185,28,28,0.5)] hover:from-[#991b1b] hover:to-[#7f1d1d] border border-[#b91c1c]/40"
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                            </span>
                        ) : isSuccess ? (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-2 text-lg"
                            >
                                <FaCheck /> ACCESS GRANTED <FaCheck />
                            </motion.span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Unlock Gallery <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                            </span>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AuthGate;
