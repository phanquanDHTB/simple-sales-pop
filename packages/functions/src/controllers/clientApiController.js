import {getNotificationsByShopDomain} from '../repositories/notificationResitory';
import {getSettingsByShopDomain} from '../repositories/settingRepository';

const getClientApi = async ctx => {
  try {
    const {shopDomain} = ctx.request.query;
    const [notifications, settings] = await Promise.all([
      getNotificationsByShopDomain(shopDomain),
      getSettingsByShopDomain(shopDomain)
    ]);
    const notificationsAfterFormat = notifications.map(notification => {
      const day = moment().diff(notification.timeStamp, 'days');
      let relativeDate;
      if (notification.hideTimeAgo) {
        relativeDate = day === 0 ? 'today' : day === 1 ? 'a day ago' : day + ' days ago';
      } else {
        relativeDate = '';
      }
      return {
        ...notification,
        timeStamp: relativeDate
      };
    });

    return (ctx.body = {
      notifications: notificationsAfterFormat,
      settings
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {getClientApi};
