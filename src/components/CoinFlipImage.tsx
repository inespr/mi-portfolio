import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import profileImage from '../assets/profile.jpg';
import logo from '../assets/logo1.png';

const CoinFlipImage = () => {
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const controls = useAnimation();

  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    setDragDirection(null);

    if (Math.abs(velocity) > 300) {
      await controls.start({
        rotateY: [0, 360, 720, 1080, 1440],
        transition: {
          duration: 2,
          ease: "easeOut",
          times: [0, 0.2, 0.4, 0.6, 1]
        }
      });
    }
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setDragDirection('right');
    } else if (info.offset.x < -50) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  return (
    <div className="relative">
      <motion.div
        className="relative w-48 h-48"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={controls}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-accent-pink/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.img
          src={profileImage}
          alt="Inés Pernil"
          className="w-full h-full rounded-full object-cover border-4 border-accent-pink/20 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%"
          }}
        />
        <motion.img
          src={logo}
          alt="React Logo"
          className="w-full h-full rounded-full object-cover bg-primary-dark/80 dark:bg-transparent border-4 border-accent-pink/20 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateY(180deg)"
          }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="text-accent-pink text-sm font-medium bg-transparent px-4 py-2 rounded-full shadow-lg"
          animate={{
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {dragDirection === 'left' ? '¡Suelta para girar!' :
            dragDirection === 'right' ? '¡Suelta para girar!' :
              '← Arrastra para girar →'}
        </motion.div>
      </motion.div>
      {dragDirection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-accent-pink/50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default CoinFlipImage; 