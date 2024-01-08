import Router from 'koa-router';
import {getClientApi} from '../controllers/clientApiController';

const router = new Router({
  prefix: '/clientApi'
});

router.get('/notifications', getClientApi);

export default router;
