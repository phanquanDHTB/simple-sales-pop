import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();

const collection = firestore.collection('settings');

/**
 *
 * @param {string} shopId
 * @return {setting | null}
 */
const getSettingsByShopId = async shopId => {
  const settings = await collection.where('shopId', '==', shopId).get();
  if (!settings.empty) {
    return settings.docs[0].data();
  }
  return null;
};

/**
 *
 * @param {string} shopDomain
 * @return {setting | null}
 */
const getSettingsByShopDomain = async shopDomain => {
  const settings = await collection.where('shopDomain', '==', shopDomain).get();
  if (!settings.empty) {
    return settings.docs[0].data();
  }
  return null;
};

/**
 *
 * @param {settings} settings
 * @return {settings | null}
 */
const addSettings = async settings => {
  const {shopId} = settings;
  const oldSettings = await collection.where('shopId', '==', shopId).get();
  if (!oldSettings.empty) {
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
const updateSettings = async settings => {
  const {shopId} = settings;
  const oldSettings = await collection.where('shopId', '==', shopId).get();
  if (!oldSettings.empty) {
    await collection.doc(oldSettings.docs[0].id).set(settings);
    return settings;
  }
  return null;
};

export {addSettings, updateSettings, getSettingsByShopId, getSettingsByShopDomain};
