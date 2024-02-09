import { Context } from 'hono';

const home = (c: Context) => {
  return c.render(
    <h1 class="text-blue-500 text-2xl text-center">
      I have TailwindCSS and Hot Reload! Now powered by bun!
    </h1>
  );
};

export default { home };
