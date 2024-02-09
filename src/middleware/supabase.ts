import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { env } from 'hono/adapter';

// Code is a modified version of https://github.com/kosei28/hono-supabase-auth/blob/main/src/supabase.ts to use the Hono context's env
export const supabaseMiddleware: MiddlewareHandler<{
  Variables: {
    supabase: SupabaseClient;
  };
}> = async (c, next) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);

  const client = createServerClient(
    (SUPABASE_URL as string) ?? '',
    (SUPABASE_ANON_KEY as string) ?? '',
    {
      cookies: {
        get: (key) => {
          return getCookie(c, key);
        },
        set: (key, value, options) => {
          setCookie(c, key, value, options);
        },
        remove: (key, options) => {
          deleteCookie(c, key, options);
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
      },
    }
  );
  c.set('supabase', client);
  await next();
};
