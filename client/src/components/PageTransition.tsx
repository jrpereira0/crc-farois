import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: ReactNode;
  location?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, location }) => {
  const [currentLocation] = useLocation();
  const currentPath = location || currentLocation;

  // Variantes de animação para as transições de página
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.98
    }
  };

  // Configurações de transição
  const pageTransition = {
    type: 'spring',
    stiffness: 250,
    damping: 25,
    duration: 0.3
  };

  // Efeito de sobrepor páginas
  const overlayVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 0.05,
      transition: {
        duration: 0.3,
        delay: 0.1
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Overlay opcional para efeito de transição */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`overlay-${currentPath}`}
          initial="initial"
          animate="in"
          exit="out"
          variants={overlayVariants}
          className="fixed inset-0 bg-primary z-0 pointer-events-none"
        />
      </AnimatePresence>

      {/* Conteúdo da página */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full h-full relative z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PageTransition;