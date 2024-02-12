import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import { authMiddleware } from '../../middleware/auth';
import controllers from './controllers';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Pages
app.use(layout());
app.get('/', controllers.getHomePage);

export default app;
