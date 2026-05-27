"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const allProjects = [
  { id: 1, title: 'SmartHome Hub', cat: 'IoT', img: 'https://picsum.photos/seed/12/800/600', hint: 'iot smart home' },
  { id: 2, title: 'ShopEase Engine', cat: 'Web', img: 'https://picsum.photos/seed/15/800/600', hint: 'ecommerce website' },
  { id: 3, title: 'MediTrack', cat: 'App', img: 'https://picsum.photos/seed/18/800/600', hint: 'medical application' },
  { id: 4, title: 'AgriSense', cat: 'IoT', img: 'https://picsum.photos/seed/21/800/600', hint: 'agriculture sensors' },
  { id: 5, title: 'PortfolioFlow', cat: 'Web', img: 'https://picsum.photos/seed/24/800/600', hint: 'saas dashboard' },
  { id: 6, title: 'CryptoPulse', cat: 'App', img: 'https://picsum.photos/seed/27/800/600', hint: 'crypto wallet' },
]

export default function WorkPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-headline font-bold mb-6"
          >
            Our Work<span className="text-primary">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            A curated selection of digital products we've crafted for startups and enterprises worldwide.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-border">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={p.hint}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground font-code uppercase tracking-wider">{p.cat}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
