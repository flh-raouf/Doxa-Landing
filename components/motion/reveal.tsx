"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  duration = 0.72,
  once = true,
  amount = 0.2,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease,
    },
  },
};

export function StaggerGroup({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn(className)} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

type HoverLiftProps = HTMLMotionProps<"div"> & {
  y?: number;
  scale?: number;
};

export function HoverLift({
  children,
  className,
  y = -2,
  scale = 1.01,
  ...props
}: HoverLiftProps) {
  return (
    <motion.div
      className={cn("w-fit", className)}
      whileHover={{ y, scale }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.8 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
