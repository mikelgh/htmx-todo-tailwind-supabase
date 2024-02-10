import { Context } from 'hono';
import Table from './components/Table';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';

const tasksTable = async (c: Context) => {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.render(<Table tasks={tasks} />);
};

const editForm = async (c: Context) => {
  const idToEdit = c.req.param('id');
  const { data: task, error } = await c.var.supabase
    .from('tasks')
    .select()
    .eq('id', idToEdit);

  if (error) {
    throw error;
  }

  return c.render(<EditForm task={task[0] as Task} />, { title: 'Edit Task' });
};

const createForm = async (c: Context) => {
  return c.render(<CreateForm />, { title: 'New Task' });
};

export default { tasksTable, editForm, createForm };
