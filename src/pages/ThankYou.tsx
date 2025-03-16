import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentSection from '@/components/ui/ContentSection';
import { Check, ArrowRight, Calendar, Mail, Phone } from 'lucide-react';

const ThankYou = () => {
  const location = useLocation();
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // Extract lead ID from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const lead = queryParams.get('lead');
    if (lead) {
      setLeadId(lead);
    }
  }, [location]);
  
  // Animation code for page elements
  useEffect(() => {
    // Add a base class to all elements that should animate
    document.querySelectorAll('.scroll-animate').forEach((elem) => {
      elem.classList.add('transition-all', 'duration-700', 'ease-in-out');
      // Ensure elements start invisible
      elem.classList.add('opacity-0', 'translate-y-8');
    });

    // Create the intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When element is visible, remove the translate and add opacity
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1 // Trigger when at least 10% of element is visible
      }
    );

    // Observe all elements with the .scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((elem) => {
      observer.observe(elem);
    });

    // Clean up observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main className="pt-9">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-500 rounded-full p-3">
                  <Check className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 scroll-animate">Registration Successful!</h1>
              <p className="text-xl mb-4 scroll-animate" style={{ transitionDelay: '100ms' }}>
                Thank you for registering for our Digital Safety Course
              </p>
              <p className="text-lg mb-8 scroll-animate" style={{ transitionDelay: '200ms' }}>
                {leadId ? `Your registration ID is: ${leadId}` : 'Your registration has been received'}
              </p>
            </div>
          </div>
        </div>
        
        {/* What's Next Section */}
        <ContentSection 
          id="whats-next" 
          title="What's Next" 
          subtitle="Here's what you can expect in the coming days"
          titleAlignment="center"
          background="white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm text-center scroll-animate">
                  <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Confirmation Email</h3>
                  <p className="text-blue-800">You'll receive a confirmation email within 24 hours with payment instructions.</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm text-center scroll-animate" style={{ transitionDelay: '100ms' }}>
                  <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Course Coordinator Call</h3>
                  <p className="text-blue-800">A course coordinator will contact you to discuss your preferences and answer any questions.</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm text-center scroll-animate" style={{ transitionDelay: '200ms' }}>
                  <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Course Materials</h3>
                  <p className="text-blue-800">You'll receive your course materials 3 days before your first session.</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-8 scroll-animate">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Important Information</h3>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Please complete your payment within 3 days to secure your spot.</li>
                  <li>If you need to change your course format or dates, please contact us as soon as possible.</li>
                  <li>Prepare a quiet space with a reliable internet connection for your online sessions.</li>
                  <li>Don't hesitate to reach out if you have any questions or concerns.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mt-12 scroll-animate">
              <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center">
                Return to Home <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium py-3 px-6 transition duration-300">
                Contact Support
              </Link>
            </div>
          </div>
        </ContentSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou; 