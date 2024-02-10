import { Context } from 'hono';
import Table from './components/Table';

const tasks = async (c: Context) => {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.render(<Table tasks={tasks} />);
};

const edit = async (c: Context) => {
  return c.json(c.req.param('id'));
};

export default { tasks, edit };
