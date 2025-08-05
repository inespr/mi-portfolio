import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <img
        src={logo}
        alt="Logo Inés Pernil"
        className="h-12 w-12 "
      />
    </motion.div>
  );
};

export default Logo;

 