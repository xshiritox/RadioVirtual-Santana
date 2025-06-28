import React, { useState, useEffect } from 'react';
import { Headphones, Clock, Users } from 'lucide-react';

// Función para formatear el número de oyentes
const formatListeners = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`;
  }
  return count.toString();
};

const Hero: React.FC = () => {
  const [listeners, setListeners] = useState<number>(0);

  // Simulación de actualización de oyentes (reemplazar con llamada real a la API)
  useEffect(() => {
    // Esta es una función simulada - reemplazar con la llamada real a tu API
    const fetchListeners = async () => {
      try {
        // Ejemplo de cómo sería una llamada real (descomenta y configura según tu proveedor):
        // const response = await fetch('TU_API_DE_ESTADISTICAS');
        // const data = await response.json();
        // setListeners(data.listeners || 0);
        
        // Simulación temporal (eliminar cuando se implemente la API real)
        const simulatedListeners = Math.floor(Math.random() * 500) + 50; // Número aleatorio entre 50 y 550
        setListeners(simulatedListeners);
      } catch (error) {
        console.error('Error al obtener oyentes:', error);
      }
    };

    // Obtener oyentes al cargar
    fetchListeners();
    
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchListeners, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { 
      icon: Users, 
      value: listeners > 0 ? formatListeners(listeners) : '...', 
      label: 'Oyentes',
      description: 'En vivo ahora'
    },
    { 
      icon: Clock, 
      value: '24/7', 
      label: 'En Vivo',
      description: 'Transmisión continua'
    },
    { 
      icon: Headphones, 
      value: '100%', 
      label: 'Digital',
      description: 'Alta calidad'
    }
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
              <div className="absolute inset-2 bg-gradient-gold rounded-full flex items-center justify-center overflow-hidden animate-glow">
                <img 
                  src="/logo.WebP" 
                  alt="Radio Santana" 
                  className="w-full h-full object-cover"
                />
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
          <div className="relative inline-block group mb-12">
            <p className="text-xl md:text-2xl font-medium text-silver-300">
              <span className="relative">
                La forma <span className="text-gold-400 font-bold">+</span> fresca de escuchar radio.
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400 to-gold-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center items-center mb-16">
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


      </div>
    </section>
  );
};

export default Hero;