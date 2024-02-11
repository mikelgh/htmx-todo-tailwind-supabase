import type { MiddlewareHandler } from 'hono';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Context } from 'hono';

export const authMiddleware: MiddlewareHandler<{
  Variables: {
    supabase: SupabaseClient;
  };
}> = async (c: Context, next) => {
  const {
    data: { user },
  } = await c.var.supabase.auth.getUser();

  if (user === null) {
    return c.redirect('/auth/error');
  }

  await next();
};
