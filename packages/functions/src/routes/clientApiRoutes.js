import Router from 'koa-router';
import {getNotifiApiClientController} from '../controllers/apiClientController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', getNotifiApiClientController);

export default router;
