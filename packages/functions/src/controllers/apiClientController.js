import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getNotificationByShopDomain} from '../repositories/notificationResitory';
import {getSettingsByShopId} from '../repositories/settingRepository';

const getNotifiApiClientController = async ctx => {
  try {
    const shopDomain = ctx.request.query;
    const {id} = await getShopByShopifyDomain(shopifyDomain);
    const [notifications, setting] = await Promise.all([
      getNotificationByShopDomain(shopDomain),
      getSettingsByShopId(id)
    ]);
    return (ctx.body = {
      data: {
        notifications,
        setting
      },
      message: 'ok'
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {getNotifiApiClientController};
