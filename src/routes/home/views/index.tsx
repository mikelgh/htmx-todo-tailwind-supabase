import { Context } from 'hono';

const home = (c: Context) => {
  return c.render(
    <h1 class="text-purple-500 text-2xl text-center">
      I have TailwindCSS, with Hot Reload! Now powered by bun!
    </h1>
  );
};

export default { home };
