
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Smartphone, Cpu, Palette, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: '01',
    title: 'End-to-End Brand Establishment',
    icon: Palette,
    items: ['End-to-End Branding', 'Visual Identity', 'Brand Guidelines', 'Logo Design', 'Digital Presence'],
    color: 'secondary'
  },
  {
    id: '02',
    title: 'Web Development',
    icon: Globe,
    items: ['Landing Pages', 'E-Commerce', 'SaaS Dashboards', 'CMS Integration', 'UI/UX Design'],
    color: 'primary'
  },
  {
    id: '03',
    title: 'App Development',
    icon: Smartphone,
    items: ['Android Apps', 'iOS Apps', 'Flutter / React Native', 'Backend APIs', 'College Projects'],
    color: 'secondary'
  },
  {
    id: '04',
    title: 'IoT Projects',
    icon: Cpu,
    items: ['Sensor Integration', 'Smart Home Systems', 'Industrial Automation', 'Arduino / Raspberry Pi', 'Cloud Dashboards'],
    color: 'primary'
  }
]

export const Services = () => {
  return (
    <section className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">03 /</span> <span>What We Do</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="mb-6 p-4 rounded-xl bg-muted w-fit group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                <service.icon className="w-6 h-6" />
              </div>

              <span className="block font-code text-xs text-muted-foreground mb-4 uppercase tracking-[0.2em]">
                Service {service.id}
              </span>
              
              <h3 className="text-xl font-headline font-bold mb-6 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <ul className="space-y-3 mb-8">
                {service.items.map((item, idx) => (
                  <li key={idx} className="text-muted-foreground text-xs flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/enquiry"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary group/link"
              >
                Get Started <ArrowRight className="ml-2 w-3 h-3 group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
