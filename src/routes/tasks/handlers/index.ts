import { Context } from 'hono';

const deleteTaskById = async (c: Context) => {
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
};

const createNewTask = async (c: Context) => {
  const formData = await c.req.parseBody();

  const newTaskData = {
    title: formData.title,
    description: formData.description,
    completed: formData.status === 'true',
    due_date: formData.due_date,
  };

  const { error } = await c.var.supabase.from('tasks').insert(newTaskData);

  if (error) {
    throw error;
  }

  return c.redirect('/');
};

export default { deleteTaskById, createNewTask };
