'use client'

import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'

const projectTypes = [
  'Agentic AI Workflows',
  'Multi-Agent Systems',
  'Cloud-Native AI Platform',
  'Legacy Transformation',
  'Strategy Consultation',
  'Other',
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 font-mono text-sm"
      >
        <p className="text-green">&gt; Transmission sent successfully.</p>
        <p className="text-glow-strong">&gt; Status: RECEIVED [OK]</p>
        <p className="text-green">&gt; We&apos;ll be in touch within 24 hours.</p>
      </motion.div>
    )
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:border-green focus:ring-1 focus:ring-green/30 transition-colors placeholder:text-muted/50'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-green text-xs font-mono mb-2">
          &gt; name
        </label>
        <input
          type="text"
          required
          className={inputClass}
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-green text-xs font-mono mb-2">
          &gt; company
        </label>
        <input
          type="text"
          className={inputClass}
          placeholder="Company name"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-green text-xs font-mono mb-2">
          &gt; email
        </label>
        <input
          type="email"
          required
          className={inputClass}
          placeholder="you@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-green text-xs font-mono mb-2">
          &gt; project_type
        </label>
        <select
          required
          className={inputClass}
          value={formData.projectType}
          onChange={(e) =>
            setFormData({ ...formData, projectType: e.target.value })
          }
        >
          <option value="" disabled>
            Select project type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-green text-xs font-mono mb-2">
          &gt; message
        </label>
        <textarea
          required
          rows={4}
          className={inputClass}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green text-black font-mono font-semibold py-3 rounded-lg transition-all duration-200 hover:bg-green-bright shadow-[0_0_20px_rgba(0,255,159,0.3)] hover:shadow-[0_0_30px_rgba(0,255,159,0.5)]"
      >
        &gt; SEND_TRANSMISSION
      </button>
    </form>
  )
}
