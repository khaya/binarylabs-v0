import TypewriterPrompt from '@/app/components/hero/TypewriterPrompt'
import AnimatedTerminal from '@/app/components/hero/AnimatedTerminal'
import CommandButton from '@/app/components/ui/CommandButton'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-4 py-20 md:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8">
          <TypewriterPrompt />
          <p className="text-muted text-base md:text-lg max-w-md leading-relaxed">
            Turning autonomous AI agents into reliable business infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CommandButton href="#contact" variant="primary">
              Start a Project
            </CommandButton>
            <CommandButton href="#contact" variant="secondary">
              Book Strategy Call
            </CommandButton>
          </div>
        </div>
        <div className="hidden lg:block">
          <AnimatedTerminal />
        </div>
      </div>
    </section>
  )
}
