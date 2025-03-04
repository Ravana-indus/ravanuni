import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ui/HeroSection';
import ContentSection from '@/components/ui/ContentSection';
import FeaturedContent from '@/components/ui/FeaturedContent';
import KeyStatsGrid from '@/components/ui/KeyStatsGrid';
import AsymmetricLayout, { AsymmetricItem } from '@/components/ui/AsymmetricLayout';
import { Calendar, GraduationCap, Globe, BookOpen, Users, MoveRight, MapPin, Award, Target, Flag } from 'lucide-react';

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
          id="key-stats" 
          layout="asymmetrical"
          background="light"
          hideHeading
          className="py-24"
        >
          <div className="container-content">
            <div className="mb-12 text-center max-w-3xl mx-auto px-4">
              <h2 className="section-heading animate-fade-up">Our Global Impact</h2>
              <p className="section-subheading animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Fostering international cultural exchange and education worldwide
              </p>
            </div>
            <KeyStatsGrid 
              stats={[
                { value: '151', label: 'Institutes Worldwide', icon: Globe, color: 'primary' },
                { value: '98', label: 'Countries', icon: MapPin, color: 'secondary' },
                { value: '246,000', label: 'Language Students', icon: GraduationCap, color: 'primary' },
                { value: '41', label: 'Cultural Programs', icon: Award, color: 'accent' },
              ]}
              style="staggered"
              className="mb-12"
            />
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-institutional-100 rounded-full opacity-40 -z-0 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-institutional-50 rounded-full opacity-50 -z-0 transform -translate-x-1/3 translate-y-1/3"></div>
        </ContentSection>
        
        <ContentSection 
          id="about" 
          title="About Our Institution" 
          subtitle="Founded on principles of cultural exchange and education, we're dedicated to fostering connections between communities worldwide."
          background="white"
          alignment="left"
        >
          <AsymmetricLayout variant="symmetrical" className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-6 md:col-start-1 z-10">
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
              </div>
              
              <div className="col-span-12 md:col-span-6 md:col-start-7 z-10">
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
            </div>
          </AsymmetricLayout>
        </ContentSection>
        
        <ContentSection 
          id="programs" 
          title="Our Programs" 
          subtitle="Discover our diverse range of programs designed to promote cultural understanding and exchange."
          layout="offset"
        >
          <div className="relative">
            <div className="absolute top-0 right-0 h-96 w-96 bg-institutional-50 rounded-full opacity-50 transform translate-x-1/4 -translate-y-1/4 -z-0"></div>
            
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
          </div>
          
          <div className="mt-12 text-center">
            <a href="#" className="button-institutional inline-flex">
              View All Programs <MoveRight size={18} className="ml-2" />
            </a>
          </div>
        </ContentSection>
        
        <ContentSection
          id="facts"
          background="accent"
          className="py-32"
          hideHeading
        >
          <div className="container-content relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-elegant z-20 text-center w-full max-w-2xl">
              <h2 className="section-heading mb-2">Cultural Exchange in Numbers</h2>
              <p className="text-gray-600">Key statistics highlighting our global impact</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
              {[
                { value: '500+', label: 'Annual Events', icon: Calendar },
                { value: '120,000', label: 'Library Resources', icon: BookOpen },
                { value: '85%', label: 'Student Satisfaction', icon: Target },
                { value: '50+', label: 'Language Courses', icon: Globe },
                { value: '35', label: 'Years of Excellence', icon: Award },
                { value: '76', label: 'Partner Institutions', icon: Flag },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="glass-card p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="text-institutional mb-4">
                    {React.createElement(stat.icon, { size: 40 })}
                  </div>
                  <div className="stats-value mb-2">{stat.value}</div>
                  <div className="stats-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>
        
        <ContentSection 
          id="events" 
          title="Upcoming Events" 
          subtitle="Join us for a variety of cultural and educational events happening throughout the year."
        >
          <div>
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
          </div>
        </ContentSection>
        
        <ContentSection 
          id="resources" 
          title="Resources"
          subtitle="Access our curated collection of resources to support your cultural and educational journey."
          background="light"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: <BookOpen size={40} />, title: "Library", description: "Access our extensive collection of books, journals, and digital resources." },
              { icon: <Globe size={40} />, title: "Online Learning", description: "Explore our digital learning platforms and resources available remotely." },
              { icon: <GraduationCap size={40} />, title: "Certification", description: "Information about our internationally recognized certification programs." },
              { icon: <Users size={40} />, title: "Community", description: "Connect with a global community of learners, educators, and cultural enthusiasts." }
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
          background="white"
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
