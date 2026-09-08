import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkIsAdmin, signOutAdmin } from '../../services/adminAuth';
import { supabase } from '../../lib/supabase';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [status, setStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      const isAdmin = await checkIsAdmin();
      if (!isMounted) return;

      if (isAdmin) {
        setStatus('authorized');
      } else {
        // Se houver sessão mas não for admin, encerra a sessão
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          await signOutAdmin();
        }
        if (isMounted) {
          setStatus('unauthorized');
        }
      }
    }

    verifyAuth();

    // Listener para mudanças de estado de autenticação (refresh de token, signout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        if (isMounted) setStatus('unauthorized');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        verifyAuth();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium tracking-wide">
            Verificando credenciais...
          </span>
        </div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
