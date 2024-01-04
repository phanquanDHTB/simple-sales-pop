import Shopify from 'shopify-api-node';

export const registerWebhook = async ({
  webhook = 'orders/create',
  accessToken = '',
  shopDomain = '',
  address = ''
}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken
  });
  await shopify.webhook.create({
    topic: webhook,
    address,
    format: 'json'
  });
};
