import { Context } from 'hono';

function Error({ errorMessage }: { errorMessage: string }): JSX.Element {
  return (
    <>
      <div className="grid h-[50vh] px-4 bg-white place-content-center">
        <div className="text-center" hx-boost="true">
          <h1 className="font-black text-gray-200 text-9xl">500</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">{errorMessage}</p>

          <a
            href="/"
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
}

export default function handleError(err: Error, c: Context) {
  console.error(err);
  return c.render(<Error errorMessage={err.message} />);
}
