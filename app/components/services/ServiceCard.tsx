'use client'

import { motion } from 'motion/react'

export default function ServiceCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="terminal-border rounded-lg bg-surface overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(0,255,159,0.1)]"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-light/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="p-5">
        <h3 className="text-green font-mono font-semibold text-sm mb-2">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
