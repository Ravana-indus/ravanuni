
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Search, Globe } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out", 
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-subtle py-3" : "bg-transparent py-6"
      )}
    >
      <div className="container-content">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="/" className="flex items-center">
              <div className="text-institutional font-semibold text-2xl tracking-tight">Institution</div>
            </a>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="nav-link">About</a>
              <a href="#programs" className="nav-link">Programs</a>
              <a href="#events" className="nav-link">Events</a>
              <a href="#resources" className="nav-link">Resources</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-institutional transition-colors duration-300" aria-label="Search">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-institutional transition-colors duration-300" aria-label="Language selection">
              <Globe size={20} />
            </button>
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 text-xl">
          <a href="#about" className="nav-link py-3 inline-block" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#programs" className="nav-link py-3 inline-block" onClick={() => setIsMobileMenuOpen(false)}>Programs</a>
          <a href="#events" className="nav-link py-3 inline-block" onClick={() => setIsMobileMenuOpen(false)}>Events</a>
          <a href="#resources" className="nav-link py-3 inline-block" onClick={() => setIsMobileMenuOpen(false)}>Resources</a>
          <a href="#contact" className="nav-link py-3 inline-block" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
