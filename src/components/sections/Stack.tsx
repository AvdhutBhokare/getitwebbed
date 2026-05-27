import React from 'react'

const stack1 = [
  'React', 'Next.js', 'Flutter', 'Firebase', 'Node.js', 'MongoDB', 'TailwindCSS'
]

const stack2 = [
  'Arduino', 'Raspberry Pi', 'AWS', 'Figma', 'Python', 'TypeScript', 'PostgreSQL'
]

export const Stack = () => {
  return (
    <section className="py-32 bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex items-center gap-4 text-muted-foreground font-code text-sm">
          <span className="text-primary font-bold">06 /</span> <span>Our Stack</span>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex overflow-hidden group select-none">
          <div className="flex animate-marquee whitespace-nowrap gap-12 py-4">
            {[...stack1, ...stack1].map((tech, i) => (
              <span key={i} className="text-4xl md:text-7xl font-headline font-bold text-muted-foreground/30 hover:text-primary transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex overflow-hidden group select-none">
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-12 py-4">
            {[...stack2, ...stack2].map((tech, i) => (
              <span key={i} className="text-4xl md:text-7xl font-headline font-bold text-muted-foreground/30 hover:text-secondary transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
