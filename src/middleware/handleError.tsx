import { Context } from 'hono';
import ErrorPage from '../components/ErrorPage';

export default function handleError(err: Error, c: Context) {
  console.error(err);
  return c.render(<ErrorPage errorCode={500} errorMessage={err.message} />);
}
