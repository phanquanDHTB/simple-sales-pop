import App from 'koa';
import webhookRoutes from '../routes/webhook';

const app = new App();
app.proxy = true;

app.use(webhookRoutes.allowedMethods());
app.use(webhookRoutes.routes());

export default app;
