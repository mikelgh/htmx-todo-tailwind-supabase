import { Context } from 'hono';
import Table from './components/Table';
import CreateForm from './components/CreateForm';

const tasksTable = async (c: Context) => {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.render(<Table tasks={tasks} />);
};

const editPage = async (c: Context) => {
  return c.json(c.req.param('id'));
};

const createForm = async (c: Context) => {
  return c.render(<CreateForm />);
};

export default { tasksTable, editPage, createForm };
