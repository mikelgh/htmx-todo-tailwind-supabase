import { Hono } from 'hono';
import { Context } from 'hono';
import { env } from 'hono/adapter';
import { layout } from '../../middleware/layout';
import views from './views';

const app = new Hono();

app.use(layout({ isAuthenticated: false }));

app.get('/login', views.authLoginPage);

app.get('/login/google', async (c: Context) => {
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
});

app.get('/callback', async (c: Context) => {
  const code = c.req.query('code');
  const next = c.req.query('next') ?? '/';
  if (code !== undefined) {
    const { error } = await c.var.supabase.auth.exchangeCodeForSession(code);
    if (error === null) {
      return c.redirect(next);
    }
  }

  return c.redirect('/auth/error');
});

app.post('/logout', async (c: Context) => {
  await c.var.supabase.auth.signOut();
  return c.redirect('/auth/login');
});

app.get('/error', views.authErrorPage);

export default app;
