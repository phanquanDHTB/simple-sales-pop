import {getNotificationsByShopDomain} from '../repositories/notificationRepository';
import {getSettingsByShopDomain} from '../repositories/settingRepository';
import moment from 'moment';

const getNotificationsAndSettings = async ctx => {
  try {
    const {shopDomain} = ctx.request.query;
    const [notifications, settings] = await Promise.all([
      getNotificationsByShopDomain(shopDomain),
      getSettingsByShopDomain(shopDomain)
    ]);
    const notificationsAfterFormatDate = notifications?.map(notification => {
      const day = moment().diff(notification.timeStamp, 'days');
      let relativeDate;
      if (!notification.hideTimeAgo) {
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
      notifications: notificationsAfterFormatDate,
      settings
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {getNotificationsAndSettings};
