import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/notifications', notificationController.getNotificationsController);

  return router;
}
