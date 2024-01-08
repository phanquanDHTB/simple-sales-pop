import App from 'koa';
import clienApiRoutes from '../routes/clientApiRoutes';
import cors from '@koa/cors';

const app = new App();
app.proxy = true;

app.use(cors());
app.use(clienApiRoutes.allowedMethods());
app.use(clienApiRoutes.routes());

export default app;
