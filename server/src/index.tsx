import { Hono } from 'hono';
import { renderer } from './renderer';

const app = new Hono();

app.get('*', renderer);

app.get('/', (c) => {
  return c.render(
    <h1 class="text-red-500 text-2xl text-center">
      I have Tailwind Powers and Hot Reload!
    </h1>
  );
});

export default app;
