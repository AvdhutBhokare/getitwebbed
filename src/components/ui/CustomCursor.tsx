"use client"

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHover = () => {
      const hoveredElement = document.querySelectorAll('a, button, [role="button"]')
      hoveredElement.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', moveCursor)
    checkHover()

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        scale: isHovering ? 2.5 : 1,
        opacity: 0.8,
      }}
    >
      <div className="absolute inset-0 bg-primary blur-[4px] rounded-full opacity-50" />
    </motion.div>
  )
}
