import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/translation';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-1">
            <div className="text-institutional font-semibold text-2xl tracking-tight mb-6">Ravana Institute of Future</div>
            <p className="text-gray-600 mb-6 max-w-xs">
              Empowering Sri Lankans with practical technology skills for the digital age.
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
            <h3 className="font-semibold text-lg">{t('Quick Links')}</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-institutional transition-colors">Home</Link></li>
              <li><Link to="/digital-safety-course" className="text-gray-600 hover:text-institutional transition-colors">{t('Digital Safety Course')}</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-institutional transition-colors">{t('About')}</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-institutional transition-colors">{t('Resources')}</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-institutional transition-colors">{t('Contact')}</Link></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">{t('Services')}</h3>
            <ul className="space-y-3">
              <li><Link to="/digital-safety-course" className="text-gray-600 hover:text-institutional transition-colors">Digital Safety & AI Awareness</Link></li>
              <li><Link to="/digital-safety-course" className="text-gray-600 hover:text-institutional transition-colors">In-Person Classes</Link></li>
              <li><Link to="/digital-safety-course" className="text-gray-600 hover:text-institutional transition-colors">Online Learning</Link></li>
              <li><Link to="/registration" className="text-gray-600 hover:text-institutional transition-colors">{t('Register')}</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-institutional transition-colors">Free Resources</Link></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">{t('Contact Us')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-institutional mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Colombo Road, Colombo 04, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-institutional mr-3 flex-shrink-0" />
                <a href="tel:+94112345678" className="text-gray-600 hover:text-institutional transition-colors">+94 11 234 5678</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-institutional mr-3 flex-shrink-0" />
                <a href="mailto:info@ravanainstitute.lk" className="text-gray-600 hover:text-institutional transition-colors">info@ravanainstitute.lk</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Ravana Institute of Future. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-institutional text-sm transition-colors">{t('Privacy Policy')}</Link>
            <Link to="/privacy-policy" className="text-gray-500 hover:text-institutional text-sm transition-colors">{t('Terms of Service')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
