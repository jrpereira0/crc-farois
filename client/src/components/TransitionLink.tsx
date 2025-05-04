import React, { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeClass?: string;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({ 
  href, 
  children, 
  className = '',
  activeClass = ''
}) => {
  const [location, navigate] = useLocation();
  // Efeito de hover para links
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={hoverVariants}
      className="inline-block"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={className}>
        {children}
      </div>
    </motion.div>
  );
};

export default TransitionLink;