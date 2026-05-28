
"use client"

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, limit } from 'firebase/firestore'

const LiquidProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    mouseX.set(x)
    mouseY.set(y)
  }

  const leftPos = useTransform(smoothX, [0, 1], ['0%', '100%'])
  const topPos = useTransform(smoothY, [0, 1], ['0%', '100%'])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-muted">
        <motion.div
          className="relative w-full h-full"
          style={{
            filter: isHovered ? 'url(#liquid-distortion)' : 'none',
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint || project.category}
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
          <span className="w-20 h-20 bg-primary text-background rounded-full flex items-center justify-center font-bold uppercase tracking-tighter text-xs scale-50 group-hover:scale-100 transition-transform duration-500">
            View
          </span>
        </div>

        <div className="absolute top-8 left-8 z-20">
          <span className="px-4 py-1 rounded-full bg-background/50 backdrop-blur-md text-xs font-bold uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        {isHovered && (
          <motion.div
            className="absolute w-40 h-40 bg-primary/20 rounded-full blur-[40px] pointer-events-none z-10"
            style={{
              left: leftPos,
              top: topPos,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-3xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
          <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform group-hover:text-background" />
        </div>
      </div>
    </motion.div>
  )
}

export const Work = () => {
  const db = useFirestore()
  const projectsQuery = React.useMemo(() => {
    if (!db) return null
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(4))
  }, [db])
  const { data: projects } = useCollection(projectsQuery)

  return (
    <section className="py-32 bg-background relative">
      <svg className="hidden">
        <filter id="liquid-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="5s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

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
          {projects?.map((project, i) => (
            <LiquidProjectCard key={project.id} project={project} index={i} />
          ))}
          {(!projects || projects.length === 0) && (
            <p className="text-muted-foreground">No projects added yet. Check back soon!</p>
          )}
        </div>
      </div>
    </section>
  )
}
