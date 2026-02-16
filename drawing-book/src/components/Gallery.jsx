import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaDownload } from 'react-icons/fa';

const Gallery = ({ images, onDelete }) => {
    return (
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 pb-24 min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#3a3a3a] text-white relative overflow-hidden">
            {/* Mobile-friendly decorative elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,175,55,0.03)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(249,214,112,0.03)_0%,transparent_40%)]"></div>
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(212,175,55,0.05)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(249,214,112,0.05)_0%,transparent_40%)]"></div>
            <motion.h2 
                className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 font-semibold tracking-wider gold-text pb-3 sm:pb-4 border-b border-[#d4af37]/30 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                🎨 Gallery Collection
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
                <div className="gallery-grid grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {images.map((img) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="gallery-item relative group aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#3a3a3a] border border-[#d4af37]/20 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 glow"
                        >
                            <img
                                src={img.link}
                                alt={img.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 sm:p-4">
                                <div className="text-right">
                                    {/* <span className="text-xs text-gray-400">{img.name}</span> */}
                                </div>

                                <div className="flex justify-center gap-3 sm:gap-4">
                                    <motion.a
                                        href={img.link}
                                        download={img.name}
                                        className="p-2 sm:p-3 bg-gradient-to-r from-[#d4af37] to-[#f9d670] text-black rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center"
                                        title="Download"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaDownload size={16} className="sm:w-5 sm:h-5" />
                                    </motion.a>
                                    <motion.button
                                        onClick={() => onDelete(img.path)}
                                        className="p-2 sm:p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center"
                                        title="Delete"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaTrash size={16} className="sm:w-5 sm:h-5" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
                                <p className="text-sm truncate font-medium text-[#f9d670] tracking-wide">{img.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
