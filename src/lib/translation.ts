import { useLanguage } from "@/components/layout/Navbar";

type TranslationKey = string;

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// This is a simplified example. In a real application, you would likely have 
// separate JSON files for each language and import them.
const translations: Translations = {
  // Navigation
  "Digital Safety Course": {
    en: "Digital Safety Course",
    si: "ඩිජිටල් ආරක්ෂණ පාඨමාලාව",
    ta: "டிஜிட்டல் பாதுகாப்பு பாடநெறி"
  },
  "About": {
    en: "About",
    si: "අපි ගැන",
    ta: "எங்களைப் பற்றி"
  },
  "Resources": {
    en: "Resources",
    si: "සම්පත්",
    ta: "வளங்கள்"
  },
  "Contact": {
    en: "Contact",
    si: "සම්බන්ධ වන්න",
    ta: "தொடர்பு"
  },
  "Register": {
    en: "Register",
    si: "ලියාපදිංචි වන්න",
    ta: "பதிவு செய்யுங்கள்"
  },
  "Search": {
    en: "Search",
    si: "සොයන්න",
    ta: "தேடல்"
  },
  "Search the website...": {
    en: "Search the website...",
    si: "වෙබ් අඩවිය සොයන්න...",
    ta: "வலைத்தளத்தில் தேடுங்கள்..."
  },

  // Homepage
  "Take Control of Your Digital Life": {
    en: "Take Control of Your Digital Life",
    si: "ඔබේ ඩිජිටල් ජීවිතය පාලනය කරගන්න",
    ta: "உங்கள் டிஜிட்டல் வாழ்க்கையைக் கட்டுப்படுத்துங்கள்"
  },
  "Digital Safety & AI Skills for Adults 45+": {
    en: "Digital Safety & AI Skills for Adults 45+",
    si: "වැඩිහිටියන් සඳහා ඩිජිටල් ආරක්ෂාව සහ AI කුසලතා",
    ta: "45+ வயதுடையவர்களுக்கான டிஜிட்டல் பாதுகாப்பு & AI திறன்கள்"
  },
  "Practical, jargon-free education that helps you protect yourself online, recognize scams, and use technology with confidence.": {
    en: "Practical, jargon-free education that helps you protect yourself online, recognize scams, and use technology with confidence.",
    si: "ප්‍රායෝගික, වෘත්තීය-වචන නොමැති අධ්‍යාපනය මගින් ඔබට මාර්ගගතව ආරක්ෂා වීමට, වංචා හඳුනා ගැනීමට සහ විශ්වාසයෙන් තාක්ෂණය භාවිතා කිරීමට උපකාර වේ.",
    ta: "நடைமுறை, தொழில்நுட்ப சொற்களற்ற கல்வி, ஆன்லைனில் உங்களைப் பாதுகாக்க, மோசடிகளை அடையாளம் காண மற்றும் நம்பிக்கையுடன் தொழில்நுட்பத்தைப் பயன்படுத்த உதவுகிறது."
  },
  "View Course Details": {
    en: "View Course Details",
    si: "පාඨමාලා විස්තර බලන්න",
    ta: "பாடநெறி விவரங்களைக் காண்க"
  },
  "Register Now": {
    en: "Register Now",
    si: "දැන් ලියාපදිංචි වන්න",
    ta: "இப்போதே பதிவு செய்யுங்கள்"
  },

  // Common components
  "Our Global Impact": {
    en: "Our Global Impact",
    si: "අපගේ ගෝලීය බලපෑම",
    ta: "எங்களின் உலகளாவிய தாக்கம்"
  },
  "For diversity, understanding and trust": {
    en: "For diversity, understanding and trust",
    si: "විවිධත්වය, අවබෝධය සහ විශ්වාසය සඳහා",
    ta: "பன்முகத்தன்மை, புரிதல் மற்றும் நம்பிக்கைக்காக"
  },
  "Our institution's global presence helps facilitate cultural exchange around the world.": {
    en: "Our institution's global presence helps facilitate cultural exchange around the world.",
    si: "අපගේ ආයතනයේ ගෝලීය තත්වය ලොව පුරා සංස්කෘතික හුවමාරුව පහසු කරයි.",
    ta: "எங்கள் நிறுவனத்தின் உலகளாவிய இருப்பு உலகம் முழுவதும் கலாச்சார பரிமாற்றத்தை எளிதாக்க உதவுகிறது."
  },

  // Footer
  "Quick Links": {
    en: "Quick Links",
    si: "ඉක්මන් සබැඳි",
    ta: "விரைவு இணைப்புகள்"
  },
  "Services": {
    en: "Services",
    si: "සේවාවන්",
    ta: "சேவைகள்"
  },
  "Contact Us": {
    en: "Contact Us",
    si: "අප අමතන්න",
    ta: "எங்களை தொடர்பு கொள்ளுங்கள்"
  },
  "Privacy Policy": {
    en: "Privacy Policy",
    si: "රහස්යතා ප්රතිපත්තිය",
    ta: "தனியுரிமைக் கொள்கை"
  },
  "Terms of Service": {
    en: "Terms of Service",
    si: "සේවා කොන්දේසි",
    ta: "சேவை விதிமுறைகள்"
  },
  "Home": {
    en: "Home",
    si: "මුල් පිටුව",
    ta: "முகப்பு"
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: TranslationKey): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translations[key][language] || translations[key]['en'] || key;
  };
  
  return { t, language };
}; 