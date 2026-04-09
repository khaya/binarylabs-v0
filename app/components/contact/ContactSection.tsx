import SectionWrapper from '@/app/components/ui/SectionWrapper'
import ContactForm from '@/app/components/contact/ContactForm'

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <h2 className="text-xl md:text-2xl font-mono font-bold mb-4">
        <span className="text-green">{'>'}</span> ssh contact@binarylabs.cloud
      </h2>
      <p className="text-muted mb-12">
        Ready to deploy autonomous AI agents? Let&apos;s talk.
      </p>
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </SectionWrapper>
  )
}
