import build from '@hono/vite-cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    build(),
    devServer({
      entry: 'src/index.tsx',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
