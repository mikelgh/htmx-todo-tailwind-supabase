import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import controllers from './controllers';

const app = new Hono();

// Pages
app.use(layout({ isAuthenticated: false }));
app.get('/', controllers.getHomePage);

export default app;
