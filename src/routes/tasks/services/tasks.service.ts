import { Context } from 'hono';

async function getAllTasks(c: Context): Promise<Task[]> {
  const { data: tasks, error } = await c.var.supabase
    .from('tasks')
    .select()
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return tasks;
}

async function getTaskById(c: Context, id: string): Promise<Task> {
  const { data: results, error } = await c.var.supabase
    .from('tasks')
    .select()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return results[0];
}

async function deleteTaskById(c: Context, id: string): Promise<void> {
  const { error } = await c.var.supabase.from('tasks').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

async function createTask(c: Context, task: Omit<Task, 'id'>) {
  const {
    data: { user },
  } = await c.var.supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await c.var.supabase.from('tasks').insert({
    ...task,
    user_id: user.id
  });

  if (error) {
    throw error;
  }
}

async function updateTask(c: Context, id: string, task: Omit<Task, 'id'>) {
  const { error } = await c.var.supabase
    .from('tasks')
    .update({ ...task })
    .eq('id', id);

  if (error) {
    throw error;
  }
}

export default {
  getAllTasks,
  getTaskById,
  deleteTaskById,
  createTask,
  updateTask,
};
