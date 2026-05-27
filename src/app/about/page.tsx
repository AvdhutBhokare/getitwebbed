
"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Linkedin, Github } from 'lucide-react'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const founders = [
  {
    name: "Manas Garge",
    role: "Co-Founder & Data Engineer",
    image: PlaceHolderImages.find(img => img.id === 'manas-founder')?.imageUrl || "https://picsum.photos/seed/manas/600/800",
    hint: PlaceHolderImages.find(img => img.id === 'manas-founder')?.imageHint || "professional man",
    socials: {
      insta: "https://www.instagram.com/gridrunner22/",
      linkedin: "https://www.linkedin.com/in/manasgarge/",
      github: "https://github.com/ManasGarge22"
    }
  },
  {
    name: "Avdhut Bhokare",
    role: "Co-Founder & Developer",
    image: PlaceHolderImages.find(img => img.id === 'avdhut-founder')?.imageUrl || "https://picsum.photos/seed/avdhut/600/800",
    hint: PlaceHolderImages.find(img => img.id === 'avdhut-founder')?.imageHint || "professional man",
    socials: {
      insta: "https://www.instagram.com/adventure._.vlogs_/",
      linkedin: "https://www.linkedin.com/in/avdhut-bhokare-9a33a0215",
      github: "https://github.com/AvdhutBhokare"
    }
  }
]

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
            A digital innovation studio based in Pune, India, founded in 2025 to push the boundaries of technology.
          </motion.p>
        </header>

        {/* Founders Section */}
        <section className="py-24 border-t border-border mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">Meet the Founders</h2>
            <p className="text-muted-foreground">The visionaries behind GetItWebbed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 border border-border">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={founder.hint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
                <div className="text-center space-y-4">
                  <div>
                    <h3 className="text-2xl font-headline font-bold">{founder.name}</h3>
                    <p className="text-primary font-code text-sm uppercase tracking-widest">{founder.role}</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-background transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={founder.socials.insta} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-background transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href={founder.socials.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-background transition-all">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Innovation Section */}
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
