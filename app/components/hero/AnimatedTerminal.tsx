'use client'

import { motion } from 'motion/react'
import TerminalWindow from '@/app/components/ui/TerminalWindow'

const lines = [
  { text: '> Initializing agent pipeline...', color: 'text-green' },
  { text: '> Agent: ResearchBot scanning data sources...', color: 'text-cyan' },
  { text: '> Agent: AnalystBot processing findings...', color: 'text-cyan' },
  { text: '> Orchestrator: Merging agent outputs...', color: 'text-green' },
  { text: '> ✓ Status: Workflow complete [OK]', color: 'text-green-bright' },
]

export default function AnimatedTerminal() {
  return (
    <TerminalWindow title="~/agent-pipeline">
      <div className="space-y-2">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`${line.color} text-xs md:text-sm font-mono`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.6, duration: 0.4 }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </TerminalWindow>
  )
}
