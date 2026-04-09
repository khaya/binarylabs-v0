import SectionWrapper from '@/app/components/ui/SectionWrapper'
import ServiceCard from '@/app/components/services/ServiceCard'

const services = [
  {
    title: 'Agentic AI Workflows Architecture',
    description:
      'Design and deploy production-ready autonomous AI agent systems that execute complex business processes end-to-end.',
  },
  {
    title: 'Multi-Agent Systems Design',
    description:
      'Orchestrate multiple specialised AI agents that collaborate, delegate, and self-coordinate to solve enterprise challenges.',
  },
  {
    title: 'Cloud-Native AI Platforms',
    description:
      'Build scalable AI infrastructure on AWS, Azure, and GCP with cloud-native patterns and best practices.',
  },
  {
    title: 'Autonomous Agents + Tool Use',
    description:
      'Equip AI agents with tool use, memory systems, and reasoning capabilities for reliable autonomous operation.',
  },
  {
    title: 'AI Workflow Observability',
    description:
      'Full-stack monitoring, tracing, and governance for AI agent pipelines in production environments.',
  },
  {
    title: 'Legacy System Transformation',
    description:
      'Transform legacy systems into modern agentic architectures with minimal disruption and maximum ROI.',
  },
]

export default function ServicesSection() {
  return (
    <SectionWrapper id="services">
      <h2 className="text-xl md:text-2xl font-mono font-bold mb-12">
        <span className="text-green">{'>'}</span> ls ./services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            index={i}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
