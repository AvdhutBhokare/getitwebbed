"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul M.',
    role: 'Startup Founder, Pune',
    quote: "GetItWebbed turned our rough idea into a full product in 6 weeks. Outstanding team that understands both business and tech deeply.",
    stars: 5
  },
  {
    name: 'Priya S.',
    role: 'Operations Head, AgriTech Co.',
    quote: "Our IoT dashboard works flawlessly. They understood our hardware constraints and built a highly efficient cloud system for us.",
    stars: 5
  },
  {
    name: 'Amit K.',
    role: 'Product Manager, HealthTech',
    quote: "The mobile app they built for us has 500+ users and zero crashes since launch. Highly professional and responsive partners.",
    stars: 5
  }
]

export const Testimonials = () => {
  return (
    <section className="py-32 bg-muted/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-24 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">07 /</span> <span>They Trust Us</span>
        </div>

        <div className="px-12">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i}>
                  <Card className="bg-background border-border rounded-[3rem] p-12 overflow-hidden relative">
                    <Quote className="absolute top-10 right-10 w-24 h-24 text-primary/5 -rotate-12" />
                    <CardContent className="flex flex-col items-center text-center p-0">
                      <div className="flex gap-1 mb-8">
                        {[...Array(t.stars)].map((_, j) => (
                          <span key={j} className="text-primary text-2xl">★</span>
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-headline font-medium leading-relaxed mb-10 italic">
                        "{t.quote}"
                      </p>
                      <div>
                        <h4 className="text-xl font-bold font-headline">{t.name}</h4>
                        <p className="text-muted-foreground font-code text-sm uppercase tracking-widest">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
