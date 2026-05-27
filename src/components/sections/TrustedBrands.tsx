"use client"

import React from 'react'
import { motion } from 'framer-motion'

const brands = [
  'TechFlow', 'Zenith AI', 'Quantum Edge', 'Blue Horizon', 'Apex Systems', 'Nebula Corp', 'Swift Logic', 'Vanguard'
]

export const TrustedBrands = () => {
  return (
    <section className="py-20 bg-muted/5 border-b border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-center gap-4 text-muted-foreground font-code text-xs uppercase tracking-widest">
          <span className="text-primary font-bold">02 /</span> <span>Trusted By</span>
        </div>
      </div>

      <div className="flex overflow-hidden group select-none">
        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
          {[...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-2xl md:text-4xl font-headline font-bold text-muted-foreground/40 hover:text-primary transition-colors cursor-default">
                {brand}
              </span>
              <div className="w-2 h-2 rounded-full bg-primary/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
