"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/motion";

export default function Template({ children }) {
  return (
    <motion.div initial="hidden" animate="show" variants={fadeUp}>
      {children}
    </motion.div>
  );
}
