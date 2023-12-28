import App from 'koa';
import createErrorHandler from '@functions/middleware/errorHandler';
import * as errorService from '@functions/services/errorService';
import apiRouter from '@functions/routes/api';
import render from 'koa-ejs';
import path from 'path';
import {verifyRequest} from '@avada/shopify-auth';
import settingApiRouter from '@functions/routes/settingRoutes.js';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
api.use(createErrorHandler());
api.use(verifyRequest());

const router = apiRouter();
const settingRouter = settingApiRouter();
// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());
api.use(settingRouter.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
