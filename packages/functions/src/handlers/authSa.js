import App from 'koa';
import 'isomorphic-fetch';
import {getShopByShopifyDomain, shopifyAuth} from '@avada/shopify-auth';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import {addSettings} from '../repositories/settingRepository';
import {defaultSettings} from '../const/app';
import syncOrderafterInstall from '../services/syncOrderAfterInstall';
import {registerWebhook} from '../services/registerWebhook';
import {registerScripttag} from '../services/registerScripttag';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: false,
    prefix: '/authSa',
    afterInstall: async ctx => {
      const shopDomain = ctx?.state?.shopify?.shop;
      try {
        const {id, accessToken} = await getShopByShopifyDomain(shopDomain);
        await Promise.all([
          addSettings({...defaultSettings, shopId: id, shopDomain}),
          syncOrderafterInstall({
            accessToken,
            shopId: id,
            shopDomain
          }),
          registerWebhook({shopDomain, accessToken, address: ''}),
          registerScripttag({shopDomain, accessToken})
        ]);
      } catch (err) {
        console.log('xxx', err);
      }
    },
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
