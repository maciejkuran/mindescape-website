import { useState, useRef } from 'react';

const usePagination = items => {
  const [itemsToRender, setItemsToRender] = useState(items.slice(0, 4));
  const curPage = useRef(1);
  const maximumItems = 4;

  //get 2 items per each 'page';
  const getItems = () => {
    curPage.current += 1;

    console.log(curPage.current);

    const min = (curPage.current - 1) * maximumItems;
    const max = curPage.current * maximumItems;

    setItemsToRender(state => state.concat(items.slice(min, max)));
  };

  return { getItems, itemsToRender };
};

export default usePagination;
