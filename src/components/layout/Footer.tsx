
import React from 'react'
import Link from 'next/link'
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-headline font-bold text-foreground mb-6 inline-block">
              GetItWebbed<span className="text-primary">.</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Building Digital. Delivering Impact. Premium creative agency specializing in Web, Apps, and IoT solutions for modern startups.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "https://www.instagram.com/gridrunner22/" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/manasgarge/" },
                { icon: Twitter, href: "#" },
                { icon: Github, href: "https://github.com/ManasGarge22" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 font-headline">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/work" className="text-muted-foreground hover:text-primary transition-colors">Our Work</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Team</Link></li>
              <li><Link href="/enquiry" className="text-muted-foreground hover:text-primary transition-colors">Get Enquiry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 font-headline">Contact Us</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>Pune, Maharashtra, India</li>
              <li>
                <a href="mailto:getitwebbed22@gmail.com" className="hover:text-primary transition-colors">
                  getitwebbed22@gmail.com
                </a>
              </li>
              <li>+91 98670 43280</li>
              <li>+91 70404 50513</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GetItWebbed. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-primary">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}
