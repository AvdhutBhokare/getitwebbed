"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-headline font-bold mb-6"
          >
            We are GetItWebbed<span className="text-primary">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            A digital innovation studio based in India, dedicated to pushing the boundaries of what's possible on the web and beyond.
          </motion.p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden"
          >
            <Image
              src="https://picsum.photos/seed/agency/1000/1000"
              alt="Our Workspace"
              fill
              className="object-cover"
              data-ai-hint="tech office"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Driven by Innovation, Defined by Impact.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We started with a simple belief: that technology should be a multiplier for business growth, not a bottleneck. Our team of designers and engineers work in tight feedback loops to ensure that every pixel and every line of code serves a strategic purpose.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-primary font-bold mb-2">Philosophy</h4>
                <p className="text-sm text-muted-foreground">Minimalism in design, complexity in engineering.</p>
              </div>
              <div>
                <h4 className="text-secondary font-bold mb-2">Goal</h4>
                <p className="text-sm text-muted-foreground">To become India's leading studio for high-performance digital products.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="py-24 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <h2 className="text-4xl font-headline font-bold">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl">
              {[
                { title: 'Transparency', desc: 'No hidden costs, no jargon. We communicate clearly at every stage of the project.' },
                { title: 'Quality First', desc: 'We never compromise on the stability and performance of the applications we build.' },
                { title: 'User Centric', desc: 'We build for humans. Every interface is designed with the end-user in mind.' },
                { title: 'Agile Mindset', desc: 'Speed matters. We iterate fast and ship often to keep you ahead of the curve.' },
              ].map((val, i) => (
                <div key={i}>
                  <h4 className="text-xl font-bold mb-3 font-headline">{val.title}</h4>
                  <p className="text-muted-foreground">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
