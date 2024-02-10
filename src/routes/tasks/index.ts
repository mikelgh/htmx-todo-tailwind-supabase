import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import { Context } from 'hono';
import views from './views';

const app = new Hono();

// Handlers
app.get('/', views.tasks);

app.delete('/:id', async (c: Context) => {
  const idToDelete = c.req.param('id');
  const { error } = await c.var.supabase
    .from('tasks')
    .delete()
    .eq('id', idToDelete);

  if (error) {
    c.status(204);
  }

  c.status(200);
  return c.body('');
});

// Pages
app.use(layout);

app.get('/:id/edit', views.edit);

export default app;
