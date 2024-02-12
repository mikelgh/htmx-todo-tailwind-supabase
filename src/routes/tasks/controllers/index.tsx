import { Context } from 'hono';
import { Table, CreateForm, EditForm, SuccesfulEdit } from '../views';

async function getTasksTable(c: Context) {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.render(<Table tasks={tasks} />);
}

async function getTaskEditForm(c: Context) {
  const idToEdit = c.req.param('id');
  const { data: task, error } = await c.var.supabase
    .from('tasks')
    .select()
    .eq('id', idToEdit);

  if (error) {
    throw error;
  }

  return c.render(<EditForm task={task[0] as Task} />, { title: 'Edit Task' });
}

async function getCreateForm(c: Context) {
  return c.render(<CreateForm />, { title: 'New Task' });
}

async function deleteTaskById(c: Context) {
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
}

async function createNewTask(c: Context) {
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
}

async function updateTaskById(c: Context) {
  const idToUpdate = Number(c.req.param('id'));
  const formData = await c.req.parseBody();

  const updatedTaskData: Task = {
    id: idToUpdate,
    title: formData.title as string,
    description: formData.description as string,
    completed: formData.status === 'true',
    due_date: formData.due_date as string,
  };

  const { error } = await c.var.supabase
    .from('tasks')
    .update({ ...updatedTaskData })
    .eq('id', idToUpdate);

  if (error) {
    throw error;
  }

  return c.render(<SuccesfulEdit />);
}

export default {
  getTasksTable,
  getTaskEditForm,
  getCreateForm,
  createNewTask,
  deleteTaskById,
  updateTaskById,
};
