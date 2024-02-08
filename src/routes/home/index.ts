import { Hono } from 'hono';
import { layout } from './views/layout';
import views from './views';

const app = new Hono();

// Middleware
app.use('*', layout);

// Handlers
app.get('/', views.home);

export default app;
