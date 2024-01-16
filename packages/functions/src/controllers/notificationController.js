import * as notificationRepository from '../repositories/notificationRepository';

const getNotifications = async ctx => {
  try {
    const shopId = ctx.state.user.shopID;
    const {sort} = ctx.request.query;
    const notifications = await notificationRepository.getNotificationsByShopId(shopId, sort);
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
