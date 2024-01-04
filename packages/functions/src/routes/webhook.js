import Router from 'koa-router';
import {listenNewOrderController} from '../controllers/webhookController';

const router = new Router({
  prefix: '/webhook'
});

router.post('/order/new', listenNewOrderController);

export default router;
