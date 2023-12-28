import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('notifications');

const sync30Order = async (orders, shopId) => {
  await Promise.all(orders.map(order => collection.add({...order, shopId})));
};

export {sync30Order};
