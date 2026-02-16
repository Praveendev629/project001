import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaDownload } from 'react-icons/fa';

const Gallery = ({ images, onDelete }) => {
    return (
        <div className="p-8 pb-24 min-h-screen bg-[#121212] text-white">
            <h2 className="text-3xl mb-8 font-light tracking-wider border-b border-gray-800 pb-4">Gallery</h2>

            {images.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                    No drawings yet. Upload one!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((img) => (
                        <motion.div
                            key={img.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 border border-gray-800"
                        >
                            <img
                                src={img.link}
                                alt={img.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                                <div className="text-right">
                                    {/* <span className="text-xs text-gray-400">{img.name}</span> */}
                                </div>

                                <div className="flex justify-center gap-4">
                                    <a
                                        href={img.link}
                                        download={img.name}
                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors text-white"
                                        title="Download"
                                    >
                                        <FaDownload />
                                    </a>
                                    <button
                                        onClick={() => onDelete(img.path)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500/30 rounded-full backdrop-blur-md transition-colors text-red-500"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-center">
                                <p className="text-sm truncate font-medium text-gray-200">{img.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gallery;
