import Router from 'koa-router';
import {getNotificationsAndSettings} from '../controllers/clientApiController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', getNotificationsAndSettings);

export default router;
