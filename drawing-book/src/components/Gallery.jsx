import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaDownload } from 'react-icons/fa';

const Gallery = ({ images, onDelete }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageId) => {
        setSelectedImage(selectedImage === imageId ? null : imageId);
    };

    return (
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 pb-24 min-h-screen bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a] text-[#ffffff] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(185,28,28,0.02)_0%,transparent_40%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(127,29,29,0.02)_0%,transparent_40%)]"></div>
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
                            className="gallery-item relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-visible bg-gradient-to-br from-[#1a1a1a]/60 to-[#0f0f0f]/40 border border-[#b91c1c]/30 shadow-md sm:shadow-lg hover:shadow-2xl transition-all duration-300 glow"
                            onClick={() => handleImageClick(img.id)}
                        >
                            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden">
                                <img
                                    src={img.link}
                                    alt={img.name}
                                    className="w-full h-full object-cover transition-transform duration-500"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/60 to-transparent text-center pointer-events-none">
                                    <p className="artwork-name truncate font-bold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{img.name}</p>
                                </div>
                            </div>

                            {/* Action Buttons - Slide in from outside right edge */}
                            <motion.div
                                initial={{ opacity: 0, x: 80 }}
                                animate={{
                                    opacity: selectedImage === img.id ? 1 : 0,
                                    x: selectedImage === img.id ? 0 : 80
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute top-1/2 -translate-y-1/2 -right-2 flex flex-col gap-3 z-10"
                                style={{ pointerEvents: selectedImage === img.id ? 'auto' : 'none' }}
                            >
                                <motion.a
                                    href={img.link}
                                    download={img.name}
                                    className="p-3 sm:p-4 bg-gradient-to-r from-[#7f1d1d] to-[#991b1b] text-white rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(185,28,28,0.5)] border border-[#b91c1c]/40"
                                    title="Download"
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <FaDownload size={18} className="sm:w-5 sm:h-5" />
                                </motion.a>
                                <motion.button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(img.path);
                                    }}
                                    className="p-3 sm:p-4 bg-gradient-to-r from-[#991b1b] to-[#7f1d1d] text-white rounded-full backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(127,29,29,0.5)] border border-[#7f1d1d]/40"
                                    title="Delete"
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTrash size={18} className="sm:w-5 sm:h-5" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
