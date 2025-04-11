import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { MiddlewareHandler, Context } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';
import { env } from 'hono/adapter';

export const supabaseMiddleware: MiddlewareHandler<{
  Variables: {
    supabase: SupabaseClient;
  };
}> = async (c: Context, next) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);

  const client = createServerClient(
    SUPABASE_URL ?? '',
    SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get: (key: string) => {
          return getCookie(c, key);
        },
        set: (key: string, value: any, options: object) => {
          setCookie(c, key, value, {
            ...options,
            maxAge: Math.min(options?.maxAge || 34560000, 34560000),
          });
        },
        remove: (key: string, options: object) => {
          deleteCookie(c, key, options);
        },
      },
      cookieOptions: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 34560000 // 400 days in seconds
      },
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
        cookieOptions: {
          maxAge: 34560000, // 400 days in seconds
          secure: true,
          sameSite: 'lax',
          httpOnly: true
        }
      }
    }
  );
  c.set('supabase', client);
  await next();
};
