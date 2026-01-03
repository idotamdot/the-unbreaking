// src/components/ScrollWrapper.jsx
import { motion } from 'framer-motion';
import './ScrollWrapper.css'; // Import the associated CSS

const ScrollWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
    className="scroll-wrapper"
  >
    {children}
  </motion.div>
);

export default ScrollWrapper;
