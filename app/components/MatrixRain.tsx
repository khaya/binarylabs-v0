'use client'

import { useEffect, useRef } from 'react'

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const fontSize = 10
    const chars = '01'

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
    }

    resize()

    function getColumnCount(): number {
      const total = Math.floor(canvas!.width / fontSize)
      if (window.innerWidth < 768) {
        return Math.floor(total * 0.4)
      }
      return total
    }

    let columnCount = getColumnCount()
    let drops: number[] = []
    let speeds: number[] = []

    function initDrops() {
      columnCount = getColumnCount()
      drops = new Array(columnCount)
      speeds = new Array(columnCount)
      for (let i = 0; i < columnCount; i++) {
        drops[i] = Math.random() * -100
        speeds[i] = 0.5 + Math.random() * 1.5
      }
    }

    initDrops()

    function handleResize() {
      resize()
      initDrops()
    }

    function draw() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      ctx!.fillStyle = '#00ff9f'
      ctx!.font = '10px monospace'

      const spacing = canvas!.width / columnCount

      for (let i = 0; i < columnCount; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * spacing
        const y = drops[i] * fontSize

        if (y >= 0 && y < canvas!.height) {
          ctx!.fillText(char, x, y)
        }

        drops[i] += speeds[i]

        if (drops[i] * fontSize > canvas!.height) {
          if (Math.random() > 0.975) {
            drops[i] = 0
            speeds[i] = 0.5 + Math.random() * 1.5
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        animationId = requestAnimationFrame(draw)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.07,
      }}
    />
  )
}
