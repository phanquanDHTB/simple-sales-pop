import syncOrderafterInstall from '../services/syncOrderAfterInstall';

export async function exampleAction(ctx) {
  const order = await syncOrderafterInstall({
    accessToken: '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',
    shopifyDomain: 'avada-training-app.myshopify.com',
    shopId: ctx.state.user.shopID
  });
  return (ctx.body = {
    data: order
  });
}
