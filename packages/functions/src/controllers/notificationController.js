import * as notificationRepository from '../repositories/notificationRepository';

const getNotifications = async ctx => {
  try {
    const shopId = ctx.state.user.shopID;
    const notifications = await notificationRepository.getNotifications(shopId);
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

export {getNotifications};
