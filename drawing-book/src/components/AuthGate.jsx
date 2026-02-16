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
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-app-black">
            {/* Radial gradient background to give depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-app-gold/10 via-black to-black opacity-80 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="z-10 flex flex-col items-center gap-8 p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-app-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)] w-full max-w-md mx-4"
            >
                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-light tracking-[0.3em] text-app-gold text-gold-glow text-center">L.K ARTS</h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.6 }}
                        className="text-app-gold/60 text-xs tracking-widest uppercase"
                    >
                        Secure Access
                    </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isSuccess ? 'text-green-500' : 'text-app-gold/50 group-focus-within:text-app-gold'}`}>
                            {isSuccess ? <FaCheck size={16} /> : <FaLock size={16} />}
                        </div>
                        <motion.input
                            type="password"
                            placeholder="Enter Passkey"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading || isSuccess}
                            className={`w-full pl-12 pr-4 py-4 bg-black/40 border rounded-xl text-center tracking-[0.2em] text-lg focus:outline-none focus:bg-black/60 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all placeholder:text-app-gold/20 placeholder:tracking-normal placeholder:text-sm ${isSuccess
                                    ? 'border-green-500/50 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                                    : 'border-app-gold/20 text-app-gold focus:border-app-gold/60'
                                }`}
                            animate={error ? { x: [-10, 10, -10, 10, 0], borderColor: "#ef4444" } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: isSuccess ? 1 : 1.02 }}
                        whileTap={{ scale: isSuccess ? 1 : 0.98 }}
                        type="submit"
                        disabled={isLoading || isSuccess}
                        className={`relative w-full py-4 font-bold text-sm tracking-[0.2em] uppercase rounded-xl transition-all disabled:opacity-100 overflow-hidden group ${isSuccess
                                ? 'bg-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.6)] border border-green-400/50'
                                : 'bg-gradient-to-r from-app-gold to-app-gold-light text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]'
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
                                className="flex items-center justify-center gap-2"
                            >
                                ACCESS GRANTED <FaCheck />
                            </motion.span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Unlock <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AuthGate;
