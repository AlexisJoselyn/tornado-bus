import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('ES');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    'Inicio',
    'Ofertas',
    'Terminales',
    'Preguntas Frecuentes',
    'Blogs',
    'Contacto',
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b-4 border-orange-600 shadow-md relative">      
      <div className="w-30 h-12 flex items-center justify-center">
        <a href="/">
          <img
            src="https://tornadobus.com/wp-content/uploads/2022/07/Recurso-3.svg"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </a>
      </div>
      
      <nav className="hidden nav-style gap-6">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-blue-900 hover:text-orange-600 transition font-medium"
          >
            {item}
          </a>
        ))}
      </nav>
      
      <div className="flex items-center gap-4">        
        <div className="flex border border-blue-900 rounded-lg overflow-hidden">
          <button
            className={`p-2 text-sm transition ${
              language === 'ES'
                ? 'bg-blue-900 text-white'
                : 'bg-white text-blue-900 hover:bg-blue-100'
            }`}
            onClick={() => setLanguage('ES')}
          >
            ES
          </button>
          <button
            className={`p-2 text-sm transition ${
              language === 'EN'
                ? 'bg-blue-900 text-white'
                : 'bg-white text-blue-900 hover:bg-blue-100'
            }`}
            onClick={() => setLanguage('EN')}
          >
            EN
          </button>
        </div>
        
        <User className="w-6 h-6 cursor-pointer text-blue-900 hover:text-orange-600 transition" />
        
        <Menu
          className="w-6 h-6 cursor-pointer text-blue-900 hover:text-orange-600 transition md:hidden hidden-menu"
          onClick={toggleMenu}
        />
      </div>
      
      {isOpen && (
        <>          
          <div
            className="fixed inset-0 bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
          
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-5 transform transition-transform translate-x-0">            
            <button className="self-end mb-4" onClick={closeMenu}>
              <X className="w-6 h-6 text-blue-900 hover:text-orange-600 transition" />
            </button>
            
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-blue-900 hover:text-orange-600 transition font-medium"
                  onClick={closeMenu}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};
