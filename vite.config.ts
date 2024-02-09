import build from '@hono/vite-cloudflare-pages';
import devServer from '@hono/vite-dev-server';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    viteCommonjs(), // required to make @supabase/supabase-js work
    build(),
    devServer({
      entry: 'src/index.tsx',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // custom path resolution
    },
  },
  server: {
    watch: { usePolling: true }, // for hot reload in WSL development environments
  },
});
