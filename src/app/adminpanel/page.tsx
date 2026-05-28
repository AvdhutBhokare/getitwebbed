
"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useFirestore, useCollection } from '@/firebase'
import { collection, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Trash2, LogOut, LayoutDashboard, Briefcase, Award } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch Brands
  const brandsQuery = React.useMemo(() => {
    if (!db) return null
    return query(collection(db, 'brands'), orderBy('order', 'asc'))
  }, [db])
  const { data: brands, loading: brandsLoading } = useCollection(brandsQuery)

  // Fetch Projects
  const projectsQuery = React.useMemo(() => {
    if (!db) return null
    return query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
  }, [db])
  const { data: projects, loading: projectsLoading } = useCollection(projectsQuery)

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login')
    }
  }, [user, userLoading, router])

  if (userLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
  }

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !newBrand) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'brands'), {
        name: newBrand,
        order: (brands?.length || 0) + 1
      })
      setNewBrand('')
      toast({ title: "Brand added" })
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add brand" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!db || !newProject.title) return
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'projects'), {
        ...newProject,
        createdAt: serverTimestamp()
      })
      setNewProject({ title: '', category: '', description: '', imageUrl: '', imageHint: '' })
      toast({ title: "Project added" })
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add project" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (coll: string, id: string) => {
    if (!db) return
    try {
      await deleteDoc(doc(db, coll, id))
      toast({ title: "Item removed" })
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to delete" })
    }
  }

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
          <LayoutDashboard className="text-primary w-8 h-8" />
          Admin Dashboard
        </h1>
        <Button variant="ghost" className="text-muted-foreground hover:text-destructive" onClick={() => router.push('/')}>
          <LogOut className="w-4 h-4 mr-2" /> Exit Panel
        </Button>
      </div>

      <Tabs defaultValue="projects" className="space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="projects" className="rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Briefcase className="w-4 h-4 mr-2" /> Projects
          </TabsTrigger>
          <TabsTrigger value="brands" className="rounded-lg px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-background">
            <Award className="w-4 h-4 mr-2" /> Brands
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-8">
          <Card className="bg-muted/20 border-border">
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} placeholder="Web / App / IoT" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Image URL (Picsum seed or Unsplash)</Label>
                  <Input value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} placeholder="https://picsum.photos/seed/..." required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Input value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} required />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-background font-bold">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Create Project</>}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map(p => (
              <Card key={p.id} className="bg-muted/10 border-border overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img src={p.imageUrl} alt={p.title} className="object-cover w-full h-full" />
                </div>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="text-xs text-muted-foreground uppercase">{p.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete('projects', p.id)} className="text-muted-foreground hover:text-destructive">
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
                <Input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Brand Name" required className="flex-1" />
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-background font-bold">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="w-4 h-4 mr-2" /> Add</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands?.map(b => (
              <div key={b.id} className="bg-muted/10 border border-border p-4 rounded-xl flex justify-between items-center group">
                <span className="font-bold">{b.name}</span>
                <button onClick={() => handleDelete('brands', b.id)} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity">
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
