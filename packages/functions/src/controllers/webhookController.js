import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {createNotification} from '../repositories/notificationResitory';
import {getOrderById} from '../services/getOrderById';

const listenNewOrder = async ctx => {
  try {
    const orderId = ctx.req.body.admin_graphql_api_id;
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const {id, accessToken} = await getShopByShopifyDomain(shopifyDomain);
    const orderData = await getOrderById({shopDomain: shopifyDomain, accessToken, orderId});
    await createNotification({...orderData, shopId: id, shopDomain: shopifyDomain});
    ctx.body = {
      success: true
    };
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {listenNewOrder};
