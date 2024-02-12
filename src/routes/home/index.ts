import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import views from './views';
import { authMiddleware } from '../../middleware/auth';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Pages
app.use(layout());
app.get('/', views.home);

export default app;
