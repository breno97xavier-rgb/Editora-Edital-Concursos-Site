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
        'azul-edital': '#0C2E5C',     // Azul Edital oficial
        'azul-profundo': '#071B38',   // Azul profundo institucional
        'amarelo-edital': '#F4BF24',  // Amarelo Edital oficial
        'dourado': '#F4BF24',         // Amarelo Edital (sinônimo de compatibilidade)
        'branco': '#FFFFFF',          // Fundo principal
        'cinza-claro': '#F8FAFC',     // Fundo secundário neutro
        'cinza-borda': '#E2E8F0',     // Divisórias e bordas sutis
        'cinza-medio': '#64748B',     // Textos secundários
        'cinza-escuro': '#1E293B',    // Texto principal
        'verde-sucesso': '#10B981',   // Indicadores de sucesso/WhatsApp
        'vermelho-promo': '#DC2626',  // Destaques de urgência pontuais
      },
      fontFamily: {
        'titulo': ['Montserrat', 'sans-serif'],
        'corpo': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'suave': '0 1px 3px 0 rgba(12, 46, 92, 0.05), 0 1px 2px 0 rgba(12, 46, 92, 0.03)',
        'card': '0 4px 6px -1px rgba(7, 27, 56, 0.05), 0 2px 4px -1px rgba(7, 27, 56, 0.03)',
      },
    },
  },
  plugins: [],
};

export default config;
