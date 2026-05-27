"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const CTA = () => {
  return (
    <section className="py-20 bg-background px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative rounded-[4rem] overflow-hidden bg-[#0F0F0F] p-12 md:p-24 border border-primary/20 text-center"
      >
        {/* Animated Background Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full z-0" />
        
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-headline font-bold mb-8 leading-tight">
            Ready to build <br className="hidden md:block" /> 
            something <span className="text-primary">great?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let's talk about your project. No commitment — just a conversation about how we can help you scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-primary text-background hover:bg-primary/90 text-lg font-bold group w-full sm:w-auto">
              <Link href="/enquiry">
                Start a Project <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-full text-foreground hover:bg-muted text-lg border-border w-full sm:w-auto">
              <Link href="/work">View Our Work</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
