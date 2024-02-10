import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';

export const supabaseMiddleware: MiddlewareHandler<{
  Variables: {
    supabase: SupabaseClient;
  };
}> = async (c, next) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    await next();
  } else {
    const client = createClient(
      SUPABASE_URL as string,
      SUPABASE_ANON_KEY as string
    );

    c.set('supabase', client);
    await next();
  }
};
