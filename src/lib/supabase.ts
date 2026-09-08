import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn(
    '[Supabase] Variáveis de ambiente VITE_SUPABASE_URL e/ou VITE_SUPABASE_PUBLISHABLE_KEY não foram informadas. Configure-as no arquivo .env para habilitar as funcionalidades integradas ao Supabase.'
  );
}

/**
 * Instância única e reutilizável do cliente Supabase para o frontend.
 * Utiliza estritamente a chave pública publicável (anon/publishable key).
 */
export const supabase = createClient(
  supabaseUrl ?? '',
  supabasePublishableKey ?? ''
);
