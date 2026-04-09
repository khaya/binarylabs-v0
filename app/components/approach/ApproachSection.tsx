import SectionWrapper from '@/app/components/ui/SectionWrapper'
import ApproachTimeline from '@/app/components/approach/ApproachTimeline'

export default function ApproachSection() {
  return (
    <SectionWrapper id="approach">
      <h2 className="text-xl md:text-2xl font-mono font-bold mb-12">
        <span className="text-green">{'>'}</span> ./deploy --show-pipeline
      </h2>
      <div className="max-w-2xl mx-auto">
        <ApproachTimeline />
      </div>
    </SectionWrapper>
  )
}
