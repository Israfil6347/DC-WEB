import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';

const AboutUs = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={MyTransition.StaggerChildren.VeryFast}
      className="content w-full bg-surface p-8 text-left text-onBackground shadow-sm md:p-14 md:text-justify lg:p-20 lg:text-justify"
    >
      <div>
        <motion.h4
          variants={MyVariants.SlideInFromRight}
          transition={MyTransition.Spring.Low}
          className="mb-4 text-xl font-semibold uppercase md:text-2xl"
        >
          History of Dhaka Credit
        </motion.h4>
        <div className="">
          <motion.p
            className="mb-4 text-justify "
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
          >
            An american missionary father, Charles J. Young CSC founded "The
            Christian Co-Operative Credit Union" on July 3rd, 1955, which is
            also famously known as ‘Dhaka Credit’. According to the 1940
            Co-Operative Act, "Dhaka Credit" was registered in 1958 with
            registration number “42/1958”. Dhaka Credit’s Head Office is located
            at Rev. Fr. Charles J. Young Bhaban, 173/1/A, East Tejturi Bazar,
            Tejgaon, Dhaka-1215. It is a trustworthy financial institution
            providing various services to the Christian community in Bangladesh.
          </motion.p>
          <motion.p
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
            className="mb-4 text-justify"
          >
            Dhaka Credit is committed to providing the best services to its
            Member with different schemes and activities to promote thrifts and
            Savings to upgrade the Members ’ standard of living. "Dhaka Credit"
            is the first & largest Dhaka Credit of its kind currently in
            Bangladesh. The operational area of "Dhaka Credit" includes Dhaka,
            Gazipur, Narayanganj & Munshiganj districts with over 45546 Members
            currently active in "Dhaka Credit". "Dhaka Credit" is currently
            providing various services through its 12 service centers and 23
            collection booths. As of october 2023, there is nearly 619
            professional staff along with part-time students currently employed
            in "Dhaka Credit".
          </motion.p>
          <motion.p
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
            className="mb-4 text-justify"
          >
            Dhaka Credit is providing around 86 products with the policies being
            constantly updated to make the products more Member friendly and
            provide maximum benefits to the Members . The construction of the
            ""Divine Mercy Hospital Ltd" at Kuchilabari in the district of
            Gazipur is under process and are looking to commence its operation
            in 2023. It is a 300-bed hospital situated in Gazipur, adjacent to
            dhaka city. The vast infrastructure having most of the health
            service departments will be completed by 2023 and will start its
            operation by the end of the year. This mega project will follow a
            medical college and a nursing college on the hospital’s vast campus.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
