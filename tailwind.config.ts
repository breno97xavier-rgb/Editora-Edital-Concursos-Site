import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-profundo': '#0D1B2A',   // Cor primária — header, footer, banners
        'dourado': '#C9A84C',         // Cor de destaque — botões CTA, badges, ícones
        'branco': '#FFFFFF',          // Fundo principal
        'cinza-claro': '#F5F5F7',     // Fundo de seções alternadas
        'cinza-medio': '#6B7280',     // Textos secundários
        'cinza-escuro': '#1F2937',    // Texto principal
        'verde-sucesso': '#10B981',   // Selos de confiança
        'vermelho-promo': '#DC2626',  // Descontos, ofertas (uso pontual)
      },
      fontFamily: {
        'titulo': ['Montserrat', 'sans-serif'],
        'corpo': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
