const paginate = (items, pageNumber, maxItemsPerPage) => {
  const startIndex = (pageNumber - 1) * maxItemsPerPage;
  return items && items.slice(startIndex, startIndex + maxItemsPerPage);
};

export default paginate;
