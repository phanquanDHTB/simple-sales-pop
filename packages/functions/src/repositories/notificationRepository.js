import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

/**
 *
 * @param {orders} orders
 */
const sync30Order = async orders => {
  await Promise.all(orders.map(order => collection.add(order)));
};

/**
 *
 * @param {string} shopId
 * @return {[notifications] | []}
 */
const getNotificationsByShopId = async (shopId, sort) => {
  let db = collection;
  if (sort) {
    db = collection.orderBy('timeStamp', sort);
  }
  const notifications = await db.where('shopId', '==', shopId).get();
  if (notifications.empty) {
    return [];
  }
  return notifications.docs.map(notification => {
    return {...notification.data(), id: notification.id};
  });
};

/**
 *
 * @param {order} order
 */
const createNotification = async order => {
  await collection.add(order);
};

/**
 *
 * @param {string} shopDomain
 * @return {[notifications] | []}
 */
const getNotificationsByShopDomain = async shopDomain => {
  const notifications = await collection.where('shopDomain', '==', shopDomain).get();
  if (notifications.empty) {
    return [];
  }
  return notifications.docs.map(notification => {
    return {...notification.data(), id: notification.id};
  });
};

export {sync30Order, getNotificationsByShopId, createNotification, getNotificationsByShopDomain};
