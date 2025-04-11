import { execSync } from 'child_process';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

try {
  // 确保 dist 目录存在
  const distDir = join(process.cwd(), 'dist');
  if (!existsSync(distDir)) {
    await mkdir(distDir, { recursive: true });
  }

  // 构建 CSS
  execSync('npm run build:css', { stdio: 'inherit' });
  
  // 部署到 Cloudflare Workers，明确指定入口文件和资源目录
  execSync('npx wrangler deploy src/index.tsx --assets=./dist', { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
} 