import Shopify from 'shopify-api-node';

export const registerScripttag = async ({
  accessToken = '',
  shopDomain = '',
  src = 'https://localhost:3000/scripttag/avada-sale-pop.min.js',
  event = 'onload'
}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken
  });
  const scriptTagCreateds = (await shopify.scriptTag.list()).filter(
    scriptTagCreated => scriptTagCreated.event === event
  );
  if (scriptTagCreateds.length) {
    await shopify.scriptTag.delete(scriptTagCreateds[0].id);
  }
  await shopify.scriptTag.create({
    event,
    src
  });
};
