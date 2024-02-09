import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { homeRouter } from './routes';
import { supabaseMiddleware } from './middleware/supabase';
import { env } from 'hono/adapter';

const app = new Hono();

// Middleware
app.use('*', logger());

// Handlers
app.get('/', (c) => c.redirect('/home'));
app.get('/test', supabaseMiddleware, (c) => c.json(env(c)));

// Routes
app.route('/home', homeRouter);

export default app;
