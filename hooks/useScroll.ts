import { useEffect, useState } from 'react';

const useScroll = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const detectScrollY = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', detectScrollY);

    return () => window.removeEventListener('scroll', detectScrollY);
  }, []);

  return hasScrolled;
};

export default useScroll;
