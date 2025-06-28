import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import About from './components/About';
import Advertising from './components/Advertising';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RadioPlayer from './components/RadioPlayer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-dark-900 text-white font-inter">
        <SEO />
        <Header onAdminClick={() => setIsAdminOpen(true)} />
        <main>
          <Hero />
          <Programs />
          <About />
          <Advertising />
          <Contact />
        </main>
        <Footer />
        <RadioPlayer />
        <AdminPanel 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </div>
    </HelmetProvider>
  );
}

export default App;