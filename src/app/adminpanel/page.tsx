
"use client"

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useFirestore, useCollection } from '@/firebase'
import { collection, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Trash2, LogOut, LayoutDashboard, Briefcase, Award, Mail, Phone, Calendar as CalendarIcon, Wallet, MessageSquare, Users, UserPlus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { format } from 'date-fns'

export default function AdminPanel() {
  const { user, loading: userLoading } = useUser()
  const db = useFirestore()
  const router = useRouter()
  
  const [newBrand, setNewBrand] = useState('')
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    imageHint: ''
  })
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    imageUrl: '',
    imageHint: '',
    linkedin: '',
    instagram: '',
    github: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect logic
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login')
    }
  }, [user, userLoading, router])

  // Memoized Queries
  const brandsQuery = useMemo(() => {
    if (!db) return null
    return query(collection(db, 'brands'), orderBy('order', 'asc'))
  }, [db])
  const { data: brands, loading: brandsLoading } = useCollection(brandsQuery)

  const projectsQuery = useMemo(() => {
    if (!db) return null
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: projects, loading: projectsLoading } = useCollection(projectsQuery)

  const enquiriesQuery = useMemo(() => {
    if (!db) return null
    return query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: enquiries, loading: enquiriesLoading } = useCollection(enquiriesQuery)

  const membersQuery = useMemo(() => {
    if (!db) return null
    return query(collection(db, 'members'), orderBy('order', 'asc'))
  }, [db])
  const { data: members, loading: membersLoading } = useCollection(membersQuery)

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-code text-muted-foreground animate-pulse">Verifying Session...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !newBrand.trim()) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'brands'), {
        name: newBrand.trim(),
        order: (brands?.length || 0) + 1
      })
      setNewBrand('')
      toast({ title: "Brand added successfully" })
    } catch (e: any) {
      toast({ variant: "destructive", title: "Failed to add brand", description: e.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !newProject.title.trim()) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'projects'), {
        ...newProject,
        createdAt: serverTimestamp()
      })
      setNewProject({ title: '', category: '', description: '', imageUrl: '', imageHint: '' })
      toast({ title: "Project added successfully" })
    } catch (e: any) {
      toast({ variant: "destructive", title: "Failed to add project", description: e.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !newMember.name.trim()) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'members'), {
        ...newMember,
        order: (members?.length || 0) + 1,
        createdAt: serverTimestamp()
      })
      setNewMember({ name: '', role: '', imageUrl: '', imageHint: '', linkedin: '', instagram: '', github: '' })
      toast({ title: "Team member added successfully" })
    } catch (e: any) {
      toast({ variant: "destructive", title: "Failed to add member", description: e.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (coll: string, id: string) => {
    if (!db) return
    if (!confirm("Are you sure you want to delete this item?")) return
    
    try {
      await deleteDoc(doc(db, coll, id))
      toast({ title: "Item deleted" })
    } catch (e: any) {
      toast({ variant: "destructive", title: "Delete failed", description: e.message })
    }
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
            <LayoutDashboard className="text-primary w-8 h-8" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Logged in as {user.email}</p>
        </div>
        <Button variant="outline" className="text-muted-foreground hover:text-destructive border-border" onClick={() => router.push('/')}>
          <LogOut className="w-4 h-4 mr-2" /> Exit to Website
        </Button>
      </div>

      <Tabs defaultValue="enquiries" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full md:w-auto">
          <TabsTrigger value="enquiries" className="flex-1 md:flex-none rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Mail className="w-4 h-4 mr-2" /> Enquiries
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex-1 md:flex-none rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Briefcase className="w-4 h-4 mr-2" /> Projects
          </TabsTrigger>
          <TabsTrigger value="members" className="flex-1 md:flex-none rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Users className="w-4 h-4 mr-2" /> About Team
          </TabsTrigger>
          <TabsTrigger value="brands" className="flex-1 md:flex-none rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Award className="w-4 h-4 mr-2" /> Brands
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enquiries" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {enquiriesLoading ? (
              <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : enquiries?.length === 0 ? (
              <Card className="bg-muted/10 border-dashed border-border p-12 text-center">
                <p className="text-muted-foreground">No enquiries received yet.</p>
              </Card>
            ) : enquiries?.map(enq => (
              <Card key={enq.id} className="bg-muted/10 border-border overflow-hidden">
                <CardHeader className="flex flex-row items-start justify-between border-b border-border/50 bg-muted/5">
                  <div>
                    <CardTitle className="text-xl">{enq.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {enq.company ? `${enq.company} · ` : ''}
                      {enq.createdAt?.toDate ? format(enq.createdAt.toDate(), 'PPP p') : 'Recent'}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete('enquiries', enq.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <a href={`mailto:${enq.email}`} className="hover:text-primary transition-colors">{enq.email}</a>
                    </div>
                    {enq.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-secondary" />
                        <a href={`tel:${enq.phone}`} className="hover:text-secondary transition-colors">{enq.phone}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-sm">
                      <Wallet className="w-4 h-4 text-primary" />
                      <span>Budget: ₹{enq.budget?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarIcon className="w-4 h-4 text-secondary" />
                      <span className="capitalize">Timeline: {enq.timeline}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {enq.services?.map((s: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded bg-background border border-border text-[10px] font-code">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 lg:col-span-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <MessageSquare className="w-3 h-3" /> Project Description
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic bg-background/30 p-4 rounded-xl border border-border/30">
                      "{enq.description}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-8">
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required placeholder="e.g. IoT Smart Home" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} placeholder="Web / App / IoT" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Image URL</Label>
                  <Input value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} placeholder="https://picsum.photos/seed/project1/1200/800" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Short Description</Label>
                  <Input value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required placeholder="Brief summary of the work..." />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-background font-bold h-12">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Publish Project</>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsLoading ? (
              <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : projects?.map(p => (
              <Card key={p.id} className="bg-muted/10 border-border overflow-hidden group">
                <div className="aspect-video relative bg-muted overflow-hidden">
                  <img src={p.imageUrl} alt={p.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase font-code tracking-wider">{p.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete('projects', p.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-8">
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserPlus className="w-5 h-5" /> Add Team Member</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={newMember.role} onChange={e => setNewMember({...newMember, role: e.target.value})} required placeholder="Co-Founder & Developer" />
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input value={newMember.imageUrl} onChange={e => setNewMember({...newMember, imageUrl: e.target.value})} required placeholder="https://picsum.photos/seed/member/600/800" />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input value={newMember.linkedin} onChange={e => setNewMember({...newMember, linkedin: e.target.value})} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-2">
                  <Label>Instagram URL</Label>
                  <Input value={newMember.instagram} onChange={e => setNewMember({...newMember, instagram: e.target.value})} placeholder="https://instagram.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Github URL</Label>
                  <Input value={newMember.github} onChange={e => setNewMember({...newMember, github: e.target.value})} placeholder="https://github.com/..." />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-background font-bold h-12">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Add Member</>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {membersLoading ? (
              <div className="col-span-full py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : members?.map(m => (
              <Card key={m.id} className="bg-muted/10 border-border overflow-hidden group">
                <div className="aspect-[3/4] relative bg-muted overflow-hidden">
                  <img src={m.imageUrl} alt={m.name} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" />
                </div>
                <CardContent className="p-4 flex justify-between items-center bg-background/50 backdrop-blur-sm">
                  <div>
                    <h3 className="font-bold text-sm">{m.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-code">{m.role}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete('members', m.id)} className="text-muted-foreground hover:text-destructive h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brands" className="space-y-8">
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle>Add Trusted Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBrand} className="flex gap-4">
                <Input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Enter brand name..." required className="flex-1" />
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-background font-bold px-8">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Add</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brandsLoading ? (
              <div className="col-span-full py-10 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : brands?.map(b => (
              <div key={b.id} className="bg-muted/10 border border-border p-4 rounded-xl flex justify-between items-center group hover:border-primary/50 transition-colors">
                <span className="font-bold">{b.name}</span>
                <button onClick={() => handleDelete('brands', b.id)} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
