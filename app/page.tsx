import React from 'react';
import { Link } from 'react-router-dom';
import CardProduto, { ProdutoCard } from '../components/produto/CardProduto';
import Book3D from '../components/produto/Book3D';

// Dados temporários — serão substituídos por banco de dados real no Prompt 11
const produtosDestaque: ProdutoCard[] = [
  {
    slug: 'ata-mf-2026-teorico',
    titulo: 'Apostila ATA-MF 2026 — Assistente Técnico Administrativo',
    tipo: 'teorico',
    preco: 99.90,
    parcelamento: '8x de R$ 12,49',
    capaUrl: 'https://i.ibb.co/9xxfrTG/ata-mf-png-removebg-preview.png',
  },
  {
    slug: 'inss-2026-teorico',
    titulo: 'Apostila INSS 2026 — Técnico do Seguro Social',
    tipo: 'teorico',
    preco: 89.90,
    precoOriginal: 129.90,
    parcelamento: '8x de R$ 11,24',
    capaUrl: 'https://i.ibb.co/qZ04RSs/inss-png-removebg-preview.png',
  },
  {
    slug: 'sedes-df-2026-teorico',
    titulo: 'Apostila SEDES-DF 2026 — Técnico Administrativo',
    tipo: 'teorico',
    preco: 79.90,
    precoOriginal: 99.90,
    parcelamento: '7x de R$ 11,41',
    capaUrl: 'https://i.ibb.co/bgfWSfFN/sedes-df-png-removebg-preview.png',
  },
  {
    slug: 'prf-2026-teorico',
    titulo: 'Apostila PRF 2026 — Agente Administrativo',
    tipo: 'teorico',
    preco: 109.90,
    parcelamento: '9x de R$ 12,21',
    capaUrl: 'https://i.ibb.co/mCWQm6YC/prf-png-removebg-preview.png',
  },
];

