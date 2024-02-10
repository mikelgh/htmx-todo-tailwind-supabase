import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import { Context } from 'hono';

const app = new Hono();

app.use(layout);

app.get('/:id/edit', (c: Context) => {
  return c.json(c.req.param('id'));
});

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

export default app;
