import { Hono } from 'hono';
import { Context } from 'hono';
import { layout } from '../../middleware/layout';
import controllers from './controllers';

const app = new Hono();

app.use(layout({ isAuthenticated: false }));

app.get('/login', controllers.getAuthLoginPage);
app.get('/login/google', controllers.loginWithGoogle);
app.get('/callback', controllers.handleOAuthCallback);
app.post('/logout', controllers.logoutSession);
app.get('/error', controllers.getAuthErrorPage);

export default app;
