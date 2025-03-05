
import React, { useEffect, useRef } from 'react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = 1 - (scrollY / 500);
      const transform = `translateY(${scrollY * 0.4}px)`;
      
      if (heroRef.current) {
        heroRef.current.style.opacity = Math.max(opacity, 0).toString();
        heroRef.current.style.transform = transform;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section className="relative flex flex-col">
      {/* Order 2: Text container */}
      <div className="container mx-auto px-0 mb-10 order-2 z-10 -mt-24 sm:-mt-32 md:-mt-40">
        <div className="row">
          <div className="col-12 md:w-10/12 lg:w-9/12">
            <div className="px-4 py-3 md:px-7 md:pt-6 md:pb-4 bg-white shadow-md">
              <div className="bg-institutional py-2 px-3 inline-block mb-3">
                <h1 id="pagetitle" className="text-sm md:text-lg text-white uppercase font-bold">
                  Sprache. Kultur. Deutschland.
                </h1>
              </div>
              <h2 className="text-2xl md:text-3xl text-gray-900 font-medium leading-tight">
                Communicating with the world.<br />
                For diversity, understanding and trust.
              </h2>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order 1: Image container */}
      <div className="order-1 w-full overflow-hidden">
        <div className="w-full">
          <figure className="relative">
            {/* Image with gradient overlay */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573167420580-8d6bf2f2e9fa?q=80&w=2000&auto=format&fit=crop"
                alt="Performance art showing a woman with a reflective surface" 
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute bottom-2 right-2 text-white text-xs z-20">
                © Artist Name / Photographer
              </div>
            </div>
            
            {/* Caption */}
            <figcaption className="px-4 pb-4 text-sm text-white absolute bottom-0 left-0 right-0 z-20">
              <span className="block md:hidden">
                As part of the "Halaqat" project, this performance explores cultural exchanges and artistic expression through movement.
              </span>
              <span className="hidden md:block">
                As part of the "Halaqat" project, this performance explores cultural exchanges and artistic expression through movement.
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
