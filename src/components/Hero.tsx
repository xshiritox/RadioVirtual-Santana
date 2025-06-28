import React from 'react';
import { Play, Headphones, Clock, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Oyentes' },
    { icon: Clock, value: '24/7', label: 'En Vivo' },
    { icon: Headphones, value: '100%', label: 'Digital' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(192,192,192,0.05),transparent_50%)]"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-gold-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-silver-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-gold-400/50 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-silver-400/50 rounded-full animate-ping"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Logo & Title */}
          <div className="mb-8 animate-float">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-gradient-gold rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-gold rounded-full flex items-center justify-center">
                <Play className="w-12 h-12 text-dark-900 ml-1" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Radio Santana
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-silver-400 mb-2 font-light">
              Tu Radio Virtual
            </p>
            
            <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-silver-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Disfruta de la mejor música, programas en vivo y entretenimiento las 24 horas del día. 
            Una experiencia sonora única que conecta con tu estilo de vida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-gold text-dark-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 flex items-center space-x-3 animate-glow">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Escuchar Ahora</span>
            </button>
            
            <button className="border-2 border-gold-400 text-gold-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-400 hover:text-dark-900 transition-all duration-300 flex items-center space-x-3">
              <Headphones className="w-5 h-5" />
              <span>Programación</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 hover:border-gold-400/40 transition-all duration-300 group"
              >
                <stat.icon className="w-8 h-8 text-gold-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-silver-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;