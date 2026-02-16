import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaDownload } from 'react-icons/fa';

const Gallery = ({ images, onDelete }) => {
    return (
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 pb-24 min-h-screen bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a] text-[#ffffff] relative overflow-hidden">
            {/* Mobile-friendly decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(185,28,28,0.02)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(127,29,29,0.02)_0%,transparent_40%)]"></div>
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(185,28,28,0.03)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(127,29,29,0.03)_0%,transparent_40%)]"></div>
            <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-bold tracking-wider red-text pb-3 sm:pb-4 border-b border-[#b91c1c]/30 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Gallery Collection
            </motion.h2>

            {images.length === 0 ? (
                <motion.div 
                    className="flex flex-col items-center justify-center h-64 text-gray-400 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-6xl mb-4">✨</div>
                    <p className="text-lg font-medium">No drawings yet</p>
                    <p className="text-sm mt-2 opacity-70">Upload your first artwork to get started!</p>
                </motion.div>
            ) : (
                <div className="gallery-grid grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {images.map((img) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="gallery-item relative group aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1a1a]/60 to-[#0f0f0f]/40 border border-[#b91c1c]/30 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 glow"
                        >
                            <img
                                src={img.link}
                                alt={img.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Action Buttons - Positioned at bottom right */}
                            <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <motion.a
                                    href={img.link}
                                    download={img.name}
                                    className="p-2 bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center shadow-[0_0_8px_rgba(185,28,28,0.3)]"
                                    title="Download"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaDownload size={14} className="sm:w-4 sm:h-4" />
                                </motion.a>
                                <motion.button
                                    onClick={() => onDelete(img.path)}
                                    className="p-2 bg-gradient-to-r from-[#991b1b] to-[#7f1d1d] text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center shadow-[0_0_8px_rgba(127,29,29,0.3)]"
                                    title="Delete"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTrash size={14} className="sm:w-4 sm:h-4" />
                                </motion.button>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/60 to-transparent text-center">
                                <p className="artwork-name truncate font-bold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{img.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
