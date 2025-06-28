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

  return null;
};

export default About;