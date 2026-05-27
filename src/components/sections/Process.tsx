"use client"

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { step: '01', title: 'Discovery', desc: 'Deep dive into your vision, target audience, and business requirements.' },
  { step: '02', title: 'Design', desc: 'Crafting pixel-perfect UI/UX layouts and interactive high-fidelity prototypes.' },
  { step: '03', title: 'Development', desc: 'Writing clean, scalable code using the latest industry-standard technologies.' },
  { step: '04', title: 'Testing', desc: 'Rigorous performance checks, cross-device QA, and security audits.' },
  { step: '05', title: 'Launch', desc: 'Seamless deployment with ongoing maintenance and post-launch support.' },
]

export const Process = () => {
  return (
    <section className="py-32 bg-muted/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-24 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">05 /</span> <span>How We Work</span>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-[1px] bg-border z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="w-20 h-20 rounded-2xl bg-background border-2 border-border flex items-center justify-center text-2xl font-headline font-bold mb-8 group-hover:border-primary group-hover:text-primary transition-all duration-500 shadow-xl">
                  {step.step}
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                
                {/* Mobile Connector */}
                {i < steps.length - 1 && (
                  <div className="md:hidden mt-8 w-[1px] h-12 bg-border mx-auto" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
