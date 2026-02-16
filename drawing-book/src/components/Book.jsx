import React, { forwardRef, useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Book = ({ images }) => {
    const bookRef = useRef(null);

    // Format filename: remove extension and underscores
    const formatName = (name) => {
        return name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    };

    const nextPage = () => {
        bookRef.current.pageFlip().flipNext();
    };

    const prevPage = () => {
        bookRef.current.pageFlip().flipPrev();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative flex items-center justify-center h-full w-full perspective-[1500px]"
        >
            {/* Transparent Navigation Arrows with Animations */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 sm:px-4 md:px-12 pointer-events-none z-50">
                <motion.button
                    whileHover={{ scale: 1.2, x: -10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevPage}
                    className="pointer-events-auto p-3 sm:p-4 rounded-full bg-transparent text-[#d4af37] hover:text-[#f9d670] backdrop-blur-sm transition-all flex items-center justify-center group"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <motion.div
                        animate={{ x: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <FaChevronLeft size={24} className="sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </motion.div>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.2, x: 10 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextPage}
                    className="pointer-events-auto p-3 sm:p-4 rounded-full bg-transparent text-[#d4af37] hover:text-[#f9d670] backdrop-blur-sm transition-all flex items-center justify-center group"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <FaChevronRight size={24} className="sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                    </motion.div>
                </motion.button>
            </div>

            <div className="relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <HTMLFlipBook
                    width={400}
                    height={600}
                    showCover={true}
                    maxShadowOpacity={0.6}
                    className="book-shadow"
                    ref={bookRef}
                    mobileScrollSupport={true}
                >
                    {/* COVER */}
                    <div className="demoPage bg-[#3e2723] h-full w-full flex flex-col items-center justify-center border-r-4 border-[#1a0f08] relative overflow-hidden">
                        {/* Leather Texture Overlay */}
                        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] filter contrast-125"></div>

                        {/* Gold Border Frame */}
                        <div className="absolute inset-4 border-2 border-[#d4af37] border-double opacity-80 z-10"></div>
                        <div className="absolute inset-6 border border-[#d4af37] opacity-60 z-10"></div>

                        <div className="relative z-20 flex flex-col items-center p-6 sm:p-8 text-center">
                            <motion.h1 
                                className="text-4xl sm:text-6xl font-serif text-[#ffd700] tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-gold-glow"
                                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                            >
                                Drawing<br />Book
                            </motion.h1>
                            <motion.div 
                                className="w-16 sm:w-24 h-1 bg-[#d4af37] my-6 sm:my-8 rounded-full shadow-[0_0_10px_#d4af37]"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "w-16 sm:w-24", opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                            ></motion.div>
                            <motion.p 
                                className="text-lg sm:text-xl text-[#ffd700] tracking-[0.3em] font-light opacity-90 uppercase"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            >
                                L.K ARTS
                            </motion.p>
                            <motion.p 
                                className="mt-10 sm:mt-20 text-[#a1887f] text-xs tracking-widest"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.7 }}
                                transition={{ duration: 1, delay: 1.2 }}
                            >
                                PRIVATE COLLECTION
                            </motion.p>
                        </div>
                    </div>

                    {/* PAGES */}
                    {images.map((img, index) => (
                        <div className="demoPage bg-[#fdfbf7] h-full w-full flex flex-col relative" key={img.id}>
                            {/* Paper Texture */}
                            <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

                            {/* Image Container */}
                            <div className="flex-grow flex items-center justify-center p-6 lg:p-10 relative z-10">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gray-200 blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                    <img
                                        src={img.link}
                                        alt={img.name}
                                        className="max-w-full max-h-[450px] object-contain shadow-lg border-4 border-white transform transition duration-500 group-hover:scale-[1.02]"
                                    />
                                </div>
                            </div>

                            {/* Footer / Page Number */}
                            <div className="h-16 flex items-center justify-center relative z-10">
                                <span className="font-serif italic text-gray-400 text-sm tracking-widest border-t border-gray-200 pt-2 px-8">
                                    {formatName(img.name)}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* END PAGE */}
                    <div className="demoPage bg-[#fdfbf7] h-full w-full flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                        <div className="text-center relative z-10">
                            <h2 className="text-4xl font-serif text-gray-300 italic mb-4">Fin</h2>
                            <button
                                onClick={() => bookRef.current.pageFlip().flip(0)}
                                className="text-xs uppercase tracking-widest text-[#d4af37] hover:text-[#b89628] transition-colors border-b border-[#d4af37] pb-1"
                            >
                                Return to Cover
                            </button>
                        </div>
                    </div>
                </HTMLFlipBook>
            </div>
        </motion.div>
    );
};

export default Book;
