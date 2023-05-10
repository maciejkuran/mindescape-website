const formatUrlToTitle = url => {
  return url.trim().toLowerCase().replaceAll('-', ' ');
};

export default formatUrlToTitle;
