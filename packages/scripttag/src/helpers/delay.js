/**
 *
 * @param {number} second
 * @return {Promise}
 */
export const delay = second => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
};
