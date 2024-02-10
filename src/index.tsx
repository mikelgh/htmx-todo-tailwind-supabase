import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { homeRouter, tasksRouter } from './routes';
import { supabaseMiddleware } from './middleware/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// c.var types
type Variables = {
  client: SupabaseClient;
};

// c.env types
type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

const app = new Hono<{ Variables: Variables; Bindings: Bindings }>();

// Middleware
app.use(logger());

// Handlers
app.get('/', (c) => c.redirect('/home'));

// Routes
app.use(supabaseMiddleware);
app.route('/home', homeRouter);
app.route('/tasks', tasksRouter);

export default app;
