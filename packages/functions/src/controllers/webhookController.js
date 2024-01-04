import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {createNotification} from '../repositories/notificationResitory';

const listenNewOrderController = async ctx => {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const {id} = await getShopByShopifyDomain(shopifyDomain);

    const pickOrder = order => {
      const billing_address = order?.billing_address;
      return {
        firstName: billing_address?.first_name,
        city: billing_address.city,
        productName: order?.line_items?.map(item => item.name),
        country: billing_address.country,
        productId: order?.line_items?.map(item => item.product_id),
        timeStamp: order.created_at,
        productImage: order?.line_items?.map(item => item.product_id)
      };
    };

    await createNotification({...pickOrder(orderData), shopId: id, shopDomain: shopifyDomain});
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

export {listenNewOrderController};
