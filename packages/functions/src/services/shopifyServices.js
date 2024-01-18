import Shopify from 'shopify-api-node';
import {sync30Order} from '../repositories/notificationRepository';

/**
 * @param {Object} options
 * @param {string} options.accessToken
 * @param {string} options.shopDomain
 * @param {string} options.src
 * @param {string} options.event
 */
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
  const scriptTagsCreated = (await shopify.scriptTag.list()).filter(
    scriptTagCreated => scriptTagCreated.event === event
  );
  if (scriptTagsCreated.length) {
    await shopify.scriptTag.delete(scriptTagsCreated[0].id);
  }
  await shopify.scriptTag.create({
    event,
    src
  });
};

/**
 * @param {Object} options
 * @param {string} options.topic
 * @param {string} options.shopDomain
 * @param {string} options.accessToken
 * @param {string} options.address
 */
export const registerWebhook = async ({
  topic = 'orders/create',
  accessToken = '',
  shopDomain = '',
  address = ''
}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken
  });
  const webhooksCreated = (await shopify.webhook.list()).filter(
    webhookCreated => webhookCreated.topic === topic
  );
  if (webhooksCreated.length) {
    await shopify.webhook.delete(webhooksCreated[0].id);
  }
  await shopify.webhook.create({
    topic,
    address,
    format: 'json'
  });
};

/**
 * @param {Object} options
 * @param {string} options.orderId
 * @param {string} options.shopDomain
 * @param {string} options.accessToken
 */
export const getOrderById = async ({shopDomain, accessToken, orderId}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken
  });
  const query = `query {
    order(id: "${orderId}") {
      createdAt
      shippingAddress {
        city
        country
        firstName
      }
      lineItems(first: 1) {
        edges {
          node {
            product {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  }`;
  const orderData = await shopify.graphql(query);
  const shippingAddress = orderData.order.shippingAddress;
  const productOrder = orderData.order.lineItems.edges[0].node.product;
  return {
    firstName: shippingAddress.firstName,
    city: shippingAddress.city,
    country: shippingAddress.country,
    productName: productOrder.title,
    productId: productOrder.id,
    timeStamp: orderData.order.createdAt,
    productImage: productOrder.images.edges[0].node.url
  };
};

/**
 * @param {Object} options
 * @param {string} options.shopId
 * @param {string} options.shopDomain
 * @param {string} options.accessToken
 */
export const syncOrderAfterInstall = async ({shopDomain, accessToken, shopId}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken: accessToken
  });

  const query = `query {
    orders(first: 30) {
      edges {
        node {
          billingAddress {
            firstName
            city
            country
          }
          lineItems(first: 1) {
            edges {
              node {
                id
                image {
                  url
                }
                name
              }
            }
          }
          createdAt
        }
      }
    }
  }`;

  const orders = await shopify.graphql(query);
  if (orders?.orders?.edges?.length) {
    const ordersAfterPick = orders.orders.edges.map(order => {
      const {node} = order;
      const billingAddress = node?.billingAddress;
      const product = node.lineItems.edges[0]?.node;
      return {
        firstName: billingAddress?.firstName,
        city: billingAddress?.city,
        productName: product?.name,
        country: billingAddress.country,
        productId: product?.id,
        timeStamp: node.createdAt,
        productImage: product?.image.url
      };
    });
    await sync30Order(
      ordersAfterPick?.map(order => {
        return {
          ...order,
          shopId,
          shopDomain: shopDomain
        };
      })
    );
  }

  return '';
};
