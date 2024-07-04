import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import PageContainer from 'global_shared/components/PageContainer';
import useAutoScrollUp from 'global_shared/hooks/useAutoScrollUp';

import MyModal from 'global_shared/components/MyModal';
import MyDialogueView from 'global_shared/components/dialogues/MyDialogueView';
import { Size } from 'global_shared/enum/Size';
import { useState } from 'react';
import { noticeimage } from './utlity/noticeimage';

// const NoticeItems: {
//   months: string;
//   data: string;
//   description: string;
//   link: string;
// }[] = [];

const NoticeItems = [
  {
    Date: '3-13-2024',
    Title: 'Health Care Scheme Policy Notice',
    image: `${noticeimage}`,
  },
  {
    Date: '3-14-2024',
    Title: 'Health Care Scheme Policy Notice',
    image: `${noticeimage}`,
  },
];

function Notice() {
  const [noticeItems, setNoticeItems] = useState({});
  const [OpenNoticeItemsDialog, setOpenNoticeItemsDialog] = useState(false);

  const setOpenDialogHandler = (NoticeItems: any) => {
    setNoticeItems(NoticeItems);
    setOpenNoticeItemsDialog(true);
  };
  useAutoScrollUp();
  return (
    <>
      <MyModal
        size={Size.Small}
        show={OpenNoticeItemsDialog}
        onClose={() => {
          setOpenNoticeItemsDialog(false);
          setNoticeItems({});
        }}
      >
        <MyDialogueView
          onCancel={() => {
            setOpenNoticeItemsDialog(false);
            setNoticeItems({});
          }}
        >
          <div
            className="content mt-5 bg-surface p-4 text-onSurface"
            // onClick={() => ()}
          >
            <img
              className="overflow-hidden rounded-full p-2 md:rounded-md"
              src={`data:image/png;base64,${NoticeItems?.[0]?.image}`}
              alt="user"
            />
          </div>
        </MyDialogueView>
      </MyModal>
      <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
      >
        <PageContainer>
          {/* {NoticeItems.length === 0 ? ( */}
          <div className="text-left md:text-justify lg:text-justify">
            <div className="content bg-surface px-4 py-4 shadow-sm md:px-10 md:py-10 lg:px-20 lg:py-20">
              <div className="animate-backInRight text-center">
                <motion.h1
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="text-xl font-extrabold md:text-5xl"
                >
                  No notices to show
                </motion.h1>
                <motion.p
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                >
                  Stay connected for getting updated notices.
                </motion.p>
              </div>
            </div>
          </div>
          {/* ) : ( */}
          {/* <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {NoticeItems.map((NoticeItems, index) => (
                <div
                  className="animate-fadeInLeft group flex items-center justify-center gap-2 rounded bg-surface p-6 shadow-sm hover:cursor-pointer hover:shadow-md"
                  onClick={() => setOpenDialogHandler(NoticeItems)}
                >
                  <span className="flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-full bg-primary p-2 text-center text-3xl font-extrabold text-onPrimary">
                    <i className="fa-solid fa-bullhorn"></i>
                  </span>
                  <div className="flex-grow ">
                    <h5 className="font-semibold">{NoticeItems.Title}</h5>
                    <h3>
                      Publish Date:
                      {moment(NoticeItems.Date).format('DD-MMM-YYYY')}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </PageContainer>
      </motion.div>
    </>
  );
}

export default Notice;
