import { Hero } from '@/components/sections/Hero'
import { TrustedBrands } from '@/components/sections/TrustedBrands'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Work } from '@/components/sections/Work'
import { Process } from '@/components/sections/Process'
import { Stack } from '@/components/sections/Stack'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustedBrands />
      <About />
      <Services />
      <Work />
      <Process />
      <Stack />
      <Testimonials />
      <CTA />
    </div>
  )
}
