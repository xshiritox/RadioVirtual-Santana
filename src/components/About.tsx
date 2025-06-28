import React from 'react';
import { Heart, Radio, Users, Award, Headphones, Mic } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Radio,
      title: 'Transmisión 24/7',
      description: 'Música y programas sin interrupciones, las 24 horas del día.'
    },
    {
      icon: Headphones,
      title: 'Calidad HD',
      description: 'Audio de alta definición para la mejor experiencia sonora.'
    },
    {
      icon: Mic,
      title: 'Locutores Profesionales',
      description: 'Equipo de profesionales apasionados por la radio.'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Miles de oyentes fieles que nos acompañan cada día.'
    }
  ];

  const achievements = [
    { number: '5+', label: 'Años al Aire' },
    { number: '10K+', label: 'Oyentes Mensuales' },
    { number: '50+', label: 'Programas Únicos' },
    { number: '24/7', label: 'Transmisión Continua' }
  ];

  return (
    <section id="about" className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(192,192,192,0.05),transparent_50%)]"></div>
      <div className="absolute top-20 left-10 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 bg-silver-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-gold-400 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Sobre Radio Santana
            </h2>
          </div>
          <div className="w-24 h-1 bg-gradient-gold mx-auto rounded-full mb-6"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Tu Compañía Musical
              <span className="block text-gold-400">Las 24 Horas</span>
            </h3>
            
            <p className="text-lg text-silver-300 leading-relaxed">
              Radio Santana nace con la pasión de conectar corazones a través de la música. 
              Somos más que una radio virtual, somos una comunidad que celebra la diversidad 
              musical y cultural.
            </p>
            
            <p className="text-lg text-silver-300 leading-relaxed">
              Desde nuestros inicios, hemos mantenido el compromiso de ofrecer contenido 
              de calidad, programas innovadores y la mejor selección musical para acompañarte 
              en cada momento de tu día.
            </p>

            <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="w-6 h-6 text-gold-400" />
                <h4 className="text-xl font-semibold text-white">Nuestra Misión</h4>
              </div>
              <p className="text-silver-300">
                Ser el puente que conecta emociones, historias y experiencias a través del 
                poder universal de la música, creando momentos únicos para nuestra audiencia.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3714513/pexels-photo-3714513.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Radio Santana Studio"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center animate-float">
              <Radio className="w-10 h-10 text-dark-900" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-silver rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
              <Mic className="w-8 h-8 text-dark-900" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-800/50 backdrop-blur-sm border border-gold-400/20 rounded-2xl p-6 text-center hover:border-gold-400/40 transition-all duration-300 group hover:scale-105"
            >
              <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-dark-900" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-silver-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="bg-dark-800/30 backdrop-blur-sm border border-gold-400/20 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Nuestros Logros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">
                  {achievement.number}
                </div>
                <div className="text-silver-400 text-sm">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;