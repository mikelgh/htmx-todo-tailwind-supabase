import { Hono } from 'hono';
import { layout } from '../../middleware/layout';
import controllers from './controllers';

const app = new Hono();

app.use(layout({ isAuthenticated: false }));

app.get('/login', controllers.getAuthLoginPage);
app.post('/login', controllers.signInWithEmail);
app.get('/login/google', controllers.loginWithGoogle);
app.post('/sign-up', controllers.signUpWithEmail);
app.get('/sign-up', controllers.getAuthSignUpPage);
app.get('/callback', controllers.handleOAuthCallback);
app.post('/logout', controllers.logoutSession);
app.get('/error', controllers.getAuthErrorPage);

export default app;
