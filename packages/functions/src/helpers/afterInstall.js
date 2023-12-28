import {getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {addShopSettings} from '../repositories/settingRepository';
import {defaultSettings} from '../../lib/const/app';

const afterInstall = async ctx => {
  try {
    const shopId = ctx.state.user.shopID;
    const {accessToken, shopifyDomain} = await getShopByShopifyDomain(
      ctx.state.user.shop.shopifyDomain
    );
    const shopify = new Shopify({shopName: shopifyDomain, accessToken});
    const order = await shopify.order.list({limit: 30});
    console.log(order, 'dddddd');
    await addShopSettings({...defaultSettings, shopId});
  } catch (err) {
    console.log('errrrrrr', err);
    return (ctx.body = {
      message: err.message
    });
  }
};

export default afterInstall;
