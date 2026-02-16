import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file || !name) return;

        setUploading(true);
        await onUpload(file, name);
        setUploading(false);
        setFile(null);
        setName('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-[#1e1e1e] border border-gray-700 w-full max-w-md rounded-2xl p-6 shadow-2xl text-white"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h3 className="text-2xl font-light mb-6">Publish Art</h3>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="border-2 border-dashed border-gray-600 hover:border-gray-400 rounded-xl p-8 flex flex-col items-center gap-2 transition-colors cursor-pointer relative bg-white/5">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <FaCloudUploadAlt size={40} className="text-gray-400" />
                                <p className="text-sm text-gray-300 font-medium">
                                    {file ? file.name : "Tap to select image"}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-400 mb-1 ml-1">Artwork Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sunset Dreams"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:border-white/50 transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!file || !name || uploading}
                                className="mt-2 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {uploading ? 'Publishing...' : 'Publish to Gallery'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default UploadModal;
