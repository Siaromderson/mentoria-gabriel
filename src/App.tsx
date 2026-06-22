import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import BenefitsSection from '@/components/BenefitsSection'
import FocusSection from '@/components/FocusSection'
import ProjectsSection from '@/components/ProjectsSection'
import IntegrationsSection from '@/components/IntegrationsSection'
import PricingSection from '@/components/PricingSection'
import GroupMentorshipSection from '@/components/GroupMentorshipSection'
import FAQSection from '@/components/FAQSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <FocusSection />
        <ProjectsSection />
        <IntegrationsSection />
        <PricingSection />
        <GroupMentorshipSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}

export default App
