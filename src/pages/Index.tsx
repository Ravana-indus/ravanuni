import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import ContentSection from '@/components/ui/ContentSection';
import FeaturedContent from '@/components/ui/FeaturedContent';
import KeyStatsGrid from '@/components/ui/KeyStatsGrid';
import { Calendar, GraduationCap, Globe, BookOpen, Users, MoveRight, MapPin, Building, Award } from 'lucide-react';

const Index = () => {
  const programImages = [
    'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=600&auto=format&fit=crop',
  ];

  const eventImages = [
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((elem) => {
      observer.observe(elem);
    });

    return () => {
      document.querySelectorAll('.scroll-animate').forEach((elem) => {
        observer.unobserve(elem);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        
        <ContentSection 
          id="about" 
          title="About Our Institution" 
          subtitle="Founded on principles of cultural exchange and education, we're dedicated to fostering connections between communities worldwide."
          titleAlignment="left"
          background="white"
          imageUrl="https://images.unsplash.com/photo-1574320379713-9744c0868a20?q=80&w=800&auto=format&fit=crop"
          imageAlt="Cultural exchange program"
          imageCaption="Our institution promotes cultural dialogue through various programs and exchanges."
          imageCopyright="© Cultural Exchange Program"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="scroll-animate opacity-0">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                Our institution promotes cultural dialogue through language learning, 
                artistic expression, and intellectual exchange. We seek to build bridges between cultures,
                fostering mutual understanding in an increasingly interconnected world.
              </p>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                We envision a future where cultural differences are celebrated as a source of strength and innovation.
                By facilitating meaningful exchanges, we contribute to a more open, inclusive global community.
              </p>
              <a href="#" className="button-institutional inline-flex">
                Learn More About Us <MoveRight size={18} className="ml-2" />
              </a>
            </div>
            
            <div className="relative scroll-animate opacity-0">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-elegant">
                <img 
                  src="https://images.unsplash.com/photo-1574320379713-9744c0868a20?q=80&w=800&auto=format&fit=crop" 
                  alt="Our institution" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-institutional-100 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-institutional-200 rounded-full -z-10"></div>
            </div>
          </div>
        </ContentSection>
        
        <ContentSection 
          id="key-facts" 
          title="Our Global Impact" 
          subtitle="For diversity, understanding and trust"
          titleSize="large"
          titleAlignment="left"
          imageUrl="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=800&auto=format&fit=crop"
          imageAlt="Global impact visualization"
          imageCaption="Our institution's global presence helps facilitate cultural exchange around the world."
        >
          <KeyStatsGrid 
            columns={2}
            stats={[
              {
                icon: <Globe />,
                value: 151,
                description: "branches of our institution are active in 98 countries around the world.",
                color: "lime"
              },
              {
                icon: <MapPin />,
                value: 12,
                description: "of our institutes are located in major cultural centers.",
                color: "lime"
              },
              {
                icon: <Building />,
                value: 1952,
                description: "the first cultural center opened in Athens.",
                color: "lime"
              },
              {
                icon: <Users />,
                value: "4,396",
                description: "employees are at work worldwide.",
                color: "lime"
              }
            ]}
          />
        </ContentSection>
        
        <ContentSection 
          id="programs" 
          title="Our Programs" 
          subtitle="Discover our diverse range of programs designed to promote cultural understanding and exchange."
          titleAlignment="left"
          imageUrl="https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?q=80&w=800&auto=format&fit=crop"
          imageAlt="Language learning program"
          imageCaption="Comprehensive language courses for all levels, taught by native speakers."
        >
          <FeaturedContent
            items={[
              {
                title: "Language Courses",
                description: "Comprehensive language courses for all levels, taught by native speakers using the latest teaching methodologies.",
                imageUrl: programImages[0],
                link: "#"
              },
              {
                title: "Cultural Workshops",
                description: "Immersive workshops exploring literature, art, film, and other cultural expressions across diverse traditions.",
                imageUrl: programImages[1],
                link: "#"
              },
              {
                title: "Exchange Programs",
                description: "Opportunities for students and professionals to experience cultural immersion through exchange programs.",
                imageUrl: programImages[2],
                link: "#"
              }
            ]}
          />
          
          <div className="mt-12 text-center">
            <a href="#" className="button-institutional inline-flex">
              View All Programs <MoveRight size={18} className="ml-2" />
            </a>
          </div>
        </ContentSection>
        
        <ContentSection 
          id="events" 
          title="Upcoming Events" 
          subtitle="Join us for a variety of cultural and educational events happening throughout the year."
          titleAlignment="left"
          background="accent"
          imageUrl="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop"
          imageAlt="Cultural event"
          imageCaption="Our annual cultural festival brings together diverse traditions through music, dance, food, and art."
        >
          <FeaturedContent
            items={[
              {
                title: "Annual Cultural Festival",
                description: "Celebrate diverse cultural traditions through music, dance, food, and art at our annual festival.",
                imageUrl: eventImages[0],
                link: "#"
              },
              {
                title: "Literary Evening",
                description: "An evening dedicated to contemporary literature with readings, discussions, and meet-the-author sessions.",
                imageUrl: eventImages[1],
                link: "#"
              },
              {
                title: "Education Conference",
                description: "A conference bringing together educators, researchers, and students to discuss the future of education.",
                imageUrl: eventImages[2],
                link: "#"
              }
            ]}
          />
          
          <div className="mt-12 text-center">
            <a href="#" className="button-institutional inline-flex">
              View All Events <Calendar size={18} className="ml-2" />
            </a>
          </div>
        </ContentSection>
        
        <ContentSection 
          id="resources" 
          title="Resources"
          subtitle="Access our curated collection of resources to support your cultural and educational journey."
          titleAlignment="left"
          imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
          imageAlt="Educational resources"
          imageCaption="Our extensive collection of books, journals, and digital resources support cultural learning."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen size={40} />, title: "Library", description: "Access our extensive collection of books, journals, and digital resources." },
              { icon: <Globe size={40} />, title: "Online Learning", description: "Explore our digital learning platforms and resources available remotely." },
              { icon: <GraduationCap size={40} />, title: "Certification", description: "Information about our internationally recognized certification programs." },
              { icon: <Award size={40} />, title: "Community", description: "Connect with a global community of learners, educators, and cultural enthusiasts." }
            ].map((item, index) => (
              <div 
                key={index}
                className="glass-card p-8 flex flex-col items-center text-center scroll-animate opacity-0"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-institutional mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </ContentSection>
        
        <ContentSection 
          id="contact" 
          title="Contact Us" 
          subtitle="Get in touch with our team to learn more about our programs and initiatives."
          titleAlignment="left"
          background="light"
          imageUrl="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=800&auto=format&fit=crop"
          imageAlt="Our institution building"
          imageCaption="Visit our cultural center to experience our programs and facilities firsthand."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-8 scroll-animate opacity-0">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institutional focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institutional focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institutional focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institutional focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institutional focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="button-institutional w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            <div className="scroll-animate opacity-0">
              <div className="glass-card p-8 mb-8">
                <h3 className="text-2xl font-semibold mb-6">Visit Our Center</h3>
                <p className="text-gray-600 mb-6">
                  We invite you to visit our cultural center to experience our programs and facilities firsthand.
                </p>
                <div className="rounded-lg overflow-hidden h-64 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=800&auto=format&fit=crop" 
                    alt="Our institution building" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600">
                  <strong>Address:</strong> 123 Institution Street, City, 10001, Country<br />
                  <strong>Opening Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM
                </p>
              </div>
              
              <div className="text-center">
                <a href="#" className="button-institutional-outline inline-flex">
                  View on Map <MoveRight size={18} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </ContentSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
