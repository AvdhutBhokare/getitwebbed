"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="text-4xl md:text-6xl font-headline font-bold text-foreground"
            >
              GetItWebbed
            </motion.h1>
          </div>
          
          <div className="w-64 h-[1px] bg-muted relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-primary"
            />
          </div>
          
          <div className="mt-4 font-code text-muted-foreground text-sm tabular-nums">
            {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
