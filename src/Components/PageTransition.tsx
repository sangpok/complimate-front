import { motion } from 'framer-motion';

type PageTransitionProp = {
  children?: React.ReactNode;
};

const PageTransition = ({ children }: PageTransitionProp) => {
  return (
    <motion.div
      variants={{
        fadeIn: { opacity: 1 },
        fadeOut: { opacity: 0 },
      }}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
