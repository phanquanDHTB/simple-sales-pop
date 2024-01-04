import {getNotifications} from '../repositories/notificationRepository';

const getNotificationsController = async ctx => {
  try {
    const shopId = ctx.state.user.shopID;
    const notifications = await getNotifications(shopId);
    return (ctx.body = {
      data: notifications,
      message: 'ok'
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {getNotificationsController};
