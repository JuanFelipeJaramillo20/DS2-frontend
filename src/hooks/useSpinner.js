import { useState } from 'react';

const useSpinner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleSpinner = (state) => {
    setIsLoading(state);
  };

  return { isLoading, toggleSpinner };
};

export default useSpinner;