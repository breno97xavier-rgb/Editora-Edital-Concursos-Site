import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export default function SEO({ title, description, canonical }: MetaProps) {
  const location = useLocation();
  const baseUrl = 'https://editoraeditalconcursos.com.br';
  const currentPath = location.pathname;
  
  const finalTitle = title ? `${title} | Editora Edital Concursos` : 'Editora Edital Concursos — Apostilas para Concursos Públicos';
  const finalDescription = description || 'Apostilas digitais e cadernos de questões para os principais concursos públicos do Brasil. Material atualizado, com questões comentadas das principais bancas.';
  const finalCanonical = canonical || `${baseUrl}${currentPath}`;

  useEffect(() => {
    document.title = finalTitle;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);

    // Update canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);
    
    // OpenGraph
    const ogTags = [
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:url', content: finalCanonical },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Editora Edital Concursos' },
      { property: 'og:image', content: `${baseUrl}/og-image.png` },
      { property: 'og:locale', content: 'pt_BR' },
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

    // Twitter
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: `${baseUrl}/og-image.png` },
    ];

    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });

  }, [finalTitle, finalDescription, finalCanonical]);

  return null;
}
