import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO: React.FC = () => {
  const siteData = {
    title: "Radio Santana - Tu Radio Virtual | Música y Entretenimiento 24/7",
    description: "Disfruta de Radio Santana, tu radio virtual con la mejor música, programas en vivo y entretenimiento las 24 horas. Streaming de alta calidad y programación exclusiva.",
    keywords: "radio online, radio virtual, música en vivo, streaming radio, Radio Santana, entretenimiento, programas de radio, música 24/7",
    author: "Radio Santana",
    siteUrl: "https://radiosantana.netlify.app",
    image: "https://radiosantana.netlify.app/og-image.jpg",
    twitterHandle: "@RadioSantana"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": "Radio Santana",
    "description": siteData.description,
    "url": siteData.siteUrl,
    "logo": `${siteData.siteUrl}/logo.png`,
    "broadcastAffiliateOf": {
      "@type": "Organization",
      "name": "Radio Santana Network"
    },
    "genre": ["Pop", "Rock", "Jazz", "World Music"],
    "inLanguage": "es",
    "broadcastFrequency": "Online Streaming",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "info@radiosantana.com"
    },
    "sameAs": [
      "https://facebook.com/radiosantana",
      "https://instagram.com/radiosantana",
      "https://twitter.com/radiosantana"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteData.title}</title>
      <meta name="title" content={siteData.title} />
      <meta name="description" content={siteData.description} />
      <meta name="keywords" content={siteData.keywords} />
      <meta name="author" content={siteData.author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteData.siteUrl} />
      <meta property="og:title" content={siteData.title} />
      <meta property="og:description" content={siteData.description} />
      <meta property="og:image" content={siteData.image} />
      <meta property="og:image:alt" content="Radio Santana - Tu Radio Virtual" />
      <meta property="og:site_name" content="Radio Santana" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteData.siteUrl} />
      <meta property="twitter:title" content={siteData.title} />
      <meta property="twitter:description" content={siteData.description} />
      <meta property="twitter:image" content={siteData.image} />
      <meta property="twitter:site" content={siteData.twitterHandle} />
      <meta property="twitter:creator" content={siteData.twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#FFD700" />
      <meta name="msapplication-TileColor" content="#212529" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Canonical URL */}
      <link rel="canonical" href={siteData.siteUrl} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Additional SEO Meta Tags */}
      <meta name="apple-mobile-web-app-title" content="Radio Santana" />
      <meta name="application-name" content="Radio Santana" />
      <meta name="msapplication-tooltip" content="Radio Santana - Tu Radio Virtual" />
      <meta name="msapplication-starturl" content="/" />
      <meta name="msapplication-navbutton-color" content="#FFD700" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="España" />
      
      {/* Content Security Policy (opcional) */}
      <meta 
        httpEquiv="Content-Security-Policy" 
        content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.firebase.com https://firestore.googleapis.com;"
      />
    </Helmet>
  );
};

export default SEO;