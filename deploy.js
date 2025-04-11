import { execSync } from 'child_process';

try {
  // 构建 CSS
  execSync('npm run build:css', { stdio: 'inherit' });
  
  // 部署到 Cloudflare Workers
  execSync('npx wrangler deploy', { stdio: 'inherit' });
  
  console.log('Deployment completed successfully!');
} catch (error) {
  console.error('Deployment failed:', error);
  process.exit(1);
} 