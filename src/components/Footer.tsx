import React from 'react';
import { Radio, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Inicio', href: '#home' },
    { label: 'Programas', href: '#programs' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Publicidad', href: '#advertising' },
    { label: 'Contacto', href: '#contact' }
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      text: '+57 310 6035384',
      href: 'tel:+573106035384',
      isLink: true
    },
    { 
      icon: Mail, 
      text: 'radiosantana.nm@gmail.com',
      href: 'mailto:radiosantana.nm@gmail.com',
      isLink: true
    },
    { 
      icon: MapPin, 
      text: 'Colombia',
      isLink: false
    }
  ];

  return (
    <footer className="bg-dark-900 border-t border-gold-400/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(255,215,0,0.03),transparent_50%)]"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Radio className="w-8 h-8 text-gold-400 animate-pulse-gold" />
                <div className="absolute inset-0 bg-gold-400/20 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                Radio Santana
              </h3>
            </div>
            <p className="text-silver-400 mb-6 leading-relaxed">
              Tu radio virtual que conecta corazones a través de la música. 
              Acompañándote las 24 horas del día con la mejor programación.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-silver-400 hover:text-gold-400 transition-colors duration-300 flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-gold-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contacto</h4>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <contact.icon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  {contact.isLink ? (
                    <a 
                      href={contact.href}
                      className="text-silver-400 text-sm hover:text-gold-400 transition-colors"
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-silver-400 text-sm">{contact.text}</span>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-lg">
              <p className="text-silver-400 text-sm mb-2">🟢 EN VIVO</p>
              <p className="text-white font-medium text-sm">Transmitiendo 24/7</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Newsletter</h4>
            <p className="text-silver-400 text-sm mb-4">
              Suscríbete para recibir las últimas noticias y programación especial.
            </p>
            
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full px-3 py-2 bg-dark-800 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-gradient-gold text-dark-900 py-2 rounded-lg font-medium text-sm hover:scale-105 transition-transform duration-300"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold-400/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-silver-400 text-sm">
              <span>© {currentYear} Radio Santana. Todos los derechos reservados.</span>
            </div>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-silver-400 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>para nuestros oyentes</span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-silver-400 text-sm">
              <a href="#" className="hover:text-gold-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-gold-400 transition-colors">Términos de Uso</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;