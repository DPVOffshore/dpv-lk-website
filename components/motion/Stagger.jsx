"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Stagger({ as = "div", stagger = 0.12, delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(stagger, delay)}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Wrap each grid/list item with this inside a <Stagger> container — it
// inherits the "hidden"/"show" state from the parent automatically.
export function StaggerItem({ as = "div", variants = fadeUp, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={variants} {...rest}>
      {children}
    </Comp>
  );
}
