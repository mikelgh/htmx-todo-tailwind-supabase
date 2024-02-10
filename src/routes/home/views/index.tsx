import { Context } from 'hono';

const home = async (c: Context) => {
  return c.render(
    <div id="home-container" class="w-full px-4 mx-auto sm:px-6 lg:px-16">
      <h3 class="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
        Task List
      </h3>
      <div hx-get="/tasks" hx-trigger="revealed" hx-swap="outerHTML" />
    </div>
  );
};

export default { home };
