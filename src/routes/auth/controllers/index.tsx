import { Context } from 'hono';
import { env } from 'hono/adapter';
import {
  AuthErrorPage,
  AuthLoginPage,
  AuthSignUpPage,
  EmailVerificationCTA,
} from '../views';

function getAuthErrorPage(c: Context) {
  return c.render(<AuthErrorPage />);
}

function getAuthLoginPage(c: Context) {
  return c.render(<AuthLoginPage />);
}

function getAuthSignUpPage(c: Context) {
  return c.render(<AuthSignUpPage />);
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

async function signUpWithEmail(c: Context) {
  const { BASE_URL } = env(c);

  const { email, password } = await c.req.parseBody();

  const { data, error } = await c.var.supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${BASE_URL}/auth/login` },
  });

  if (error == null) {
    return c.render(<EmailVerificationCTA />);
  }

  return c.redirect('/auth/error');
}

async function signInWithEmail(c: Context) {
  const { BASE_URL } = env(c);

  const { email, password } = await c.req.parseBody();

  const {
    data: { user },
  } = await c.var.supabase.auth.signInWithPassword({
    email,
    password,
    options: { redirectTo: `${BASE_URL}/tasks/dashboard` },
  });

  if (user !== null) {
    return c.redirect('/tasks/dashboard');
  }
  return c.render(<AuthLoginPage isInvalid={true} />);
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
  await c.var.supabase.auth.signOut();
  return c.redirect('/auth/login');
}

export default {
  getAuthErrorPage,
  getAuthLoginPage,
  getAuthSignUpPage,
  loginWithGoogle,
  handleOAuthCallback,
  logoutSession,
  signUpWithEmail,
  signInWithEmail,
};
