import Router from 'koa-router';
import * as settingController from '@functions/controllers/settingController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/settings', settingController.getSettings);
  router.put('/settings', settingController.updateSettings);

  return router;
}
