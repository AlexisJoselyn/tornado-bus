import { useState } from 'react';
import { Menu, User } from 'lucide-react';

export const Header = () => {
  const [language, setLanguage] = useState('ES');

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div className="w-30 h-12 flex items-center justify-center">
        <a href="/">
          <img
            src="https://tornadobus.com/wp-content/uploads/2022/07/Recurso-3.svg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex border rounded-lg overflow-hidden">
          <button
            className={`p-2 text-sm ${language === 'ES' ? 'bg-gray-300' : 'bg-white'}`}
            onClick={() => setLanguage('ES')}
          >
            ES 
          </button>
          <button
            className={`p-2 text-sm ${language === 'EN' ? 'bg-gray-300' : 'bg-white'}`}
            onClick={() => setLanguage('EN')}
          >
            EN
          </button>
        </div>

        <User className="w-6 h-6 cursor-pointer" />
        <Menu className="w-6 h-6 cursor-pointer" />
      </div>
    </header>
  );
};
