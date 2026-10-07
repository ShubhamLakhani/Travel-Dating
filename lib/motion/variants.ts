// Triply Motion System Primitives & Variants
// Respects prefers-reduced-motion and provides unified timing

import { Variants } from "motion/react";

export const EASING_SMOOTH = [0.22, 1, 0.36, 1] as const;
export const EASING_SUBTLE = [0.16, 1, 0.3, 1] as const;

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING_SMOOTH,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: EASING_SMOOTH,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: EASING_SMOOTH,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const sectionRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASING_SMOOTH,
    },
  },
};

export const pathDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: EASING_SMOOTH },
      opacity: { duration: 0.3 },
    },
  },
};

export const softHoverMotion = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2, ease: EASING_SUBTLE },
  },
  whileTap: {
    y: 0,
    scale: 0.99,
  },
};

export const stepTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    x: 14,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: EASING_SMOOTH,
    },
  },
  exit: {
    opacity: 0,
    x: -14,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};
