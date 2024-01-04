export const pickOrder = order => {
  const {node} = order;
  const billingAddress = node?.billingAddress;
  const product = node.lineItems.edges[0].node;
  return {
    firstName: billingAddress?.firstName,
    city: billingAddress.city,
    productName: product.name,
    country: billingAddress.country,
    productId: product.id,
    timeStamp: node.createdAt,
    productImage: product.image.url
  };
};
