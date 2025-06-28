import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se integraría con Firebase o el backend
    console.log('Form submitted:', formData);
    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['+57 310 6035384'],
      action: 'tel:+573106035384'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['radiosantana.nm@gmail.com'],
      action: 'mailto:radiosantana.nm@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      details: ['Colombia'],
      action: '#'
    },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      name: 'Facebook', 
      url: 'https://www.facebook.com/profile.php?id=61577153733772', 
      color: 'hover:text-blue-400',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: Instagram, 
      name: 'Instagram', 
      url: '#', 
      color: 'hover:text-pink-400',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: MessageCircle, 
      name: 'WhatsApp', 
      url: 'https://wa.me/573106035384', 
      color: 'hover:text-green-400',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-silver-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-gold-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Phone className="w-8 h-8 text-gold-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Contáctanos
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-silver-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o propuesta? Estamos aquí para escucharte. 
            Contáctanos y hagamos algo increíble juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Información de
              <span className="block text-gold-400">Contacto</span>
            </h3>

            {/* Contact Items */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <item.icon className="w-6 h-6 text-dark-900" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      {item.details.map((detail, dIndex) => (
                        <p key={dIndex} className="text-silver-400 text-sm mb-1">
                          {item.action.startsWith('#') ? (
                            detail
                          ) : (
                            <a 
                              href={item.action} 
                              className="hover:text-gold-400 transition-colors"
                            >
                              {detail}
                            </a>
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-dark-800/30 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Síguenos en Redes Sociales</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target={social.target || '_self'}
                    rel={social.rel || ''}
                    className={`w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center text-silver-400 ${social.color} transition-all duration-300 hover:scale-110`}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Envíanos un Mensaje
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-silver-400 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-silver-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-silver-400 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                  placeholder="¿De qué quieres hablarnos?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-silver-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-gold text-dark-900 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-glow"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;