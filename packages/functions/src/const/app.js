export const apiPrefix = {
  embed: '/api',
  standalone: '/apiSa'
};

export const getApiPrefix = isEmbedApp => (isEmbedApp ? apiPrefix.embed : apiPrefix.standalone);

export const defaultSettings = {
  positions: 'bottom-left',
  hideTimeAgo: false,
  truncateProductName: true,
  displayDuration: 0,
  firstDelay: 0,
  popsInterval: 0,
  maxPopsDisplay: 0,
  includedUrls: '',
  excludedUrls: '',
  allowShow: 'all'
};
