'use client'

import { useState, useEffect } from 'react'

const headline = 'We Build Production-Grade AI Agentic Workflows on Cloud'

export default function TypewriterPrompt() {
  const [displayedText, setDisplayedText] = useState('')

  const isComplete = displayedText.length >= headline.length

  useEffect(() => {
    if (displayedText.length < headline.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(headline.slice(0, displayedText.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [displayedText])

  return (
    <div>
      <p className="text-green text-sm mb-4 font-mono">
        binarylabs@cloud:~$
      </p>
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
        {displayedText}
        <span
          className={`inline-block w-3 h-8 ml-1 bg-green align-middle ${
            isComplete ? 'animate-blink' : ''
          }`}
        />
      </h1>
    </div>
  )
}
