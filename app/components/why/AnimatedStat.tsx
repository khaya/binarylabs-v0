'use client'

import { motion } from 'motion/react'

export default function AnimatedStat({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-bold text-glow mb-2">{value}</p>
      <p className="text-muted text-sm">{label}</p>
    </motion.div>
  )
}
