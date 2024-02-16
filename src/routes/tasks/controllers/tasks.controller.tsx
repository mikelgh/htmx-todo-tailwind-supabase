import { Context } from 'hono';
import tasksService from '../services/tasks.service';
import SuccesfulEdit from '../views/SuccessfulEdit';

async function deleteTaskById(c: Context) {
  const idToDelete = c.req.param('id');
  await tasksService.deleteTaskById(c, idToDelete);

  c.status(204);
  return c.body('');
}

async function createNewTask(c: Context) {
  const formData = await c.req.parseBody();

  // TODO: Perform validation with a library
  const newTaskData = {
    title: formData.title as string,
    description: formData.description as string,
    completed: formData.status === 'true',
    due_date: formData.due_date as string,
  };

  tasksService.createTask(c, newTaskData);

  return c.redirect('/tasks/dashboard');
}

async function updateTaskById(c: Context) {
  const idToUpdate = c.req.param('id');
  const formData = await c.req.parseBody();

  // TODO: Perform validation with a library
  const updatedTaskData: Omit<Task, 'id'> = {
    title: formData.title as string,
    description: formData.description as string,
    completed: formData.status === 'true',
    due_date: formData.due_date as string,
  };

  await tasksService.updateTask(c, idToUpdate, updatedTaskData);

  return c.render(<SuccesfulEdit />);
}

export default {
  createNewTask,
  deleteTaskById,
  updateTaskById,
};
