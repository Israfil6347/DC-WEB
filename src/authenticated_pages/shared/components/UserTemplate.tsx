import CardPage from 'authenticated_pages/info/financial_card/CardPage';
import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import MyButton from 'global_shared/components/MyButton';
import MyModal from 'global_shared/components/MyModal';
import MyDialogueView from 'global_shared/components/dialogues/MyDialogueView';
import { logoIcon } from 'global_shared/data/base64Icons';
import { Size } from 'global_shared/enum/Size';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import useCommand from 'global_shared/hooks/useCommand';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import FloatingScrollUp from 'partials/FloatingScrollUp';
import FloatingTransaction from 'partials/FloatingTransaction';
import Footer from 'partials/Footer';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserBanner from './UserBanner';

function UserTemplate() {
  const [scrollFromTop, setScrollFromTop] = useState(false);
  const { authUser } = useAuthUserAndMenu();
  const navigate = useNavigate();
  const [PageOpenDialog, setCardPageOpenDialog] = useState<boolean>(false);

  const {
    loading: myCardsResponseDataLoading,
    data: myCardsResponseData,
    setData: setMyCardsResponseData,
    executeCommand: myCardsRequestCommand,
  } = useCommand<CardModel[] | null>();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setScrollFromTop(true) : setScrollFromTop(false);
    });
    if (authUser === null) {
      navigate('/');
    }
  }, [authUser]);

  useEffect(() => {
    var personalCardInfoRequestModel = new BaseRequestModel(authUser);

    myCardsRequestCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V2/myCards',
      JSON.stringify(personalCardInfoRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <MyModal
        size={Size.Small}
        show={
          authUser?.RoleName.includes('MFS User') &&
          myCardsResponseData?.length === 0
            ? true
            : false
        }
        onClose={() => {
          setMyCardsResponseData(null);
        }}
      >
        <MyDialogueView
          dialogueHeader={
            <div className="header   bg-background p-6 text-2xl font-bold text-onSurface">
              <div className="flex items-center justify-center">
                <img src={logoIcon} alt="" width="60" height="60" />
              </div>
              {/* <div className="flex items-center justify-center">
                <p className="ml-2 antialiased">Remove Beneficiary</p>
              </div> */}
            </div>
          }
          dialogueFooter={
            <div className="flex items-center justify-center gap-4 bg-background p-4 ">
              <MyButton
                type="button"
                name="No"
                label="Close"
                styleClass="w-1/2 rounded border bg-primary p-2 font-semibold uppercase text-onPrimary disabled:bg-gray-400 md:w-1/2"
                onClick={() => {
                  setMyCardsResponseData(null);
                }}
                id="MyCardsResponseData"
              ></MyButton>
            </div>
          }
          onCancel={() => {
            // setConfirmRemoveBeneBeneficiary(false);
          }}
        >
          <CardPage />
        </MyDialogueView>
      </MyModal>

      <UserBanner />
      <div className="ml-8">
        <Outlet />
      </div>

      <Footer />
      <ToastContainer />
      {authUser && <FloatingTransaction />}

      {scrollFromTop && <FloatingScrollUp onClick={handleScrollUp} />}
    </>
  );
}

export default UserTemplate;
