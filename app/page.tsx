import Navbar from '@/app/components/navigation/Navbar'
import HeroSection from '@/app/components/hero/HeroSection'
import ServicesSection from '@/app/components/services/ServicesSection'
import WhySection from '@/app/components/why/WhySection'
import ApproachSection from '@/app/components/approach/ApproachSection'
import ContactSection from '@/app/components/contact/ContactSection'
import Footer from '@/app/components/footer/Footer'
import ScanlineOverlay from '@/app/components/ui/ScanlineOverlay'
import MatrixRainLoader from '@/app/components/MatrixRainLoader'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Binary Labs',
  description: 'Cloud & AI Agentic Workflows Consultancy',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Johannesburg',
    addressCountry: 'ZA',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <MatrixRainLoader />
      <ScanlineOverlay />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <ApproachSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