export default function HomePage() {
  return (
    <main>
      {/* SEÇÃO 1 — HERO PRINCIPAL */}
      <section className="bg-azul-profundo py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Coluna Esquerda — Texto */}
            <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-6">
              <span className="inline-block w-fit text-dourado font-titulo font-bold text-sm tracking-widest uppercase border border-dourado/40 px-4 py-1 rounded-full">
                Editora Edital Concursos
              </span>

              <h1 className="font-titulo text-5xl md:text-6xl lg:text-7xl font-bold text-branco leading-tight">
                Sua aprovação<br />
                começa com o<br />
                <span className="text-dourado">material certo.</span>
              </h1>

              <p className="text-xl md:text-2xl text-cinza-claro max-w-2xl leading-relaxed">
                Apostilas digitais para concursos públicos. Atualizadas, completas, com questões comentadas das principais bancas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link 
                  to="/apostilas"
                  className="bg-dourado text-azul-profundo font-titulo font-bold text-lg px-8 py-4 rounded-full hover:bg-opacity-90 transition text-center inline-flex items-center justify-center gap-2"
                >
                  Ver Apostilas
                  <span>→</span>
                </Link>
                <Link 
                  to="/apostilas?categoria=concurso"
                  className="bg-transparent border-2 border-branco text-branco font-titulo font-bold text-lg px-8 py-4 rounded-full hover:bg-branco hover:text-azul-profundo transition text-center"
                >
                  Por Concurso
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 mt-6 text-cinza-claro text-sm">
                <span className="flex items-center gap-2">✓ Liberação imediata</span>
                <span className="flex items-center gap-2">✓ 100% digital</span>
                <span className="flex items-center gap-2">✓ Site seguro</span>
              </div>
            </div>

            {/* Coluna Direita — Livros (Desktop) */}
            <div className="lg:col-span-5 relative h-[500px] hidden lg:flex items-center justify-center">
              <div className="absolute z-20 transform translate-y-2">
                <Book3D 
                  capaUrl="https://i.ibb.co/9xxfrTG/ata-mf-png-removebg-preview.png"
                  titulo="Apostila ATA-MF 2026"
                  tamanho="grande"
                />
              </div>
              <div className="absolute left-0 top-12 z-10 transform -rotate-6">
                <Book3D 
                  capaUrl="https://i.ibb.co/qZ04RSs/inss-png-removebg-preview.png"
                  titulo="Apostila INSS 2026"
                  tamanho="medio"
                />
              </div>
              <div className="absolute right-0 bottom-12 z-10 transform rotate-6">
                <Book3D 
                  capaUrl="https://i.ibb.co/mCWQm6YC/prf-png-removebg-preview.png"
                  titulo="Apostila PRF 2026"
                  tamanho="medio"
                />
              </div>
            </div>

            {/* Livro Central — Mobile */}
            <div className="lg:hidden flex justify-center mt-8">
              <Book3D 
                capaUrl="https://i.ibb.co/9xxfrTG/ata-mf-png-removebg-preview.png"
                titulo="Apostila ATA-MF 2026"
                tamanho="medio"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — FAIXA DE PRÓXIMOS CONCURSOS */}
      <section className="py-12 bg-cinza-claro">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center font-titulo text-2xl md:text-3xl font-bold text-azul-profundo mb-8">
            Próximos grandes concursos
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { sigla: 'ATA-MF', nome: 'Ministério da Fazenda', slug: 'ata-mf-2026-teorico' },
              { sigla: 'INSS', nome: 'Técnico do Seguro Social', slug: 'inss-2026-teorico' },
              { sigla: 'PRF', nome: 'Polícia Rodoviária Federal', slug: 'prf-2026-teorico' },
              { sigla: 'SEDES-DF', nome: 'Distrito Federal', slug: 'sedes-df-2026-teorico' },
            ].map((c) => (
              <Link 
                key={c.sigla}
                to={`/apostila/${c.slug}`}
                className="
                  bg-branco rounded-lg p-6 text-center 
                  border-2 border-transparent
                  hover:border-dourado hover:shadow-lg 
                  transition-all duration-300
                  group
                "
              >
                <div className="font-titulo font-bold text-2xl md:text-3xl text-azul-profundo group-hover:text-dourado transition-colors">
                  {c.sigla}
                </div>
                <div className="text-cinza-medio text-sm mt-1">
                  {c.nome}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — APOSTILAS EM DESTAQUE */}
      <section className="py-20 bg-branco">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="text-dourado font-titulo font-bold text-sm tracking-widest uppercase">
                Catálogo
              </span>
              <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mt-2">
                Apostilas em destaque
              </h2>
            </div>
            <Link 
              to="/apostilas"
              className="text-azul-profundo font-titulo font-bold hover:text-dourado transition flex items-center gap-2"
            >
              Ver todas as apostilas
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtosDestaque.map((produto) => (
              <CardProduto key={produto.slug} produto={produto} />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 4 — POR QUE ESCOLHER A EDITORA */}
      <section className="py-20 bg-azul-profundo">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center font-titulo text-3xl md:text-4xl font-bold text-branco mb-4">
            Por que escolher a Editora Edital Concursos?
          </h2>
          <p className="text-center text-cinza-claro text-lg max-w-3xl mx-auto mb-16">
            Material desenvolvido por quem entende de concurso público.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { numero: '+22', label: 'Produtos no catálogo', desc: 'Catálogo crescendo todo mês' },
              { numero: '100%', label: 'Atualizado', desc: 'Conforme o último edital' },
              { numero: 'Banca', label: 'Real', desc: 'Questões das principais bancas' },
              { numero: '24h', label: 'Suporte', desc: 'Tire dúvidas com a editora' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-titulo font-bold text-5xl md:text-6xl text-dourado mb-2">
                  {item.numero}
                </div>
                <div className="font-titulo font-bold text-lg text-branco mb-1">
                  {item.label}
                </div>
                <div className="text-cinza-claro text-sm">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 5 — CATEGORIAS DESTACADAS */}
      <section className="py-20 bg-cinza-claro">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mb-4">
            Encontre o material ideal
          </h2>
          <p className="text-center text-cinza-medio text-lg mb-12">
            Navegue por categoria e descubra o que você precisa para sua aprovação.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                titulo: 'Matérias Básicas', 
                desc: 'Português, Matemática, Direito Constitucional e mais. Construa sua base.',
                icone: '📚',
                link: '/apostilas?categoria=materia',
                cor: 'from-azul-profundo to-[#1a2c42]',
              },
              { 
                titulo: 'Concursos Federais', 
                desc: 'INSS, PRF, ATA-MF e mais. Apostilas dirigidas a editais específicos.',
                icone: '🏛️',
                link: '/apostilas?categoria=concurso',
                cor: 'from-dourado to-[#a88a3d]',
              },
              { 
                titulo: 'Combos', 
                desc: 'Kits completos com desconto. Em breve no nosso catálogo.',
                icone: '📦',
                link: '/apostilas?categoria=combo',
                cor: 'from-cinza-escuro to-cinza-medio',
                emBreve: true,
              },
            ].map((cat) => (
              <Link 
                key={cat.titulo}
                to={cat.link}
                className={`
                  relative overflow-hidden rounded-xl p-8
                  bg-gradient-to-br ${cat.cor}
                  text-branco
                  hover:shadow-2xl hover:-translate-y-1
                  transition-all duration-300
                  min-h-[220px]
                  flex flex-col justify-between
                `}
              >
                {cat.emBreve && (
                  <span className="absolute top-4 right-4 bg-branco/20 backdrop-blur text-branco text-xs font-bold px-3 py-1 rounded-full">
                    Em breve
                  </span>
                )}
                <div className="text-5xl mb-4">{cat.icone}</div>
                <div>
                  <h3 className="font-titulo font-bold text-2xl mb-2">
                    {cat.titulo}
                  </h3>
                  <p className="text-branco/80 text-sm leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — NEWSLETTER */}
      <section className="py-20 bg-dourado">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-titulo text-3xl md:text-4xl font-bold text-azul-profundo mb-4">
            Receba os melhores conteúdos sobre concursos
          </h2>
          <p className="text-azul-profundo/80 text-lg mb-8 max-w-2xl mx-auto">
            Editais, dicas de estudo e descontos exclusivos direto no seu email.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-grow px-6 py-4 rounded-full text-cinza-escuro border-2 border-azul-profundo/20 focus:border-azul-profundo focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-azul-profundo text-branco font-titulo font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition whitespace-nowrap"
            >
              Quero receber
            </button>
          </form>

          <p className="text-azul-profundo/60 text-xs mt-4">
            Nada de spam. Você pode cancelar a qualquer momento.
          </p>
        </div>
      </section>

      {/* SEÇÃO 7 — FAIXA WHATSAPP */}
      <section className="py-12 bg-azul-profundo border-t border-dourado/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-titulo font-bold text-2xl text-branco mb-1">
                Precisa de ajuda para escolher seu material?
              </h3>
              <p className="text-cinza-claro">
                Fale com a gente diretamente pelo WhatsApp. Resposta em minutos.
              </p>
            </div>
            <a 
              href={`https://wa.me/5541988420201?text=${encodeURIComponent('Olá! Vim pelo site da Editora Edital Concursos e gostaria de mais informações sobre as apostilas.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-verde-sucesso text-branco font-titulo font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition flex items-center gap-3 whitespace-nowrap"
            >
              <span className="text-2xl">📱</span>
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
