import { Hono } from 'hono';
import { layout } from './views/layout';
import views from './views';

const app = new Hono();

app.use(layout);

app.get('/', views.home);

export default app;
