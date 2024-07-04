import about from 'assets/images/hero/about.png';
import board_members from 'assets/images/hero/board_members.png';
import career from 'assets/images/hero/career.png';
import contact from 'assets/images/hero/contact.png';
import credit_committee from 'assets/images/hero/credit_committee.png';
import deposit from 'assets/images/hero/deposit.png';
import faqs from 'assets/images/hero/faqs.png';
import home_banner from 'assets/images/hero/home_banner.jpg';
import loan from 'assets/images/hero/loan.png';
import notice from 'assets/images/hero/notice.png';
import office_bearers from 'assets/images/hero/office_bearers.png';
import project from 'assets/images/hero/project.png';
import service from 'assets/images/hero/service.png';
import white_logo from 'assets/images/logo/white_logo.png';
import { AnimatePresence, motion } from 'framer-motion';
import MyButton from 'global_shared/components/MyButton';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IUserBannerTitle {
  bannerImage?: string | null;
}

function UserBanner() {
  const [title, setTitle] = useState<IUserBannerTitle>({
    bannerImage: '',
  });
  const { authUser, clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;

  const location = useLocation();
  const navigate = useNavigate();
  const urlArrays = location.pathname.split('/');
  const urlArray1st = urlArrays?.[1]?.replace(/[_-]/g, ' ');
  const urlArrayDecode = decodeURIComponent(urlArrays?.[2]);
  const urlArray2nd = urlArrayDecode.replace(/[_-]/g, ' ');

  useEffect(() => {
    if (urlArrays[1] === 'info') {
      setTitle({
        bannerImage: about,
      });
    } else if (urlArrays[1] === 'accounts') {
      setTitle({
        bannerImage: board_members,
      });
    } else if (urlArrays[1] === 'loans') {
      setTitle({
        bannerImage: career,
      });
    } else if (urlArrays[1] === 'deposits') {
      setTitle({
        bannerImage: contact,
      });
    } else if (urlArrays[1] === 'transfer') {
      setTitle({
        bannerImage: credit_committee,
      });
    } else if (urlArrays[1] === 'Withdraw') {
      setTitle({
        bannerImage: deposit,
      });
    } else if (urlArrays[1] === 'payment') {
      setTitle({
        bannerImage: faqs,
      });
    } else if (urlArrays[1] === 'deposits') {
      setTitle({
        bannerImage: loan,
      });
    } else if (urlArrays[1] === 'JobCirculars') {
      setTitle({
        bannerImage: notice,
      });
    } else if (urlArrays[1] === 'Personnel') {
      setTitle({
        bannerImage: office_bearers,
      });
    } else if (urlArrays[1] === 'privacy') {
      setTitle({
        bannerImage: project,
      });
    } else if (urlArrays[1] === 'board_members') {
      setTitle({
        bannerImage: service,
      });
    } else {
      setTitle({
        bannerImage: home_banner,
      });
    }
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        <section className="mb-10 lg:mb-20">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 5 }}
            animate={{ opacity: 1 }}
            className="h-16 lg:h-56"
          >
            <div
              style={{ backgroundImage: `url(${title.bannerImage})` }}
              className="h-full bg-cover bg-center bg-no-repeat  "
            >
              <div className="flex h-full w-full items-center justify-between overflow-hidden bg-gray-900 bg-opacity-80 bg-fixed px-2 text-white  ">
                <div className="flex lg:px-14">
                  <img
                    className="my-3 h-10 md:h-12 lg:h-16"
                    src={white_logo}
                    alt="header logo"
                  />
                  <span className={'self-center pl-3 text-xl font-semibold'}>
                    Dhaka Credit
                  </span>
                </div>
                <div className=" pr-4">
                  <MyButton
                    onClick={() => {
                      clearAuthUserData();
                      navigate('/');
                      localStorage.setItem('isLogin', '');
                      document.title = 'icoopERP | Dhaka Credit';
                    }}
                    id="Logout"
                    type="button"
                    label="Logout"
                    styleClass="rounded bg-primary py-2 px-4 text-onPrimary "
                    name={''}
                  />
                </div>
              </div>
            </div>

            {urlArrays.length > 2 ? (
              <div className="hidden px-4 text-onPrimary md:px-12 lg:block">
                <div className="relative">
                  <div className="absolute left-0 -bottom-5">
                    <div className="flex uppercase">
                      <span className="cursor-not-allowed rounded-l-md bg-primaryVariant px-6 py-2 font-semibold ">
                        {urlArray1st === '' ? 'Home' : urlArray1st}
                      </span>

                      {urlArrays.length > 2 && (
                        <span className="cursor-not-allowed rounded-r-md bg-primary px-6 py-2">
                          {urlArray2nd}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </motion.div>
        </section>
      </AnimatePresence>
    </>
  );
}

export default UserBanner;
