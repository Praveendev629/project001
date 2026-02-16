import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthGate = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'L.K art') {
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
            {/* Cinematic Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 flex flex-col items-center gap-6 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl"
            >
                <h1 className="text-3xl font-light tracking-[0.2em] text-gray-200">L.K ARTS</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
                    <motion.input
                        type="password"
                        placeholder="Enter Passkey"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-center tracking-widest text-lg focus:outline-none focus:border-white/50 transition-colors placeholder:text-gray-500"
                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-wider text-sm"
                    >
                        Unlock
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AuthGate;
