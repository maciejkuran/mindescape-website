import { useState } from 'react';

const useModal = () => {
  const [activeModal, setActiveModal] = useState(false);

  const showModal = () => {
    setActiveModal(true);
  };

  const hideModal = () => {
    setActiveModal(false);
  };

  return { activeModal, showModal, hideModal };
};

export default useModal;
