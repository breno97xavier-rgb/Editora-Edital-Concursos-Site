# Checklist Pré-Lançamento — Editora Edital Concursos

## ✅ Concluído (via prompts)

- [x] Estrutura base (Next.js + Tailwind + paleta + fontes)
- [x] Header e Footer
- [x] Página inicial
- [x] Página de listagem com filtros
- [x] Páginas individuais de produto (22 SKUs)
- [x] Landing pages dedicadas (4 concursos)
- [x] Páginas institucionais (Sobre, Contato)
- [x] Termos de Uso e Política de Privacidade (LGPD)
- [x] SEO técnico (robots.txt, sitemap.xml, meta tags, structured data)
- [x] Páginas 404 e 500
- [x] Banner de cookies/LGPD

## 🔄 Ações manuais antes do lançamento

### 1. Domínio e hospedagem
- [ ] Comprar domínio `editoraeditalconcursos.com.br` no Registro.br
- [ ] Criar conta no Vercel
- [ ] Conectar repositório GitHub ao Vercel
- [ ] Apontar domínio para Vercel (DNS)
- [ ] Verificar SSL automático ativado

### 2. Produtos no Kiwify
- [ ] Criar conta no Kiwify (se ainda não tem)
- [ ] Cadastrar os 4 produtos do lançamento:
  - [ ] ATA-MF 2026 — Apostila Teórica (R$ 99,90)
  - [ ] INSS 2026 — Apostila Teórica (R$ 89,90 - de R$ 129,90)
  - [ ] PRF 2026 — Apostila Teórica (R$ 109,90)
  - [ ] SEDES-DF 2026 — Apostila Teórica (R$ 79,90 - de R$ 99,90)
- [ ] Configurar entrega automática do PDF por email
- [ ] Substituir todos os `PLACEHOLDER` em `data/produtos.ts` e `data/landings.ts` pelos links reais

### 3. Imagem de compartilhamento
- [ ] Criar `og-image.png` no Canva (1200×630px)
  - Sugestão: fundo azul profundo, logo da editora centralizada, frase "Sua aprovação começa com o material certo."
- [ ] Subir em `/public/og-image.png` no projeto
- [ ] Testar preview em: https://www.opengraph.xyz

### 4. Google Search Console
- [ ] Criar conta em search.google.com/search-console
- [ ] Adicionar propriedade do site (editoraeditalconcursos.com.br)
- [ ] Obter código de verificação
- [ ] Inserir o código no `app/layout.tsx` (campo `verification.google`)
- [ ] Submeter sitemap: `https://editoraeditalconcursos.com.br/sitemap.xml`

### 5. Meta Pixel (quando o Wesley configurar)
- [ ] Wesley cria Pixel no Meta Business
- [ ] Pega o Pixel ID
- [ ] Substituir `SEU_PIXEL_ID` no código das landing pages
- [ ] Descomentar o código do Pixel
- [ ] Testar com Meta Pixel Helper (extensão Chrome)

### 6. Google Analytics 4 (opcional, mas recomendado)
- [ ] Criar conta em analytics.google.com
- [ ] Obter o ID de medição (G-XXXXXXXXXX)
- [ ] Adicionar ao layout via Next.js Script

### 7. CNPJ no rodapé
- [x] Confirmar que aparece: WB2 Empreendimentos LTDA · CNPJ: 65.395.470/0001-47

### 8. Capas dos produtos restantes
- [ ] Criar capas das 14 matérias básicas (Português, Matemática, etc.)
- [ ] Subir no ImgBB com fundo transparente
- [ ] Substituir URLs em `data/produtos.ts`

### 9. Testes finais
- [ ] Teste de compra completa em modo sandbox do Kiwify
- [ ] Teste em mobile (Chrome iPhone/Android)
- [ ] Teste em desktop (Chrome, Firefox, Safari)
- [ ] Teste de velocidade: https://pagespeed.web.dev
- [ ] Teste do formulário de contato (recebimento de email)
- [ ] Verificar todos os links do menu e footer
- [ ] Verificar todas as URLs `/lp/*` funcionando

### 10. Revisão legal (recomendado)
- [ ] Revisão dos Termos de Uso por advogado
- [ ] Revisão da Política de Privacidade por advogado
- [ ] Custo estimado: R$ 500 - R$ 1.500 (eventual)

## 🚀 Pós-lançamento

- [ ] Primeira campanha do Wesley no Meta Ads (foco ATA-MF)
- [ ] Monitorar taxa de conversão da landing `/lp/ata-mf-2026`
- [ ] Coletar primeiros depoimentos de aprovados
- [ ] Ativar seção "Histórias de aprovados" na home
- [ ] Avaliar criação das próximas landing pages (matérias específicas)
