import {changeShopSettings, getSettingsByShopId} from '../repositories/settingRepository';

const getSettingsController = async ctx => {
  try {
    const shopId = ctx.state.user.shopID;
    const settings = await getSettingsByShopId(shopId);
    if (settings) {
      return (ctx.body = {
        data: settings,
        message: 'ok'
      });
    }
    ctx.status = 400;
    return (ctx.body = {
      message: 'Shop id not found!'
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

const changeSettingsController = async ctx => {
  try {
    const {data} = ctx.req.body;
    const shopId = ctx.state.user.shopID;
    const newSetting = await changeShopSettings({...data, shopId});
    if (newSetting) {
      return (ctx.body = {
        data: newSetting,
        message: 'ok'
      });
    }
    ctx.status = 400;
    return (ctx.body = {
      message: 'Shop id not found!'
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
};

export {getSettingsController, changeSettingsController};
