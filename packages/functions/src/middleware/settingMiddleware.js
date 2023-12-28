import * as yup from 'yup';

const settingMiddleware = async (ctx, next) => {
  try {
    const {settings} = ctx.req.body;
    const schema = yup.object({
      positions: yup.string().required(),
      hideTimeAgo: yup.boolean().required(),
      truncateProductName: yup.boolean().required(),
      displayDuration: yup.number().required(),
      firstDelay: yup.number().required(),
      popsInterval: yup.number().required(),
      maxPopsDisplay: yup.number().required(),
      includedUrls: yup.string().required(),
      excludedUrls: yup.string().required(),
      allowShow: yup.string().required()
    });
    await schema.validate(settings);
    await next();
  } catch (e) {
    ctx.status = 400;
    return (ctx.body = {
      message: e.message
    });
  }
};

export default settingMiddleware;
