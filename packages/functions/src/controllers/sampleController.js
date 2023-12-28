import afterInstall from '../helpers/afterInstall';

export async function exampleAction(ctx) {
  await afterInstall(ctx);
}
