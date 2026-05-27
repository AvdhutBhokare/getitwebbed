"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Enquiry', href: '/enquiry' },
]

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4',
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-xl md:text-2xl font-headline font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            GetItWebbed<span className="text-primary group-hover:text-foreground">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
          <Button asChild variant="outline" className="border-primary/50 hover:bg-primary hover:text-background transition-all rounded-full px-6">
            <Link href="/enquiry">Let's Talk</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] flex flex-col p-8"
          >
            <div className="flex items-center justify-between mb-16">
              <span className="text-2xl font-headline font-bold">GetItWebbed.</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-8 h-8 text-foreground" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-headline font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button asChild className="w-full h-14 text-lg bg-primary text-background hover:bg-primary/90 rounded-xl mt-8">
                  <Link href="/enquiry" onClick={() => setIsMobileMenuOpen(false)}>Let's Build Together</Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-auto flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">X / Twitter</a>
              <a href="#" className="hover:text-primary">Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
