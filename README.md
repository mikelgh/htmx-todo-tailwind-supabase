# htmx-todo

This is a proof of concept for a tech stack utilizing htmx, Hono, and Cloudflare Workers.

## Usage

First, we have to make a copy `/wrangler.toml.example` and rename it to `wrangler.toml`. This is where your environment variables are stored and consumed by Cloudflare's Wrangler CLI.

```bash
git clone https://github.com/Luzefiru/htmx-todo.git
cd htmx-todo
bun i
bun run dev
```

## Notes

- I had to migrate to bun in order to automatically process `.env` variables into `process.env` for development.
- `wrangler pages dev` in the `preview` script does not work unless you're in a Linux environment.
