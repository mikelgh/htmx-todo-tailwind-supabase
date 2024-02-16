import { Context } from 'hono';
import HomePage from '../views/HomePage';

async function homePage(c: Context) {
  return c.render(<HomePage />);
}

export default { homePage };
