import React, { useState } from 'react';

type EstadoEnvio = 'idle' | 'enviando' | 'sucesso' | 'erro';

export default function FormularioContato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [estado, setEstado] = useState<EstadoEnvio>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !assunto || !mensagem) {
      return;
    }

    setEstado('enviando');

    // PLACEHOLDER: por enquanto, abre o cliente de email com a mensagem pré-formatada
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`
    );
    window.location.href = `mailto:editoraeditalconcursos@gmail.com?subject=${encodeURIComponent('Contato pelo site - ' + assunto)}&body=${corpo}`;

    setTimeout(() => {
      setEstado('sucesso');
      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-branco rounded-xl p-8 shadow-sm space-y-5">
      <div>
        <label htmlFor="nome" className="block font-titulo font-bold text-sm text-cinza-escuro mb-2">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          placeholder="Seu nome"
          className="w-full px-4 py-3 rounded-lg border border-cinza-claro focus:border-dourado focus:outline-none transition text-cinza-escuro"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-titulo font-bold text-sm text-cinza-escuro mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="seu@email.com"
          className="w-full px-4 py-3 rounded-lg border border-cinza-claro focus:border-dourado focus:outline-none transition text-cinza-escuro"
        />
      </div>

      <div>
        <label htmlFor="assunto" className="block font-titulo font-bold text-sm text-cinza-escuro mb-2">
          Assunto
        </label>
        <select
          id="assunto"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-cinza-claro focus:border-dourado focus:outline-none transition text-cinza-escuro bg-branco"
        >
          <option value="">Selecione o assunto</option>
          <option value="Dúvida sobre apostila">Dúvida sobre apostila</option>
          <option value="Suporte técnico">Suporte técnico (não recebi material, etc.)</option>
          <option value="Sugestão de novo material">Sugestão de novo material</option>
          <option value="Compra em grupo">Compra em grupo / Desconto</option>
          <option value="Solicitação de reembolso">Solicitação de reembolso</option>
          <option value="Parceria">Parceria comercial</option>
          <option value="Outro">Outro assunto</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="block font-titulo font-bold text-sm text-cinza-escuro mb-2">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
          rows={6}
          placeholder="Escreva sua mensagem com o máximo de detalhes possível..."
          className="w-full px-4 py-3 rounded-lg border border-cinza-claro focus:border-dourado focus:outline-none transition text-cinza-escuro resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="
          w-full bg-azul-profundo text-branco
          font-titulo font-bold text-lg
          py-4 px-6 rounded-full
          hover:bg-opacity-90 transition
          disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {estado === 'enviando' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {estado === 'sucesso' && (
        <div className="bg-verde-sucesso/10 border border-verde-sucesso text-verde-sucesso rounded-lg p-4 text-center">
          ✓ Seu cliente de email foi aberto com a mensagem pronta. Confirme o envio para concluir.
        </div>
      )}

      <p className="text-xs text-cinza-medio text-center">
        Ao enviar, você concorda com nossa política de privacidade. Não compartilhamos seus dados.
      </p>
    </form>
  );
}
