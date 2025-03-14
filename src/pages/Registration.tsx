import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentSection from '@/components/ui/ContentSection';
import { CalendarDays, Users, Check, CreditCard, Building, Circle, HelpCircle, Info, Clock, Phone, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CountrySelector from '@/components/CountrySelector';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { getPricingByCountry, formatPrice, PricingOption } from '@/utils/countryPricing';

const Registration = () => {
  const [courseType, setCourseType] = useState<string>('');
  const [withCompanion, setWithCompanion] = useState<boolean>(false);
  
  // Add country detection
  const { country: detectedCountry, loading: locationLoading, error: locationError } = useGeoLocation();
  const [selectedCountry, setSelectedCountry] = useState<string>('default');
  const [pricingInfo, setPricingInfo] = useState<PricingOption>(getPricingByCountry('default'));

  // Set country from geolocation when available
  useEffect(() => {
    if (detectedCountry) {
      setSelectedCountry(detectedCountry);
      setPricingInfo(getPricingByCountry(detectedCountry));
    }
  }, [detectedCountry]);

  // Update pricing when country changes
  useEffect(() => {
    setPricingInfo(getPricingByCountry(selectedCountry));
    
    // If the selected country doesn't support in-person courses,
    // force online course type
    const pricing = getPricingByCountry(selectedCountry);
    if (!pricing.hasInPerson && courseType === 'in-person') {
      setCourseType('online');
    }
  }, [selectedCountry]);

  // Original animation code
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

  // Handler for country change
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      
      <main className="pt-9">
        {/* Hero Banner */}
        <div className="bg-institutional-dark text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 scroll-animate">Register for Our Digital Safety Course</h1>
              <p className="text-xl mb-8 scroll-animate" style={{ transitionDelay: '100ms' }}>
                Learning that fits your schedule and preferences
              </p>
              <p className="text-lg mb-8 scroll-animate" style={{ transitionDelay: '200ms' }}>
                Select your preferred course format, language, and dates below. 
                Our team will confirm your registration within 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        {/* Course Options Section */}
        <ContentSection 
          id="course-options" 
          title="Available Course Sessions" 
          subtitle="Choose the format that works best for you"
          titleAlignment="center"
          background="white"
        >
          {/* Add Location & Currency option as a small tab */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
              <div className="mb-3 md:mb-0">
                <h3 className="text-sm font-medium text-blue-800">Your Location & Currency</h3>
                <p className="text-xs text-blue-600">
                  {locationLoading ? 
                    'Detecting your location...' : 
                    locationError ? 
                    'Please select your country' : 
                    `Prices shown in ${pricingInfo.currencySymbol} based on your location`}
                </p>
              </div>
              <CountrySelector 
                selectedCountry={selectedCountry} 
                onChange={handleCountryChange}
                compact={true}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingInfo.hasInPerson && (
              <div 
                className={`glass-card p-8 rounded-lg shadow-elegant scroll-animate relative overflow-hidden ${courseType === 'in-person' ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setCourseType('in-person')}
              >
                {courseType === 'in-person' && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="text-white w-4 h-4" />
                  </div>
                )}
                
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold">In-Person Format</h3>
                </div>
                
                <p className="text-blue-600 font-medium mb-6">Within 5km from your home</p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CalendarDays className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Schedule</p>
                      <p className="text-gray-600">Saturdays/Sundays, 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600 text-sm">(3 sessions, 12 hours total)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Group Size</p>
                      <p className="text-gray-600">Maximum 15 participants</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CreditCard className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Price</p>
                      <p className="text-gray-600">
                        {formatPrice(pricingInfo.inPersonDiscountedPrice || '', pricingInfo.currencySymbol)} <span className="line-through">{formatPrice(pricingInfo.inPersonNormalPrice || '', pricingInfo.currencySymbol)}</span> per participant
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="space-y-2">
                  <p className="font-medium">Upcoming Sessions:</p>
                  <div className="border border-gray-200 rounded-md p-3">
                    <p>July 6, 13, 20, 2025</p>
                    <p className="text-blue-600 font-medium">12 spots remaining</p>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <p>August 3, 10, 17, 2025</p>
                    <p className="text-blue-600 font-medium">15 spots remaining</p>
                  </div>
                </div>
              </div>
            )}
            
            <div 
              className={`glass-card p-8 rounded-lg shadow-elegant scroll-animate relative overflow-hidden ${courseType === 'online' ? 'ring-2 ring-indigo-500' : ''} ${!pricingInfo.hasInPerson ? 'md:col-span-2 mx-auto max-w-xl' : ''}`}
              style={{ transitionDelay: '200ms' }}
              onClick={() => setCourseType('online')}
            >
              {courseType === 'online' && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Check className="text-white w-4 h-4" />
                </div>
              )}
              
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Laptop className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold">Online Format</h3>
              </div>
              
              <p className="text-indigo-600 font-medium mb-6">Live Video Conferencing</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CalendarDays className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Schedule</p>
                    <p className="text-gray-600">Weekdays, 6:00 PM - 8:00 PM</p>
                    <p className="text-gray-600 text-sm">(5 sessions, 10 hours total)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Group Size</p>
                    <p className="text-gray-600">Maximum 20 participants</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCard className="text-indigo-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-gray-600">
                      {formatPrice(pricingInfo.discountedPrice, pricingInfo.currencySymbol)} <span className="line-through">{formatPrice(pricingInfo.normalPrice, pricingInfo.currencySymbol)}</span> per participant
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="space-y-2">
                <p className="font-medium">Upcoming Sessions:</p>
                <div className="border border-gray-200 rounded-md p-3">
                  <p>July 1-5, 2025</p>
                  <p className="text-indigo-600 font-medium">15 spots remaining</p>
                </div>
                <div className="border border-gray-200 rounded-md p-3">
                  <p>July 15-19, 2025</p>
                  <p className="text-indigo-600 font-medium">18 spots remaining</p>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>
        
        {/* Registration Form Section */}
        <ContentSection 
          id="registration-form" 
          title="Your Information" 
          subtitle="Please complete all fields to register for the course"
          titleAlignment="left"
          imageAlt="Registration form"
          imageCaption="Complete your registration to secure your spot in our upcoming course."
        >
          <div className="max-w-3xl">
            <div className="glass-card p-8 rounded-lg shadow-elegant scroll-animate">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    type="text" 
                    placeholder="Your full name"
                    className="w-full"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <Input 
                      type="number" 
                      placeholder="Your age"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      required
                    >
                      <option value="">Select a language</option>
                      <option value="english">English</option>
                      <option value="sinhala">Sinhala</option>
                      <option value="tamil">Tamil</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      type="tel" 
                      placeholder="+94 7X XXX XXXX"
                      className="w-full"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pricingInfo.hasInPerson && (
                      <label className="flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50">
                        <input 
                          type="radio" 
                          name="courseType" 
                          value="in-person" 
                          className="mr-3" 
                          checked={courseType === 'in-person'}
                          onChange={() => setCourseType('in-person')}
                          required
                        />
                        <span>In-Person Course</span>
                      </label>
                    )}
                    
                    <label className={`flex items-center p-4 border rounded-md cursor-pointer hover:bg-gray-50 ${!pricingInfo.hasInPerson ? 'md:col-span-2' : ''}`}>
                      <input 
                        type="radio" 
                        name="courseType" 
                        value="online" 
                        className="mr-3" 
                        checked={courseType === 'online'}
                        onChange={() => setCourseType('online')}
                        required
                      />
                      <span>Online Course</span>
                    </label>
                  </div>
                </div>
                
                {courseType === 'online' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select 
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      required
                    >
                      <option value="">Select a time zone</option>
                      <option value="sri-lanka">Sri Lanka</option>
                      <option value="europe">Europe</option>
                      <option value="north-america">North America</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Dates</label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="">Select session dates</option>
                    {courseType === 'in-person' ? (
                      <>
                        <option value="july-in-person">July 6, 13, 20, 2025</option>
                        <option value="august-in-person">August 3, 10, 17, 2025</option>
                      </>
                    ) : courseType === 'online' ? (
                      <>
                        <option value="july-online-sl">July 1-5, 2025</option>
                        <option value="july-online-eu">July 15-19, 2025</option>
                      </>
                    ) : (
                      <option value="select-course-type">Please select a course type first</option>
                    )}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
                  <select 
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  >
                    <option value="">Please select</option>
                    <option value="friend">Friend/Family</option>
                    <option value="social">Social Media</option>
                    <option value="newspaper">Newspaper</option>
                    <option value="radio">Radio</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Needs</label>
                  <textarea 
                    placeholder="Please let us know if you have any accessibility requirements or other special needs"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
                    rows={3}
                  ></textarea>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <label className="flex items-start">
                    <input 
                      type="checkbox" 
                      className="mt-1 mr-3" 
                      checked={withCompanion} 
                      onChange={() => setWithCompanion(!withCompanion)}
                    />
                    <div>
                      <p className="font-medium">I'm registering with a family member (10% discount)</p>
                      <p className="text-gray-600 text-sm">Many participants find it helpful to attend with a spouse, child, or friend.</p>
                    </div>
                  </label>
                  
                  {withCompanion && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Companion Name</label>
                      <Input 
                        type="text" 
                        placeholder="Full name of your companion"
                        className="w-full"
                        required
                      />
                    </div>
                  )}
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" required />
                    <div>
                      <p>I agree to the <a href="/privacy-policy-terms" className="text-blue-600 hover:underline">terms and conditions</a></p>
                      <p className="text-gray-500 text-sm">By checking this box, you agree to our Privacy Policy and Terms of Service.</p>
                    </div>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 flex justify-center items-center"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          </div>
        </ContentSection>
        
        {/* Payment Information */}
        <ContentSection 
          id="payment-info" 
          title="Payment Options" 
          subtitle="Flexible payment methods to suit your needs"
          titleAlignment="left"
          background="white"
          imageAlt="Payment options"
          imageCaption="We offer multiple payment methods for your convenience."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="scroll-animate">
              <h3 className="text-2xl font-semibold mb-6">Payment Methods</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Credit/Debit Card</h4>
                    <p className="text-gray-600">Secure online payment via Visa, Mastercard, or American Express.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <Building className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Bank Transfer</h4>
                    <p className="text-gray-600">Direct bank transfer to our account (details provided after registration).</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Mobile Payment</h4>
                    <p className="text-gray-600">Pay via eZ Cash or mCash directly from your mobile account.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Business Billing</h4>
                    <p className="text-gray-600">If your company is sponsoring your participation, please indicate this in the form and we'll arrange for business billing.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-animate" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-2xl font-semibold mb-6">Payment Policies</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                    <Check className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Full Payment</h4>
                    <p className="text-gray-600">Pay the entire amount now to confirm your place in the course.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                    <SplitSquareVertical className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Split Payment</h4>
                    <p className="text-gray-600">Pay 50% deposit now to reserve your spot, and the remaining 50% on the first day of class.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Family Discount</h4>
                    <p className="text-gray-600">Receive a 10% discount when registering with a family member.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 mt-1">
                    <Clock className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Cancellation Policy</h4>
                    <p className="text-gray-600">Full refund if cancellation is 7+ days before course start. 50% refund for cancellations 3-7 days before start. No refunds for cancellations less than 3 days before start.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentSection>
        
        {/* What Happens Next */}
        <ContentSection 
          id="next-steps" 
          title="What Happens Next" 
          subtitle="Your journey with Ravana Institute of Future"
          titleAlignment="center"
          background="white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Submit Registration",
                  description: "Complete the form above with your details and course preferences"
                },
                {
                  step: 2,
                  title: "Receive Confirmation",
                  description: "Get a confirmation email within 24 hours with payment instructions"
                },
                {
                  step: 3,
                  title: "Preparation Materials",
                  description: "Receive preparation materials 3 days before your first class"
                },
                {
                  step: 4,
                  title: "Join Your First Session",
                  description: "Start your journey to digital safety with confidence"
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="scroll-animate"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                      <span className="text-purple-700 font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    
                    {index < 3 && (
                      <div className="hidden md:block w-24 h-0.5 bg-purple-200 absolute right-[-3rem] top-6"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentSection>
        
        {/* Registration Support */}
        <ContentSection 
          id="registration-support" 
          title="Need Help Registering?" 
          subtitle="Our team is ready to assist you with the registration process"
          titleAlignment="center"
          background="white"
        >
          <div className="max-w-3xl mx-auto text-center scroll-animate">
            <p className="text-gray-600 mb-8">
              If you have questions or need assistance completing your registration, 
              our team is available to help through multiple channels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: <Phone size={24} />,
                  title: "Phone Assistance",
                  description: "+94 11 258 1181",
                },
                {
                  icon: <Mail size={24} />,
                  title: "Email Help",
                  description: "info@riftuni.com",
                },
                {
                  icon: <MessageSquare size={24} />,
                  title: "Live Chat",
                  description: "Available weekdays 9:00 AM - 5:00 PM",
                }
              ].map((support, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 rounded-lg flex flex-col items-center"
                >
                  <div className="bg-purple-100 p-3 rounded-full mb-4">
                    <div className="text-purple-600">{support.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{support.title}</h3>
                  <p className="text-gray-600">{support.description}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-500">
              You can also visit our Colombo location for in-person assistance with your registration.
            </p>
          </div>
        </ContentSection>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registration;

function Laptop(props) {
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
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}

function MessageSquare(props) {
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
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function Smartphone(props) {
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
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

function SplitSquareVertical(props) {
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
      <path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" />
      <path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" />
      <line x1="4" x2="20" y1="12" y2="12" />
    </svg>
  )
} 