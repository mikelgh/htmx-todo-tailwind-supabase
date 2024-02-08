import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { homeRouter } from './routes';

const app = new Hono();

// Middleware
app.use('*', logger());

// Handlers
app.get('/', (c) => c.redirect('/home'));

// Routes
app.route('/home', homeRouter);

export default app;
