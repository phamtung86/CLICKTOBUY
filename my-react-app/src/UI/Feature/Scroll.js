import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về vị trí đầu trang
  }, [pathname]); // Mỗi khi pathname thay đổi (route thay đổi)

  return null;
};

export default ScrollToTop;
