import { useEffect, useState } from 'react';

const useHeight = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleHeight = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleHeight);
    handleHeight();

    return () => window.removeEventListener('resize', handleHeight);
  }, []);

  return height / 10; // px to rem
};

export default useHeight;
