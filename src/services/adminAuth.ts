import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AdminAuthError extends Error {
  public readonly code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'AdminAuthError';
    this.code = code;
  }
}

/**
 * Verifica se existe uma sessão authenticated válida e se o usuário é administrador
 * executando a RPC segura `is_admin()`.
 *
 * @returns `true` se o usuário autenticado for um administrador aprovado, caso contrário `false`.
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return false;
    }

    const { data, error } = await supabase.rpc('is_admin');

    if (error) {
      console.warn('[adminAuth] Erro ao verificar permissão is_admin:', error.message);
      return false;
    }

    return data === true;
  } catch (err) {
    console.warn('[adminAuth] Exceção ao verificar is_admin:', err);
    return false;
  }
}

/**
 * Obtém a sessão atual do Supabase Auth.
 */
export async function getAdminSession(): Promise<Session | null> {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.warn('[adminAuth] Erro ao obter sessão:', error.message);
      return null;
    }

    return session;
  } catch (err) {
    console.warn('[adminAuth] Exceção ao obter sessão:', err);
    return null;
  }
}

/**
 * Autentica o administrador por e-mail e senha e valida permissão na RPC `is_admin()`.
 *
 * @param email E-mail do administrador
 * @param password Senha do administrador
 * @returns Objeto com a sessão e o usuário autenticado
 * @throws {AdminAuthError} Caso as credenciais sejam inválidas ou o usuário não possua privilégios administrativos
 */
export async function signInAdmin(
  email: string,
  password: string
): Promise<{ session: Session; user: User }> {
  const cleanEmail = email.trim();

  if (!cleanEmail || !password) {
    throw new AdminAuthError('Informe o e-mail e a senha.', 'INVALID_INPUT');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error || !data.session || !data.user) {
    throw new AdminAuthError(
      'E-mail ou senha incorretos.',
      error?.message || 'INVALID_CREDENTIALS'
    );
  }

  // Validação imediata de privilégio administrativo via RPC
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    // Encerra imediatamente a sessão para usuários sem perfil administrativo
    await signOutAdmin();
    throw new AdminAuthError(
      'Este usuário não possui acesso administrativo.',
      'UNAUTHORIZED'
    );
  }

  return {
    session: data.session,
    user: data.user,
  };
}

/**
 * Encerra a sessão do administrador no Supabase Auth.
 */
export async function signOutAdmin(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('[adminAuth] Erro ao encerrar sessão:', err);
  }
}
