import React, { ReactNode } from 'react';
import { Link } from 'wouter';
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
  // Efeito de hover para links
  const hoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <Link href={href}>
      <motion.a
        initial="initial"
        whileHover="hover"
        variants={hoverVariants}
        className={className}
        href={href}
      >
        {children}
      </motion.a>
    </Link>
  );
};

export default TransitionLink;