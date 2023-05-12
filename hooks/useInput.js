import { useState, useCallback } from 'react';

const useInput = () => {
  const [inputValue, setInputValue] = useState('');

  const storeValueHandler = e => {
    setInputValue(e.target.value);
  };

  const removeValueHandler = useCallback(() => {
    setInputValue('');
  }, []);

  return { inputValue, storeValueHandler, removeValueHandler };
};

export default useInput;
