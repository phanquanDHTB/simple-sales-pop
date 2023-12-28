import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('settings');

/**
 *
 * @param {string} shopID
 * @return
 */
const getSettingsByShopId = async shopID => {
  const settings = await collection.where('shopId', '==', shopID).get();
  if (settings.empty) {
    return null;
  }
  return settings.docs[0].data();
};

const addShopSettings = async settings => {
  await collection.add(settings);
  return settings;
};

const changeShopSettings = async settings => {
  const {shopId} = settings;
  const oldSettings = await collection.doc(shopId);
  if (oldSettings) {
    await oldSettings.set(settings);
    return settings;
  }
  return null;
};

export {addShopSettings, changeShopSettings, getSettingsByShopId};
