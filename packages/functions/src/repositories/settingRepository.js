import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('settings');

/**
 *
 * @param {string} shopId
 * @return {setting | null}
 */
const getSettingsByShopId = async shopId => {
  const settings = await collection.doc(shopId).get();
  if (settings.exists) {
    return settings.data();
  }
  return null;
};

/**
 *
 * @param {settings} settings
 * @return {settings | null}
 */
const addShopSettings = async settings => {
  const {shopId} = settings;
  const oldSettings = await collection.doc(shopId).get();
  if (oldSettings.exists) {
    return null;
  }
  await collection.add(settings);
  return settings;
};

/**
 *
 * @param {settings} settings
 * @return {settings | null}
 */
const changeShopSettings = async settings => {
  const {shopId} = settings;
  const oldSettings = await collection.doc(shopId).get();
  if (oldSettings.exists) {
    await collection.doc(shopId).set(settings);
    return settings;
  }
  return null;
};

export {addShopSettings, changeShopSettings, getSettingsByShopId};
