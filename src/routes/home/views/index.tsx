import { Context } from 'hono';
import Table from './components/Table';

const home = async (c: Context) => {
  const { data: tasks, error } = await c.var.supabase.from('tasks').select();

  if (error) {
    throw error;
  }

  return c.render(
    <div class="w-full px-4 mx-auto sm:px-6 lg:px-16">
      <h3 class="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Task List
      </h3>
      <Table tasks={tasks} />
    </div>
  );
};

export default { home };
