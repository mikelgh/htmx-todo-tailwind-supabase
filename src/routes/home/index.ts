import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import viewController from './controllers/view.controller';

const app = new Hono();

// Pages
app.use(layout({ isAuthenticated: false }));
app.get('/', viewController.homePage);

export default app;
