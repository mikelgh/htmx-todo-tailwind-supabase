import { Context } from 'hono';

const home = (c: Context) => {
  return c.render(
    <h1 class="text-green-500 text-2xl text-center">
      I have TailwindCSS and Hot Reload!
    </h1>
  );
};

export default { home };
