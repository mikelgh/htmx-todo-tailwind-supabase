import { Context } from 'hono';
import { HomePage } from '../views';

async function getHomePage(c: Context) {
  return c.render(<HomePage />);
}

export default { getHomePage };
