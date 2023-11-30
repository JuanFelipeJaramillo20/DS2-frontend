import { useState } from 'react';

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const toggleToast = (state) => {
    setShowToast(state);
  };
  return {
    showToast,
    toggleToast
  };
};

export default useToast;