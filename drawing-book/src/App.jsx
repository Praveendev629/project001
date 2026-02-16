import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookOpen, FaThLarge, FaPlus } from 'react-icons/fa';
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

  // Load authentication state from session storage
  useEffect(() => {
    const auth = sessionStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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
    sessionStorage.setItem('isAuthenticated', 'true');
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
    return <AuthGate onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white relative font-sans">
      {/* Navbar / Controls */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-xl tracking-widest font-light opacity-80 pl-4">L.K ARTS</h1>
        </div>

        <div className="flex gap-4 pointer-events-auto bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
          <button
            onClick={() => setView('book')}
            className={`p-3 rounded-full transition-all ${view === 'book' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
          >
            <FaBookOpen size={20} />
          </button>
          <button
            onClick={() => setView('gallery')}
            className={`p-3 rounded-full transition-all ${view === 'gallery' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white'}`}
          >
            <FaThLarge size={20} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {view === 'book' ? (
            <motion.div
              key="book"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <Book images={images} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full overflow-y-auto pt-20"
            >
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : (
                <Gallery images={images} onDelete={handleDelete} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button for Upload */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsUploadOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-white text-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
      >
        <FaPlus size={24} />
      </motion.button>

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default App;
