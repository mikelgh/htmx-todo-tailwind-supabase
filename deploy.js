import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  // 构建 CSS
  execSync('npm run build:css', { stdio: 'inherit' });
  
  // 部署到 Cloudflare Workers
  execSync('npx wrangler deploy src/index.tsx --assets dist --minify', { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
} 