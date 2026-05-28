
"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Slider } from '@/components/ui/slider'
import { Mail, Phone, MapPin, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { aiProjectScopeRecommendation, type ProjectScopeRecommendationOutput } from '@/ai/flows/ai-project-scope-recommendation'
import { toast } from '@/hooks/use-toast'
import { useFirestore } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.number().min(5000, 'Minimum budget is ₹5,000'),
  timeline: z.string().min(1, 'Please select a timeline'),
  description: z.string().min(20, 'Please describe your project in at least 20 characters'),
  source: z.string().min(1, 'Please let us know how you found us'),
})

type FormData = z.infer<typeof formSchema>

export default function EnquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false)
  const [aiResult, setAiResult] = useState<ProjectScopeRecommendationOutput | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const db = useFirestore()

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      projectType: 'new',
      budget: 15000,
      timeline: '',
      source: '',
    }
  })

  const projectDesc = watch('description')
  const budgetValue = watch('budget')

  const handleAiScope = async () => {
    if (!projectDesc || projectDesc.length < 20) {
      toast({
        variant: "destructive",
        title: "More details needed",
        description: "Please write a bit more about your project so the AI can analyze it."
      })
      return
    }

    setIsAiAnalyzing(true)
    try {
      const result = await aiProjectScopeRecommendation({ description: projectDesc })
      setAiResult(result)
      toast({
        title: "Analysis complete!",
        description: "AI has generated recommendations for your project."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Analysis failed",
        description: "Something went wrong while analyzing your project."
      })
    } finally {
      setIsAiAnalyzing(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!db) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'enquiries'), {
        ...data,
        createdAt: serverTimestamp()
      })
      setSubmitted(true)
    } catch (e) {
      toast({ variant: "destructive", title: "Error submitting form" })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-muted/20 rounded-[3rem] border border-primary/20 max-w-lg mx-auto"
        >
          <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-headline font-bold mb-4">Enquiry Received!</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
          </p>
          <Button onClick={() => window.location.href = '/'} className="bg-primary text-background rounded-full px-8">
            Back to Home
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <header className="mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-headline font-bold mb-6"
          >
            Build Your Brand<span className="text-primary">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Tell us about your project and we'll get back to you within 24 hours with a custom roadmap and quote.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">01. Full Name*</Label>
                  <Input {...register('fullName')} className="h-14 bg-muted border-none rounded-xl" placeholder="John Doe" />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">02. Email Address*</Label>
                  <Input {...register('email')} className="h-14 bg-muted border-none rounded-xl" placeholder="john@company.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">03. Phone Number</Label>
                  <Input {...register('phone')} className="h-14 bg-muted border-none rounded-xl" placeholder="+91 98670 43280" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">04. Company Name</Label>
                  <Input {...register('company')} className="h-14 bg-muted border-none rounded-xl" placeholder="Startup Inc." />
                </div>
              </div>

              <div className="space-y-6 p-8 bg-muted/20 rounded-3xl">
                <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">05. Services Required*</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['End-to-End Brand Establishment', 'Web Development', 'Mobile App Development', 'IoT Project', 'College Projects', 'UI/UX Design'].map((service) => (
                    <div key={service} className="flex items-center space-x-3">
                      <Checkbox
                        id={service}
                        checked={watch('services')?.includes(service)}
                        onCheckedChange={(checked) => {
                          const current = watch('services') || []
                          if (checked) setValue('services', [...current, service])
                          else setValue('services', current.filter(s => s !== service))
                        }}
                      />
                      <label htmlFor={service} className="text-sm font-medium leading-none cursor-pointer">{service}</label>
                    </div>
                  ))}
                </div>
                {errors.services && <p className="text-red-500 text-xs">{errors.services.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">06. Project Type*</Label>
                  <RadioGroup defaultValue="new" onValueChange={(v) => setValue('projectType', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="new" id="new" />
                      <Label htmlFor="new" className="text-sm">New Project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="revamp" id="revamp" />
                      <Label htmlFor="revamp" className="text-sm">Revamp</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="flex justify-between items-end">
                    <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">07. Budget Range*</Label>
                    <span className="text-primary font-bold text-lg">₹{budgetValue.toLocaleString()} {budgetValue >= 500000 ? '+' : ''}</span>
                  </div>
                  <Slider
                    defaultValue={[15000]}
                    max={500000}
                    min={5000}
                    step={1000}
                    onValueChange={(v) => setValue('budget', v[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                    <span>min ₹5,000</span>
                    <span>max ₹5,00,000+</span>
                  </div>
                  {errors.budget && <p className="text-red-500 text-xs">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">08. Timeline*</Label>
                  <Select onValueChange={(v) => setValue('timeline', v)}>
                    <SelectTrigger className="bg-muted border-none rounded-xl h-12">
                      <SelectValue placeholder="Select Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP (2 weeks)</SelectItem>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="flex">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">10. How did you hear about us?*</Label>
                  <Select onValueChange={(v) => setValue('source', v)}>
                    <SelectTrigger className="bg-muted border-none rounded-xl h-12">
                      <SelectValue placeholder="Select Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="search">Google Search</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="ref">Referral</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 relative">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">09. Project Description*</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleAiScope}
                    disabled={isAiAnalyzing}
                    className="text-primary hover:text-primary/80 flex items-center gap-2 font-bold"
                  >
                    {isAiAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    AI Scoping Recommendation
                  </Button>
                </div>
                <Textarea
                  {...register('description')}
                  className="min-h-[200px] bg-muted border-none rounded-2xl p-6"
                  placeholder="Tell us about your idea, goals, tech stack preferences..."
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}

                <AnimatePresence>
                  {aiResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-6 p-8 bg-primary/5 border border-primary/20 rounded-3xl"
                    >
                      <div className="flex items-center gap-2 mb-4 text-primary">
                        <Sparkles className="w-5 h-5" />
                        <h4 className="font-bold font-headline uppercase tracking-widest text-xs">AI Recommendation</h4>
                      </div>
                      <p className="text-sm text-foreground mb-6 leading-relaxed">{aiResult.summary}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="text-xs font-bold uppercase text-muted-foreground mb-3">Tech Stack</h5>
                          <div className="flex flex-wrap gap-2">
                            {aiResult.recommendedTechStack.map((tech, idx) => (
                              <span key={idx} className="px-2 py-1 rounded bg-background border border-border text-[10px] font-code">{tech}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase text-muted-foreground mb-3">Core Features</h5>
                          <ul className="space-y-1">
                            {aiResult.coreFeatures.map((feat, idx) => (
                              <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className="w-1 h-1 bg-primary rounded-full" /> {feat}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-6 text-xs" onClick={() => setAiResult(null)}>Dismiss AI Analysis</Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-16 text-lg font-bold bg-primary text-background hover:bg-primary/90 rounded-2xl mt-12">
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Enquiry →"}
              </Button>
            </form>
          </div>

          <aside className="space-y-12">
            <div className="p-8 bg-muted/20 rounded-[2.5rem] border border-border">
              <h3 className="text-2xl font-headline font-bold mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-xl border border-border text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">getitwebbed22@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-xl border border-border text-secondary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">+91 98670 43280</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-xl border border-border text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Location</p>
                    <p className="font-medium">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="w-full mt-10 bg-green-500 hover:bg-green-600 text-white rounded-xl h-12">
                <a href="https://wa.me/919867043280" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
