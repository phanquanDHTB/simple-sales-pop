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
  const webhookCreateds = (await shopify.webhook.list()).filter(
    webhookCreated => webhookCreated.topic === webhook
  );
  if (webhookCreateds.length) {
    await shopify.webhook.delete(webhookCreateds[0].id);
  }
  await shopify.webhook.create({
    topic: webhook,
    address,
    format: 'json'
  });
};
