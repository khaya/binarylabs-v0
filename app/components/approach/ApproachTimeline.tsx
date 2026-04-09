'use client'

import { motion } from 'motion/react'

const steps = [
  {
    title: 'Discovery',
    description:
      'Deep-dive into your business processes, data flows, and automation opportunities.',
  },
  {
    title: 'Agent Design',
    description:
      'Architect specialised AI agents with clear roles, tools, and decision boundaries.',
  },
  {
    title: 'Orchestration',
    description:
      'Build the coordination layer — routing, delegation, and multi-agent collaboration.',
  },
  {
    title: 'Hardening',
    description:
      'Production hardening with guardrails, fallbacks, and comprehensive testing.',
  },
  {
    title: 'Monitoring',
    description:
      'Deploy observability, alerting, and continuous improvement pipelines.',
  },
]

export default function ApproachTimeline() {
  return (
    <div className="relative pl-8 md:pl-12">
      {/* Vertical line */}
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-green/20" />

      <div className="space-y-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative"
          >
            {/* Step number circle */}
            <div className="absolute -left-8 md:-left-12 w-6 h-6 md:w-10 md:h-10 rounded-full border border-green bg-background flex items-center justify-center">
              <span className="text-green text-xs md:text-sm font-mono font-bold">
                {i + 1}
              </span>
            </div>

            <div>
              <h3 className="text-foreground font-semibold font-mono text-base md:text-lg mb-1">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
