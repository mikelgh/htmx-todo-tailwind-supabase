import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import views from './views';
import handlers from './handlers';
import { authMiddleware } from '../../middleware/auth';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Handlers
app.get('/', views.tasksTable);
app.post('/', handlers.createNewTask);
app.delete('/:id', handlers.deleteTaskById);
app.put('/:id', handlers.updateTaskById);

// Pages
app.use(layout());
app.get('/new', views.createForm);
app.get('/:id/edit', views.editForm);

export default app;
