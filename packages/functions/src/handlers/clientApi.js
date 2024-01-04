import App from 'koa';
import clienApiRoutes from '../routes/clientApiRoutes';

const app = new App();
app.proxy = true;

app.use(clienApiRoutes.allowedMethods());
app.use(clienApiRoutes.routes());

export default app;
