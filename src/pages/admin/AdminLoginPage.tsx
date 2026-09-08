import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { signInAdmin, checkIsAdmin, AdminAuthError } from '../../services/adminAuth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Se já estiver logado como administrador, redireciona diretamente
  useEffect(() => {
    let isMounted = true;
    checkIsAdmin().then((isAdmin) => {
      if (isMounted) {
        if (isAdmin) {
          navigate('/admin/avaliacoes', { replace: true });
        } else {
          setIsCheckingAuth(false);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage('Informe o e-mail e a senha.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signInAdmin(cleanEmail, password);
      navigate('/admin/avaliacoes', { replace: true });
    } catch (err) {
      if (err instanceof AdminAuthError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Não foi possível realizar o login. Verifique suas credenciais.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-8 h-8 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 selection:bg-amber-400/30 selection:text-amber-200">
      <div className="w-full max-w-md">
        {/* Cabeçalho Institucional do Painel */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 mb-3 shadow-inner">
            <ShieldCheck size={26} />
          </div>
          <h1 className="font-titulo text-xl sm:text-2xl font-bold text-white tracking-tight">
            Editora Edital Concursos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Acesso restrito à administração
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {errorMessage && (
            <div
              className="flex items-start gap-2.5 p-3.5 mb-5 bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs sm:text-sm rounded-xl"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle size={17} className="flex-shrink-0 mt-0.5 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Campo E-mail */}
            <div>
              <label
                htmlFor="admin_email"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail size={16} />
                </div>
                <input
                  id="admin_email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="admin@editalconcursos.com.br"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-600 rounded-xl text-sm focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="admin_password"
                className="block text-xs font-semibold text-slate-300 mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock size={16} />
                </div>
                <input
                  id="admin_password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-amber-400/80 focus:ring-2 focus:ring-amber-400/20 text-white placeholder-slate-600 rounded-xl text-sm focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Rodapé do painel */}
        <p className="text-center text-xs text-slate-600 mt-6">
          Área restrita e segura da Editora Edital Concursos.
        </p>
      </div>
    </div>
  );
}
