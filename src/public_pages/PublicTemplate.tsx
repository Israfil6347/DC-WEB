import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import Banner from 'partials/Banner';
import FloatingCarrier from 'partials/FloatingCarrier';
import Footer from 'partials/Footer';
import Header from 'partials/Header';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function PublicTemplate() {
  const [scrollFromTop, setScrollFromTop] = useState(false);
  const { authUser, clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setScrollFromTop(true) : setScrollFromTop(false);
    });
    if (authUser) {
      clearAuthUserData();
    }
  }, []);

  return (
    <>
      <Header scroll={scrollFromTop} />
      <Banner />
      <Outlet />
      <Footer />
      <FloatingCarrier />
    </>
  );
}

export default PublicTemplate;
