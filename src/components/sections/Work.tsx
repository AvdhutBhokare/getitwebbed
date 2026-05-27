"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

const projects = [
  {
    title: 'SmartHome Hub',
    category: 'IoT Dashboard',
    desc: 'Arduino + Firebase integration for real-time control.',
    image: 'https://picsum.photos/seed/12/800/1000',
    hint: 'iot dashboard'
  },
  {
    title: 'ShopEase',
    category: 'E-Commerce',
    desc: 'Scalable e-commerce engine built with Next.js.',
    image: 'https://picsum.photos/seed/15/800/1000',
    hint: 'online store'
  },
  {
    title: 'MediTrack',
    category: 'Mobile App',
    desc: 'Patient health tracking with Flutter & Firebase.',
    image: 'https://picsum.photos/seed/18/800/1000',
    hint: 'healthcare app'
  },
  {
    title: 'AgriSense',
    category: 'IoT Monitoring',
    desc: 'Remote sensor data visualization for smart farming.',
    image: 'https://picsum.photos/seed/21/800/1000',
    hint: 'smart agriculture'
  }
]

export const Work = () => {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-16 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">04 /</span> <span>Featured Work</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight max-w-2xl">
            Projects that speak for themselves.
          </h2>
          <Link href="/work" className="text-primary font-bold uppercase tracking-widest flex items-center gap-2 group mb-4">
            View All Work <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint={project.hint}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="w-20 h-20 bg-primary text-background rounded-full flex items-center justify-center font-bold uppercase tracking-tighter text-xs scale-50 group-hover:scale-100 transition-transform duration-500">
                    View
                  </span>
                </div>
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-1 rounded-full bg-background/50 backdrop-blur-md text-xs font-bold uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform group-hover:text-background" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
