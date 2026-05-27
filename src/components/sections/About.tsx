
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: '20+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3', label: 'Core Services' },
  { value: '3+', label: 'Years of Experience' },
]

export const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">01 /</span> <span>About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-headline font-bold leading-[1.1]">
              "We don't just code. <br />
              <span className="text-secondary">We craft digital futures.</span>"
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded in Pune in 2025, GetItWebbed is a collective of visionary developers and designers. We specialize in building robust web architectures, intuitive mobile applications, and intelligent IoT systems that bridge the gap between hardware and software.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our approach is rooted in transparency and performance. Every line of code is written with scalability in mind, ensuring your digital products grow alongside your business.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              className="text-center md:text-left border-l border-border pl-6"
            >
              <div className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-code uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
