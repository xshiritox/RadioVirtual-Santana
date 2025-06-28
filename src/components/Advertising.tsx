import React from 'react';
import { Megaphone, TrendingUp, Target, BarChart3 } from 'lucide-react';

const Advertising: React.FC = () => {
  const adPackages = [
    {
      name: 'Básico',
      price: '$350.000',
      period: 'COP',
      features: [
        'Spots Comercial',
      ],
      highlighted: false
    },
    {
      name: 'Estándar',
      price: '$750.000',
      period: 'COP',
      features: [
        'Spots Comercial',
        'Vídeo Publicitario'
      ],
      highlighted: true
    },
    {
      name: 'Premium',
      price: '$1.500.000',
      period: 'COP',
      features: [
        'Spots Comercial',
        'Vídeo Publicitario',
        'Pauta Radial',
        'Flyer (Colombia)',
      ],
      highlighted: false
    },
    {
      name: 'VIP',
      price: '$3.000.000',
      period: 'COP',
      features: [
        'Spots Comercial',
        'Vídeo Publicitario HD',
        'Pauta Radial Premium',
        'Flyer (Colombia)',
        'Menciones Redes Sociales',
      ],
      highlighted: true
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Audiencia Segmentada',
      description: 'Llega a tu público objetivo específico con precisión.'
    },
    {
      icon: TrendingUp,
      title: 'ROI Comprobado',
      description: 'Aumenta tus ventas con nuestra audiencia comprometida.'
    },
    {
      icon: BarChart3,
      title: 'Métricas Detalladas',
      description: 'Recibe reportes completos del rendimiento de tu campaña.'
    }
  ];

  return (
    <section className="py-20 bg-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,215,0,0.05),transparent_50%)]"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Megaphone className="w-8 h-8 text-gold-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Publicidad Efectiva
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-silver-400 max-w-2xl mx-auto">
            Haz crecer tu negocio con nuestras soluciones publicitarias personalizadas. 
            Llega a miles de oyentes comprometidos cada día.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-dark-700/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 text-center hover:border-gold-400/40 transition-all duration-300 group hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-dark-900" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-silver-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {adPackages.map((pkg, index) => (
            <div
              key={index}
              className={`relative flex flex-col h-full bg-dark-700/50 backdrop-blur-sm border rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 ${
                pkg.highlighted 
                  ? 'border-gold-400 ring-2 ring-gold-400/30' 
                  : 'border-gold-400/20 hover:border-gold-400/40'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-gold text-dark-900 px-4 py-2 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gold-400">{pkg.price}</span>
                <span className="text-silver-400">{pkg.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="text-silver-300 flex items-start">
                    <div className="flex-shrink-0 mt-1.5 mr-2 w-2 h-2 bg-gold-400 rounded-full"></div>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <button 
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    pkg.highlighted
                      ? 'bg-gradient-gold text-dark-900 hover:scale-105'
                      : 'border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-dark-900'
                  }`}
                >
                  Contratar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="bg-dark-700/30 backdrop-blur-sm border border-gold-400/20 rounded-3xl p-8 mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
            Conoce Nuestro Alcance
          </h3>
          
          <div className="aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-dark-600 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="w-10 h-10 text-dark-900" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Video Promocional</h4>
              <p className="text-silver-400 mb-4">Descubre el poder de la publicidad en Radio Santana</p>
              <button className="bg-gradient-gold text-dark-900 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Reproducir Video
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Listo para Hacer Crecer tu Negocio?
          </h3>
          <p className="text-lg text-silver-400 mb-8 max-w-2xl mx-auto">
            Contacta con nuestro equipo comercial y descubre cómo podemos ayudarte a 
            alcanzar tus objetivos de marketing.
          </p>
          
          <div className="flex justify-center">
            <button className="bg-gradient-gold text-dark-900 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
              Solicitar Cotización
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertising;