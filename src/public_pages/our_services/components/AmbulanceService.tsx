import image from 'assets/images/service/ambulance.png';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import PageContainer from 'global_shared/components/PageContainer';
import { useEffect } from 'react';

function AmbulanceService() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={MyTransition.StaggerChildren.VeryFast}
      className="group cursor-pointer"
    >
      <PageContainer>
        <div className="text-left md:text-justify lg:text-justify">
          <div className="content bg-surface px-4 py-4 shadow-sm md:py-10 md:px-10 lg:py-20 lg:px-20">
            <motion.div
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="float-left w-full lg:w-2/5"
            >
              <img src={image} className="w-full pb-5 lg:pr-6" alt="" />
            </motion.div>

            <motion.h2
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="p-1 text-lg font-bold md:text-2xl lg:text-3xl"
            >
              Ambulance Service
            </motion.h2>
            <div className="mt-3 p-1 text-justify">
              <motion.p
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
              >
                Divine Mercy Hospital provides ambulance services with
                highly-skilled operational staff who will treat our patients
                with care. For further information, do contact with us.
              </motion.p>

              <motion.h4
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-3 text-lg font-semibold md:text-2xl"
              >
                Features
              </motion.h4>

              <ul className="mt-2 list-disc">
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  24/7 hrs. and comparatively low-cost service.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Safe, comfortable, and experienced service.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Oxygen on board.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Portable power and climate-controlled storage.
                </motion.li>
              </ul>

              {/* <motion.h4
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-3 text-2xl font-semibold lg:mt-28"
              >
                Service Charge
              </motion.h4> */}

              {/* <ul className="mt-2 list-disc">
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Inside Dhaka city: BDT 1,500/-.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Up-down: BDT (1500+1500) = 3,000/-.
                </motion.li>

                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Outside Dhaka: extra BDT 15/- per kilometer.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Waiting Charge: no charge for 1st hour, next hour BDT 100 per
                  hour.
                </motion.li>
              </ul> */}
            </div>
            <div className="mt-20 border-t">
              <ul>
                <motion.h2 className="mt-5 p-1 text-lg font-bold md:text-2xl">
                  Address
                </motion.h2>
                <li>Divine mercy hospital</li>
                {/* <li>173/1/A, East Tejturi Bazar,</li>
                <li>Tejgaon, Dhaka-1215.</li> */}
                <li>For Ambulance Call: +880 1719-778418.</li>
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </motion.div>
  );
}

export default AmbulanceService;
