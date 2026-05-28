
"use client"

import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'

const LiquidProjectItem = ({ p, i }: { p: any, i: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const leftPos = useTransform(smoothX, [0, 1], ['0%', '100%'])
  const topPos = useTransform(smoothY, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - left) / width)
    mouseY.set((e.clientY - top) / height)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: i * 0.05 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-border bg-muted">
        <motion.div 
          className="w-full h-full relative"
          style={{
            filter: isHovered ? 'url(#liquid-distortion-work)' : 'none',
            scale: isHovered ? 1.08 : 1
          }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={p.imageUrl}
            alt={p.title}
            fill
            className="object-cover"
            data-ai-hint={p.imageHint || p.category}
          />
        </motion.div>
        
        {isHovered && (
          <motion.div
            className="absolute w-60 h-60 bg-primary/10 rounded-full blur-[60px] pointer-events-none z-10"
            style={{
              left: leftPos,
              top: topPos,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />
        )}
        
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
      </div>
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold font-headline group-hover:text-primary transition-colors">{p.title}</h3>
          <p className="text-sm text-muted-foreground font-code uppercase tracking-wider">{p.category}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkPage() {
  const db = useFirestore()
  const projectsQuery = React.useMemo(() => {
    if (!db) return null
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: projects, loading } = useCollection(projectsQuery)

  return (
    <div className="pt-32 pb-20">
      <svg className="hidden">
        <filter id="liquid-distortion-work">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.02;0.025;0.02" dur="4s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

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

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((p, i) => (
              <LiquidProjectItem key={p.id} p={p} i={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
