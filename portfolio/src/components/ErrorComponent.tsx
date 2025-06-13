import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, X, WifiOff, Server, AlertTriangle } from 'lucide-react';

interface ErrorComponentProps {
  message: string;
  onClose?: () => void;
  variant?: 'inline' | 'toast' | 'card' | 'fullscreen';
  className?: string;
  title?: string;
  icon?: 'default' | 'network' | 'server' | 'warning';
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  onClose,
  variant = 'card',
  className = '',
  title = 'Error Occurred',
  icon = 'default'
}) => {
  const getIcon = () => {
    const iconMap = {
      default: AlertCircle,
      network: WifiOff,
      server: Server,
      warning: AlertTriangle
    };
    return iconMap[icon];
  };

  const Icon = getIcon();

  // Fullscreen variant
  if (variant === 'fullscreen') {
    return (
      <motion.div
        className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center max-w-lg px-8">
          {/* Large Icon */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.6, 
              ease: "easeOut",
              type: "spring",
              stiffness: 200
            }}
          >
            <div className="w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center backdrop-blur-sm">
              <Icon className="w-12 h-12 text-red-400" />
            </div>
          </motion.div>

          {/* Error Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {message}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {onClose && (
              <motion.button
                onClick={onClose}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(34, 211, 238, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Try Again
              </motion.button>
            )}
            <motion.button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200 border border-slate-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reload Page
            </motion.button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-500/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-1 bg-red-400/40 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/20 rounded-full"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </motion.div>
    );
  }

  const baseClasses = "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg";
  
  const variants = {
    card: `${baseClasses} p-6 max-w-md mx-auto`,
    inline: `${baseClasses} p-4 w-full`,
    toast: `${baseClasses} p-4 max-w-sm shadow-lg fixed top-4 right-4 z-50`
  };

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      scale: variant === 'toast' ? 0.8 : 0.95,
      y: variant === 'toast' ? -20 : 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: variant === 'toast' ? -20 : 10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        delay: 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className={`${variants[variant]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex items-start gap-3">
        {/* Error Icon */}
        <motion.div
          variants={iconVariants}
          className="flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <Icon className="w-5 h-5 text-red-400" />
          </div>
        </motion.div>

        {/* Error Content */}
        <div className="flex-1 min-w-0">
          <motion.div variants={textVariants}>
            <h3 className="text-white font-medium text-sm mb-1">
              {title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {message}
            </p>
          </motion.div>
        </div>

        {/* Close Button */}
        {onClose && (
          <motion.button
            onClick={onClose}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <X className="w-3 h-3" />
          </motion.button>
        )}
      </div>

      {/* Accent Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-b-lg"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default ErrorComponent;