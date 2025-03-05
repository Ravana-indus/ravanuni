import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentSection from '@/components/ui/ContentSection';
import { Shield, File, Check, AlertTriangle } from 'lucide-react';

const PrivacyPolicyTerms = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

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
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    // Observe all elements with the scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach((elem) => {
      observer.observe(elem);
    });

    // Cleanup function
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
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 scroll-animate">Privacy Policy & Terms</h1>
              <p className="text-xl mb-8 scroll-animate" style={{ transitionDelay: '100ms' }}>
                Information about how we handle your data and the terms governing course participation
              </p>
              <p className="text-lg mb-8 scroll-animate" style={{ transitionDelay: '200ms' }}>
                Last Updated: June 1, 2025
              </p>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <button
                className={`py-4 px-6 font-medium text-lg ${
                  activeTab === 'privacy'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                Privacy Policy
              </button>
              
              <button
                className={`py-4 px-6 font-medium text-lg ${
                  activeTab === 'terms'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('terms')}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
        
        {/* Privacy Policy Content */}
        {activeTab === 'privacy' && (
          <>
            <ContentSection 
              id="privacy-intro" 
              title="Privacy Policy" 
              subtitle="How we collect, use, and protect your information"
              titleAlignment="left"
              background="white"
              imageUrl="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=800&auto=format&fit=crop"
              imageAlt="Data privacy"
              imageCaption="We take the privacy and security of your personal information seriously."
            >
              <div className="max-w-4xl scroll-animate">
                <div className="flex items-start mb-8">
                  <Shield className="text-blue-600 w-8 h-8 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Introduction</h3>
                    <p className="text-gray-600 mb-4">
                      Your privacy matters to us. This policy explains how we collect, use, and protect your personal 
                      information when you use our website or participate in our courses.
                    </p>
                    <p className="text-gray-600">
                      At Ravana Institute of Future, we are committed to protecting your personal data and being transparent 
                      about how we collect and use it. We follow all applicable data protection laws and regulations.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Information We Collect</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>Registration Information:</strong> Name, age, contact details provided during course registration</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>Course Participation:</strong> Attendance, progress, and completion records</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>Website Usage:</strong> How you interact with our website and resources</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span><strong>Payment Records:</strong> Transaction information (but not full payment details)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">How We Use Your Information</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>To provide and administer our courses</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>To communicate important course information</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>To improve our teaching methods and materials</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>To respond to your queries and requests</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>To comply with legal requirements</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Information Sharing</h3>
                    <p className="text-gray-600 mb-4 font-bold">We never sell your information to third parties</p>
                    <p className="text-gray-600 mb-4">We only share information when:</p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Working with service providers who help run our courses</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Partnering with certification organizations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Required by law or legal process</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Data Security</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>We use current security measures to protect your information</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>We restrict access to personal data</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>We have procedures for handling potential data breaches</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
                    <p className="text-gray-600 mb-4">You have the right to:</p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Access and review your personal information</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Correct any inaccurate information</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Request deletion of your data</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Object to certain data processing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Request data portability</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Withdraw consent at any time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Contact for Privacy Questions</h3>
                    <p className="text-gray-600 mb-4">
                      If you have any questions about our privacy practices or wish to exercise your rights, please contact us:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li><strong>Email:</strong> privacy@ravanainstitute.lk</li>
                      <li><strong>Phone:</strong> +94 11 234 5678</li>
                      <li><strong>Address:</strong> 123 Colombo Road, Colombo 04, Sri Lanka</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ContentSection>
          </>
        )}
        
        {/* Terms of Service Content */}
        {activeTab === 'terms' && (
          <>
            <ContentSection 
              id="terms-intro" 
              title="Terms of Service" 
              subtitle="The agreement between participants and Ravana Institute of Future"
              titleAlignment="left"
              background="white"
              imageUrl="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
              imageAlt="Terms of service"
              imageCaption="Our terms outline your rights and responsibilities as a participant in our courses."
            >
              <div className="max-w-4xl scroll-animate">
                <div className="flex items-start mb-8">
                  <File className="text-blue-600 w-8 h-8 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Introduction</h3>
                    <p className="text-gray-600 mb-4">
                      These terms outline the agreement between participants and Ravana Institute of Future. 
                      By registering for our courses, you accept these terms.
                    </p>
                    <p className="text-gray-600">
                      Please read these terms carefully as they contain important information about your rights
                      and obligations. If you have any questions, please contact us before registering.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Registration & Eligibility</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Registration is confirmed only after payment is received</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>All registration information must be accurate and complete</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Minimum age requirement of 45+ (exceptions may be considered)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Registration cannot be transferred without prior approval</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Payment Terms</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Full payment or approved deposit required to secure enrollment</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>All fees must be paid before course completion</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Additional costs may apply for special accommodations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Payment processing as detailed during registration</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Cancellation & Refunds</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Full refund provided if cancellation is 7+ days before course start</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>50% refund for cancellations 3-7 days before start</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>No refunds for cancellations less than 3 days before start</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Course date changes subject to availability</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Attendance & Participation</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Participants should attend all scheduled sessions</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>We cannot guarantee makeup sessions for missed classes</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Disruptive behavior may result in removal without refund</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Certificates require at least 80% attendance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Course Materials</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>All course materials are protected by copyright</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Materials are provided for personal use only</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Session recording is not permitted without express permission</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>You retain rights to any work you create during the course</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Liability Limitations</h3>
                    <p className="text-gray-600 mb-4">Ravana Institute is not responsible for:</p>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Personal items brought to in-person sessions</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Technical issues with participant's own equipment</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Application of course information in personal situations</span>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Indirect damages related to course participation</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Terms Updates</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <Info className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>We may update these terms with notice to participants</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span>Continued participation indicates acceptance of revised terms</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="glass-card p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Contact for Terms Questions</h3>
                    <p className="text-gray-600 mb-4">
                      If you have any questions about these terms, please contact us:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li><strong>Email:</strong> admin@ravanainstitute.lk</li>
                      <li><strong>Phone:</strong> +94 11 234 5678</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ContentSection>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicyTerms;

function Info(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
} 