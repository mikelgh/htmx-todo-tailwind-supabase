import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import controllers from './controllers';
import { authMiddleware } from '../../middleware/auth';

const app = new Hono();

// Middleware
app.use(authMiddleware);

// Handlers
app.get('/', controllers.getTasksTable);
app.post('/', controllers.createNewTask);
app.delete('/:id', controllers.deleteTaskById);
app.put('/:id', controllers.updateTaskById);

// Pages
app.use(layout());
app.get('/new', controllers.getCreateForm);
app.get('/:id/edit', controllers.getTaskEditForm);

export default app;
