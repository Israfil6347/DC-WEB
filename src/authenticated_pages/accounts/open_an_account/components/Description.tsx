import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';

interface DescriptionProps {
  data:
    | {
        __html: string | TrustedHTML;
      }
    | undefined;
}

const Description: React.FC<DescriptionProps> = ({ data }) => {
  return (
    <motion.div
      variants={MyVariants.SlideInFromLeft}
      transition={MyTransition.Spring.Low}
    >
      <div className="prose rounded-md bg-surface px-4 pb-4  ">
        <div className="mt-6" dangerouslySetInnerHTML={data}></div>
      </div>
    </motion.div>
  );
};

export default Description;
