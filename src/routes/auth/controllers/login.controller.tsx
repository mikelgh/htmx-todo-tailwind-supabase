import { Context } from 'hono';
import AuthLoginPage from '../views/AuthLoginPage';
import authService from '../services/auth.service';

async function loginWithEmail(c: Context) {
  const { email, password } = await c.req.parseBody();

  const user = await authService.loginWithEmail(
    c,
    email as string,
    password as string
  );

  if (user !== null) {
    return c.redirect('/tasks/dashboard');
  }

  return c.render(<AuthLoginPage isInvalid={true} />);
}

async function loginWithGoogle(c: Context) {
  const { googleLoginURL } = await authService.loginWithGoogle(c);

  if (googleLoginURL !== null) {
    return c.redirect(googleLoginURL);
  }

  return c.redirect('/auth/error');
}

async function handleOAuthCallback(c: Context) {
  const code = c.req.query('code');
  const next = c.req.query('next') ?? '/tasks/dashboard';

  if (code !== undefined) {
    const { error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null) {
      return c.redirect(next);
    }
  }

  return c.redirect('/auth/error');
}

async function logoutSession(c: Context) {
  await authService.logoutSession(c);
  return c.redirect('/auth/login');
}

export default {
  loginWithEmail,
  loginWithGoogle,
  handleOAuthCallback,
  logoutSession,
};
