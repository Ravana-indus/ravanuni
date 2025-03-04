
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <div className="text-institutional font-semibold text-2xl tracking-tight mb-6">Institution</div>
            <p className="text-gray-600 mb-6 max-w-xs">
              Promoting cultural exchange and educational opportunities since 1951.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-institutional transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-institutional transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-institutional transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-institutional transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Programs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">Programs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Language Courses</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Cultural Workshops</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Exchange Programs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Certifications</a></li>
              <li><a href="#" className="text-gray-600 hover:text-institutional transition-colors">Online Learning</a></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-institutional mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Institution Street, City, 10001, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-institutional mr-3 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-institutional transition-colors">+123 456 7890</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-institutional mr-3 flex-shrink-0" />
                <a href="mailto:info@institution.org" className="text-gray-600 hover:text-institutional transition-colors">info@institution.org</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 Institution. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-institutional text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-institutional text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-institutional text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
