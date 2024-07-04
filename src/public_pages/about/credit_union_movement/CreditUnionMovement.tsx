import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';

const CreditUnionMovement = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={MyTransition.StaggerChildren.VeryFast}
      className="content w-full bg-surface p-8 text-left text-onBackground shadow-sm md:p-14 md:text-justify lg:p-16 lg:text-justify"
    >
      <div className="text-onBackground">
        <motion.h4
          variants={MyVariants.SlideInFromRight}
          transition={MyTransition.Spring.Low}
          className="mb-4 text-lg font-semibold uppercase md:text-2xl"
        >
          Credit Union Movement
        </motion.h4>
        <div className="text-justify">
          <motion.p
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
            className="my-4"
          >
            Credit Union is a financial organization that is owned and
            controlled by its members. The Members of the Credit Union deposit
            money and get loans and other financial services. Credit Union is a
            member-owned financial cooperative, democratically controlled by its
            members and operated for the purpose of promoting thrift, providing
            credit at competitive rates and other financial services to its
            members. Worldwide, Credit Union systems are very significant in
            terms of total system assets and average organizational asset size,
            ranging from volunteer operations with a handful of Members to the
            organization with assets worth several billion US dollars and
            thousands of Members. Credit Unions operate alongside other mutual
            and cooperatives engaging in cooperative banking, such as building
            societies. Natural-person credit unions” (also called “retail credit
            unions” or “consumer credit unions”) serve individual people, as
            distinguished from “corporate credit unions,” which serve other
            Credit Union.
          </motion.p>

          <motion.div className="grid-col-1 mt-10 grid gap-4 ">
            <div className="">
              <div className="flex h-full items-start">
                <div className="">
                  <motion.h4
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className="mb-4 text-lg font-semibold md:text-2xl"
                  >
                    Vision
                  </motion.h4>
                  <motion.p
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                  >
                    A <strong>SMART</strong> and leading co-operative credit
                    union in Bangladesh and south asia to attain self-reliant,
                    healthy and dignified community.
                  </motion.p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex h-full items-start">
                <div className="">
                  <motion.h4
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className="mb-4 text-lg font-semibold md:text-2xl"
                  >
                    Mission
                  </motion.h4>
                  <motion.p
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                  >
                    Improving the standard of living of our Members by providing
                    affordable and competitive services to achieving.
                  </motion.p>

                  <ul className="flex list-disc flex-col gap-2">
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Financial viability
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Operational efficiency
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Competitive advantage position
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Member satisfaction
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Employee satisfaction
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Capacity building and job creation
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Members health and education
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Climate change
                    </motion.li>
                    <motion.li
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="mt-2 flex gap-2"
                    >
                      <i className="fa-regular fa-circle-check mt-1"></i>
                      Good co-operative governance
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex h-full items-start">
                <div className="">
                  <motion.h4
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className="mb-4 text-lg font-semibold md:text-2xl"
                  >
                    Belief
                  </motion.h4>
                  <motion.p
                    variants={MyVariants.SlideInFromRight}
                    transition={MyTransition.Spring.Low}
                    className="my-4 leading-relaxed"
                  >
                    All people should have access to affordable, reliable, and
                    sustainable financial services.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.h4
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
            className="mb-4 text-lg font-semibold md:text-2xl"
          >
            Core Values
          </motion.h4>

          <div className="-m-4 mt-2 flex flex-wrap">
            <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
              <div className="-mb-1 flex flex-col items-start space-y-2.5 text-center sm:items-start sm:text-left">
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Integrity.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Teamwork.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Excellence.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Community.
                </motion.li>
              </div>
            </div>
            <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
              <div className="-mb-1 flex flex-col items-start space-y-2.5 text-center sm:items-start sm:text-left">
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Honesty.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Respect.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Service.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Loyalty.
                </motion.li>
              </div>
            </div>
            <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
              <div className="-mb-1 flex flex-col items-start space-y-2.5 text-center sm:items-start sm:text-left">
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Professionalism.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Customers.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Trust.
                </motion.li>
                <motion.li
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className="mt-2 flex gap-2"
                >
                  <i className="fa-regular fa-circle-check mt-1"></i>
                  Innovation.
                </motion.li>
              </div>
            </div>
          </div>

          <div>
            <motion.h4
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="mt-6 mb-4 text-lg font-semibold md:text-2xl"
            >
              Number of Credit Union
            </motion.h4>
            <motion.p
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="my-4"
            >
              In cooperation with its Member organizations in nearly 118
              countries, the World Council champions the Dhaka Credit model
              worldwide to continue growing the international movement of 87,914
              Credit Unions in 118 countries that serve 393 million Members .
            </motion.p>
          </div>
          <div>
            <motion.h4
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="mb-4 text-lg font-semibold md:text-2xl"
            >
              Credit Union Structure (Internal)
            </motion.h4>
            <motion.p
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="my-4"
            >
              CU committee is to be formed by 5-15 supervisory Members who are
              elected by all Members and serve a term of 3 years, reelected
              supervisory Members may serve unlimited terms. The elected
              supervisory Members should call the supervisory meeting within a
              week after the general meeting to elect 1 supervisory Member as
              the chairman of this committee. The supervisory meeting should be
              called at least once a month to supervise the financial report and
              business implementation to make minutes with suggestions for the
              board of directors.
            </motion.p>
          </div>
          <div>
            <motion.h4
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="mb-4 text-lg font-semibold md:text-2xl"
            >
              Benefits of Credit Union
            </motion.h4>
            <motion.p
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="my-4"
            >
              With a bank, you are simply a customer. Banks are for-profit
              institutions and their goal is to make money for the stockholders
              of the company. A Dhaka Credit is a not-for-profit entity and its
              goal is passing through the profits to the Members . This comes in
              the form of added Member benefits such as low fees and low rates.
              credit unions offer many benefits over banks. Some of the reasons
              are stated below:
            </motion.p>

            <ul className="my-4 mb-8 space-y-4 text-left">
              <motion.li
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-2 flex gap-2"
              >
                <i className="fa-regular fa-circle-check mt-1"></i>
                With a Dhaka Credit , you are a Member or a stakeholder. with a
                bank, you are simply a customer. Banks are for-profit
                institutions and their goal is to make money for the
                stockholders of the company. A Dhaka Credit is a not-for-profit
                entity and its goal is passing through the profits to the
                Members . This comes in the form of added Member benefits such
                as low fees and low rates.
              </motion.li>
              <motion.li
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-2 flex gap-2"
              >
                <i className="fa-regular fa-circle-check mt-1"></i>
                It’s a misconstrued opinion that credit unions have limited
                branch and ATM locations. However, many credit unions belong to
                larger networks, such as Dhaka Credit service centers.
              </motion.li>
              <motion.li
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-2 flex gap-2"
              >
                <i className="fa-regular fa-circle-check mt-1"></i>
                Most credit unions offer credit cards just like a typical bank.
              </motion.li>
              <motion.li
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-2 flex gap-2"
              >
                <i className="fa-regular fa-circle-check mt-1"></i>
                Credit unions have many available ATMs, but they are also fee
                free! The average fee for an ATM is $2.33 and is on the rise.
                Now if you use your bank-issued ATM card at a third-party ATM,
                then you just doubled your fees.
              </motion.li>
              <motion.li
                variants={MyVariants.SlideInFromRight}
                transition={MyTransition.Spring.Low}
                className="mt-2 flex gap-2"
              >
                <i className="fa-regular fa-circle-check mt-1"></i>
                At the Dhaka Credit , a Member can enjoy credit cards, home
                equity loans, mortgages, auto loans, and personal loans at lower
                rates than the bank.
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreditUnionMovement;
