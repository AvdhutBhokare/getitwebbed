"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = '#00FFB244'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particles = []
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle())
      }
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacity = 1 - distance / 20000
            ctx.strokeStyle = `rgba(123, 97, 255, ${opacity * 0.2})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
      }
      connect()
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-block py-1 px-4 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium tracking-widest uppercase">
              Web · Apps · IoT
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[120px] leading-[0.9] font-headline font-bold mb-10 tracking-tighter">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
              className="block"
            >
              WE BUILD
            </motion.span>
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
              className="block text-outline text-primary/80"
            >
              DIGITAL
            </motion.span>
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
              className="block"
            >
              EXPERIENCES.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 font-medium"
          >
            Built for impact, designed for scale. We help brands navigate the digital landscape with precision engineering and creative flair.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button asChild size="lg" className="h-14 px-10 rounded-full bg-primary text-background hover:bg-primary/90 text-lg font-bold group">
              <Link href="/work">
                View Our Work <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-14 px-10 rounded-full text-foreground hover:bg-muted text-lg border border-border">
              <Link href="/enquiry">Get a Quote</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 text-xs uppercase tracking-widest font-bold"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
