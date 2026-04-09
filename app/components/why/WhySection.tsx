import SectionWrapper from '@/app/components/ui/SectionWrapper'
import AnimatedStat from '@/app/components/why/AnimatedStat'

const stats = [
  { value: 'Zero', label: 'Hallucinations in production' },
  { value: '40-60%', label: 'Faster agent deployment' },
  { value: 'Enterprise', label: 'Security & compliance' },
]

export default function WhySection() {
  return (
    <SectionWrapper id="why">
      <h2 className="text-xl md:text-2xl font-mono font-bold mb-12">
        <span className="text-green">{'>'}</span> cat ./why-binary-labs
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
        {stats.map((stat, i) => (
          <div key={stat.value} className="flex items-center">
            <AnimatedStat
              value={stat.value}
              label={stat.label}
              index={i}
            />
            {i < stats.length - 1 && (
              <span className="hidden md:block text-muted text-2xl mx-12">
                |
              </span>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
