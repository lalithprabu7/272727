export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    page: 0.4,
  },
  ease: {
    default: [0.25, 0.46, 0.45, 0.94],
    smooth: [0.43, 0.13, 0.23, 0.96],
    bounce: [0.68, -0.55, 0.27, 1.55],
    spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: ANIMATION.duration.normal },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: ANIMATION.duration.page, ease: ANIMATION.ease.smooth },
};

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: ANIMATION.duration.page, ease: ANIMATION.ease.smooth },
};

export const slideLeft = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: ANIMATION.duration.page, ease: ANIMATION.ease.smooth },
};

export const slideRight = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: ANIMATION.duration.page, ease: ANIMATION.ease.smooth },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: ANIMATION.duration.normal, ease: ANIMATION.ease.smooth },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ANIMATION.ease.smooth } },
};

export const cardHover = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

export const buttonTap = {
  whileTap: { scale: 0.97 },
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(37, 99, 235, 0.4)",
      "0 0 0 10px rgba(37, 99, 235, 0)",
    ],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};
