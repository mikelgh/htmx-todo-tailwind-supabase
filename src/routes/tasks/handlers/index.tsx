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

const updateTaskById = async (c: Context) => {
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

  return c.render(
    <div
      hx-get="/"
      hx-trigger="load delay:2s"
      hx-boost="true"
      hx-target="body"
      className="grid w-full gap-8 place-items-center"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Successfully edited the task ✅
        </h2>
        <p className="mt-1.5 text-sm text-gray-500">
          Redirecting you back to home...
        </p>
      </div>

      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default { deleteTaskById, createNewTask, updateTaskById };
