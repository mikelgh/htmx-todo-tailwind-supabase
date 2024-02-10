import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { homeRouter } from './routes';
import { env } from 'hono/adapter';
import { createClient } from '@supabase/supabase-js';

const app = new Hono();

// Middleware
app.use('*', logger());

// Handlers
app.get('/', (c) => c.redirect('/home'));
app.get('/test', async (c) => {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = env(c);
  const supabase = createClient(
    SUPABASE_URL as string,
    SUPABASE_ANON_KEY as string
  );
  const { data: todos } = await supabase.from('tasks').select();
  return c.json(todos);
});

// Routes
app.route('/home', homeRouter);

export default app;
