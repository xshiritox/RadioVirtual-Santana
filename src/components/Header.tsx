import React, { useState } from 'react';
import { Radio, Menu, X, Users, Calendar, Phone, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Inicio', href: '#home', icon: Radio },
    { label: 'Programas', href: '#programs', icon: Calendar },
    { label: 'Nosotros', href: '#about', icon: Users },
    { label: 'Contacto', href: '#contact', icon: Phone },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-gold-400/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Radio className="w-8 h-8 text-gold-400 animate-pulse-gold" />
              <div className="absolute inset-0 bg-gold-400/20 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              Radio Santana
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 text-silver-400 hover:text-gold-400 transition-colors duration-300 group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onAdminClick}
                  className="flex items-center space-x-2 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full hover:scale-105 transition-transform font-medium"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={logout}
                  className="text-silver-400 hover:text-gold-400 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={onAdminClick}
                className="text-silver-400 hover:text-gold-400 transition-colors duration-300"
              >
                Admin
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gold-400 hover:text-gold-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gold-400/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-3 text-silver-400 hover:text-gold-400 transition-colors duration-300 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gold-400/20">
                  <button
                    onClick={() => {
                      onAdminClick();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Panel Admin</span>
                  </button>
                  <button
                    onClick={logout}
                    className="text-left text-silver-400 hover:text-gold-400 transition-colors py-2"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAdminClick();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-silver-400 hover:text-gold-400 transition-colors py-2"
                >
                  Acceso Admin
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;