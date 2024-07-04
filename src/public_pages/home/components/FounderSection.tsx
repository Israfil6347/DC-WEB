import founderImage from 'assets/images/founder/index_founder copy.png';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import { NavLink } from 'react-router-dom';

function FounderSection() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={MyTransition.StaggerChildren.Fast}
    >
      <section className="group mt-10 flex flex-col-reverse items-center gap-6 text-justify md:flex-row lg:text-left">
        <motion.div
          variants={MyVariants.SlideInFromRight}
          transition={MyTransition.Spring.Low}
          className="z-10  bg-surface p-6 text-onSurface shadow-sm hover:shadow-md md:w-3/5"
        >
          <NavLink
            id="founders-profile"
            to="about/founders-profile"
            className="group-hover:cursor-pointer"
          >
            <motion.h2 className="mb-2 p-1 text-2xl font-bold group-hover:cursor-pointer lg:text-3xl">
              Fr. Charles J. Young
            </motion.h2>
            <p className="mb-4 p-1 font-semibold group-hover:cursor-pointer">
              Founder of Dhaka Credit
            </p>
            <p className="mb-2 p-1 group-hover:cursor-pointer">
              Fr. Charles Joseph Young popularly known as Fr. Charles J. Young
              is pioneer of the Dhaka Credit movement in Bangladesh. The priest
              is the founder of "The Christian Co-operative Credit Union Ltd.
              Dhaka," the largest Credit Union in Bangladesh and also in South
              Asia. He was born in May 3, in 1904. Fr. Charles joined the
              seminary of the holy cross in September 1923, and joined in the
              first verse in 1925 and accepted his blessing in 1928. In 1929
            </p>
            <p className="mb-2 p-1  group-hover:underline">Read More</p>
          </NavLink>
        </motion.div>

        <motion.div
          variants={MyVariants.SlideInFromRight}
          transition={MyTransition.Spring.Low}
          className="lg:w-2/5"
        >
          <img src={founderImage} className="w-full" alt="" />
        </motion.div>
      </section>
    </motion.div>
  );
}

export default FounderSection;
