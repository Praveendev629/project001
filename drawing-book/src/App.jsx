import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaThLarge, FaPlus, FaCamera } from 'react-icons/fa';
import './App.css';

import AuthGate from './components/AuthGate';
import Book from './components/Book';
import Gallery from './components/Gallery';
import UploadModal from './components/UploadModal';

import { listImagesFromDropbox, uploadImageToDropbox, deleteImageFromDropbox } from './services/dropboxService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('book'); // 'book' | 'gallery'
  const [images, setImages] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load authentication state
  // useEffect(() => {
  //   const auth = sessionStorage.getItem('isAuthenticated');
  //   if (auth === 'true') {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // Fetch images when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadImages();
    }
  }, [isAuthenticated]);

  const loadImages = async () => {
    setLoading(true);
    try {
      const imgs = await listImagesFromDropbox();
      setImages(imgs);
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    // sessionStorage.setItem('isAuthenticated', 'true'); // Removed to require login on refresh
  };

  const handleUpload = async (file, name) => {
    try {
      await uploadImageToDropbox(file, name);
      await loadImages(); // Refresh list
      setView('book'); // Switch to book view to see new page
    } catch (error) {
      alert("Upload failed. Please try again.");
    }
  };

  const handleDelete = async (path) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      try {
        await deleteImageFromDropbox(path);
        await loadImages();
      } catch (error) {
        alert("Delete failed.");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a] text-[#ffffff] font-sans overflow-hidden">
        <div className="relative z-10">
          <AuthGate onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#000000] via-[#0d0d0d] to-[#1a1a1a] text-[#ffffff] font-sans overflow-hidden">

      {/* Enhanced Top Navigation Bar with Logo */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-4 flex justify-between items-center pointer-events-none">
        <motion.div 
          className="pointer-events-auto bg-gradient-to-r from-[#1a1a1a]/80 to-[#0f0f0f]/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-[#b91c1c]/40 shadow-[0_0_20px_rgba(185,28,28,0.25)] glow flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src="./logo.png" alt="L.K ARTS Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          <h1 className="text-lg sm:text-xl tracking-wider font-bold red-text">
            L.K ARTS
          </h1>
        </motion.div>
        
        <motion.div
          className="pointer-events-auto bg-gradient-to-r from-[#1a1a1a]/70 to-[#0f0f0f]/50 backdrop-blur-xl px-3 py-2 rounded-xl border border-[#b91c1c]/30 shadow-[0_0_15px_rgba(185,28,28,0.2)] dark-glow"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-[#b91c1c] to-[#7f1d1d] rounded-full animate-pulse-red"></div>
        </motion.div>
      </nav>

      {/* Enhanced Main Content Area */}
      <main className="absolute inset-0 z-10 flex flex-col pt-20 sm:pt-24 pb-24 px-3 sm:px-4 overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'book' ? (
            <motion.div
              key="book"
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-app-gold/30 border-t-app-gold rounded-full animate-spin"></div>
                  <p className="text-sm tracking-widest opacity-70 animate-pulse">LOADING ARTWORK</p>
                </div>
              ) : (
                <div className="w-full max-w-6xl h-[75vh] sm:h-[80vh] md:h-[85vh] mx-auto px-2">
                  <Book images={images} />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full w-full overflow-y-auto no-scrollbar pb-20"
            >
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div className="w-16 h-16 border-4 border-app-gold/30 border-t-app-gold rounded-full animate-spin"></div>
                  <p className="text-sm tracking-widest opacity-70 animate-pulse">LOADING GALLERY</p>
                </div>
              ) : (
                <div className="container mx-auto px-2 sm:px-4">
                  <Gallery images={images} onDelete={handleDelete} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile-Optimized Bottom Navigation Bar */}
      <nav className="fixed bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-xl p-2 sm:p-3 rounded-2xl border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.3)] glow mobile-nav-bar">

        {/* Book View Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('book')}
          className={`relative p-3 sm:p-4 rounded-xl transition-all duration-300 ${view === 'book'
            ? 'text-black bg-gradient-to-r from-[#d4af37] to-[#f9d670] shadow-lg glow'
            : 'text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-white/10'
            }`}
        >
          <FaBookOpen size={20} className="sm:w-6 sm:h-6" />
          {view === 'book' && (
            <motion.div
              layoutId="active-dot"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
            />
          )}
        </motion.button>

        {/* Mobile-Optimized Upload Button */}
        <motion.button
          whileHover={{ scale: 1.1, translateY: -3, boxShadow: "0 0 25px rgba(212, 175, 55, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsUploadOpen(true)}
          className="mx-1 sm:mx-2 p-3.5 sm:p-4 md:p-5 bg-gradient-to-r from-[#d4af37] to-[#f9d670] text-black rounded-full shadow-lg sm:shadow-xl border border-[#d4af37] hover:shadow-2xl floating flex items-center justify-center"
        >
          <FaPlus size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7 font-bold" />
        </motion.button>

        {/* Gallery View Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setView('gallery')}
          className={`relative p-3 sm:p-4 rounded-xl transition-all duration-300 ${view === 'gallery'
            ? 'text-black bg-gradient-to-r from-[#d4af37] to-[#f9d670] shadow-lg glow'
            : 'text-[#d4af37]/60 hover:text-[#d4af37] hover:bg-white/10'
            }`}
        >
          <FaThLarge size={20} className="sm:w-6 sm:h-6" />
          {view === 'gallery' && (
            <motion.div
              layoutId="active-dot"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full"
            />
          )}
        </motion.button>

      </nav>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default App;
