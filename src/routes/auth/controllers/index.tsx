import { Context } from 'hono';
import { env } from 'hono/adapter';
import { AuthErrorPage, AuthLoginPage } from '../views';

function getAuthErrorPage(c: Context) {
  return c.render(<AuthErrorPage />);
}

function getAuthLoginPage(c: Context) {
  return c.render(<AuthLoginPage />);
}

async function loginWithGoogle(c: Context) {
  const { BASE_URL } = env(c);

  const {
    data: { url: loginUrl },
  } = await c.var.supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${BASE_URL}/auth/callback`,
    },
  });

  if (loginUrl !== null) {
    return c.redirect(loginUrl);
  }

  return c.redirect('/auth/error');
}

async function handleOAuthCallback(c: Context) {
  const code = c.req.query('code');
  const next = c.req.query('next') ?? '/';
  if (code !== undefined) {
    const { error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null) {
      return c.redirect(next);
    }
  }

  return c.redirect('/auth/error');
}

async function logoutSession(c: Context) {
  await c.var.supabase.auth.signOut();
  return c.redirect('/auth/login');
}

export default {
  getAuthErrorPage,
  getAuthLoginPage,
  loginWithGoogle,
  handleOAuthCallback,
  logoutSession,
};
