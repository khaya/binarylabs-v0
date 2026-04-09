'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Focus the close button and lock scroll when dialog opens; restore on close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      triggerRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Keyboard: Escape to close + focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return

    function getFocusable(): HTMLElement[] {
      if (!dialogRef.current) return []
      return Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable()
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen, closeMenu])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <a href="#hero" className="text-green font-mono font-bold text-lg text-glow">
          Binary Labs
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-green transition-colors text-sm font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={triggerRef}
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <span className="w-6 h-0.5 bg-green" />
          <span className="w-6 h-0.5 bg-green" />
          <span className="w-6 h-0.5 bg-green" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          ref={dialogRef}
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute top-4 right-4 text-green text-3xl p-2"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-green transition-colors text-2xl font-mono"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
