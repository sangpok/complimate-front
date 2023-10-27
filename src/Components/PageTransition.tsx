import { AnimationDefinition, motion } from 'framer-motion';

type PageTransitionProp = {
  onAnimationComplete?: (definition: AnimationDefinition) => void;
  children?: React.ReactNode;
};

const PageTransition = ({ onAnimationComplete, children }: PageTransitionProp) => {
  return (
    <motion.div
      variants={{
        fadeIn: { opacity: 1 },
        fadeOut: { opacity: 0 },
      }}
      initial="fadeOut"
      animate="fadeIn"
      exit="fadeOut"
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
