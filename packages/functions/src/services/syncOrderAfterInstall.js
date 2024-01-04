import Shopify from 'shopify-api-node';
import {sync30Order} from '../repositories/notificationResitory';
import {pickOrder} from '../helpers/utils/pickOrder';

const syncOrderafterInstall = async ({shopDomain, accessToken, shopId}) => {
  const shopify = new Shopify({
    shopName: shopDomain,
    accessToken: accessToken
  });
  const query = `{
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
  const orderAfterPick = orders?.orders?.edges?.map(pickOrder);
  await sync30Order(
    orderAfterPick?.map(order => {
      return {
        ...order,
        shopId,
        shopDomain: shopDomain
      };
    })
  );
  return '';
};

export default syncOrderafterInstall;
