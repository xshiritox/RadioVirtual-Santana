<template>
  <Teleport to="head">
    <!-- Primary Meta Tags -->
    <title>{{ siteData.title }}</title>
    <meta name="title" :content="siteData.title" />
    <meta name="description" :content="siteData.description" />
    <meta name="keywords" :content="siteData.keywords" />
    <meta name="author" :content="siteData.author" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, max-video-preview:-1, max-image-preview:large" />
    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="language" content="Spanish" />
    <meta name="geo.region" content="CO" />
    <meta name="geo.placename" content="Colombia" />
    <meta name="geo.position" content="6.25184,-75.56359" />
    <meta name="ICBM" content="6.25184, -75.56359" />
    <meta name="revisit-after" content="1 days" />
    <meta name="rating" content="general" />
    <meta name="distribution" content="global" />
    <meta name="copyright" content="© 2025 Radio Santana. Todos los derechos reservados." />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="siteData.siteUrl" />
    <meta property="og:title" :content="siteData.title" />
    <meta property="og:description" :content="siteData.description" />
    <meta property="og:image" :content="siteData.image" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Radio Santana - Tu Radio Virtual" />
    <meta property="og:site_name" content="Radio Santana" />
    <meta property="og:locale" content="es_ES" />
    <meta property="og:audio" content="https://radiovirtual-santana.netlify.app/stream" />
    <meta property="og:audio:type" content="audio/mpeg" />
    <meta property="og:audio:title" content="Radio Santana en Vivo" />
    <meta property="og:audio:artist" content="Radio Santana" />
    <meta property="og:audio:album" content="Radio Santana - Música 24/7" />
    <meta property="og:audio:type" content="audio/mpeg" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" :content="siteData.siteUrl" />
    <meta name="twitter:title" :content="siteData.title" />
    <meta name="twitter:description" :content="siteData.description" />
    <meta name="twitter:image" :content="siteData.image" />
    <meta name="twitter:site" :content="siteData.twitterHandle" />
    <meta name="twitter:creator" :content="siteData.twitterHandle" />

    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#FFD700" />
    <meta name="msapplication-TileColor" content="#212529" />
    <meta name="msapplication-config" content="/browserconfig.xml" />

    <!-- Canonical URL -->
    <link rel="canonical" :href="siteData.siteUrl" />
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const siteData = {
  title: "Radio Santana Colombia | Escucha Música en Vivo 24/7 | Tu Radio Virtual",
  description: "Radio Santana Colombia - Tu emisora virtual favorita con la mejor música en vivo 24/7. Disfruta de programas exclusivos, música variada y el mejor entretenimiento radial de Colombia. ¡Escucha Radio Santana online ahora!",
  keywords: "radiovirtual santana, radio santana colombia, colombia radio, radio en vivo, música online colombia, radio Santana, emisora virtual, streaming musical, programas de radio colombia, radio digital, radio online, escuchar radio, música 24/7, radio santana en vivo, emisora santana, radio santana online, radio colombia, emisoras de colombia, radio en línea, radio santana virtual",
  author: "Radio Santana",
  siteUrl: "https://radiovirtual-santana.netlify.app",
  image: "https://radiovirtual-santana.netlify.app/og-image.jpg",
  twitterHandle: "@NMradio_santana"
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  "name": "Radio Santana",
  "description": "Radio Santana Colombia - La mejor programación musical 24/7 con los mejores éxitos y programas en vivo desde Colombia. Tu radio virtual favorita en línea.",
  "url": siteData.siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteData.siteUrl}/logo.png`,
    "width": "512",
    "height": "512"
  },
  "image": `${siteData.siteUrl}/og-image.jpg`,
  "broadcastFrequency": "En línea",
  "genre": ["Música", "Entretenimiento", "Radio Online", "Radio Colombia", "Emisora Virtual"],
  "inLanguage": "es-ES",
  "potentialAction": {
    "@type": "ListenAction",
    "target": "https://radiovirtual-santana.netlify.app/stream",
    "actionStatus": "https://schema.org/ActiveActionStatus"
  },
  "broadcastDisplayName": "Radio Santana",
  "broadcaster": {
    "@type": "Organization",
    "name": "Radio Santana",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteData.siteUrl}/logo.png`
    }
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+57 310 6035384",
      "contactType": "customer service",
      "email": "radiosantana.nm@gmail.com",
      "availableLanguage": ["Spanish"]
    },
    {
      "@type": "ContactPoint",
      "contactType": "whatsapp",
      "telephone": "+573106035384",
      "availableLanguage": ["Spanish"]
    }
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "Colombia"
    },
    {
      "@type": "Country",
      "name": "Global",
      "description": "Transmisión en línea mundial"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61577153733772&locale=es_LA",
    "https://x.com/NMradio_santana",
    "https://www.instagram.com/radiovirtual_santana"
  ],
  "foundingDate": "2023-01-01",
  "slogan": "Tu música, tu compañía, las 24 horas",
  "knowsAbout": ["Música", "Entretenimiento", "Radio Online", "Eventos en vivo"]
}

// Add structured data with error handling and performance optimization
onMounted(() => {
  try {
    // Remove existing structured data to avoid duplicates
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove())
    
    // Create new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-vue-seo', 'true')
    script.textContent = JSON.stringify(structuredData, null, 2)
    
    // Add to head with defer to not block rendering
    document.head.appendChild(script)
    
    // Preconnect to important origins
    const preconnectUrls = [
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://www.facebook.com',
      'https://connect.facebook.net',
      'https://platform.twitter.com',
      'https://www.instagram.com'
    ]
    
    preconnectUrls.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = url
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  } catch (error) {
    console.error('Error adding structured data:', error)
  }
})
</script>