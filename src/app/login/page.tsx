
"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuth, useUser } from '@/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Lock, Loader2, AlertCircle } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user, loading: userLoading } = useUser()
  const auth = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (!userLoading && user) {
      router.push('/adminpanel')
    }
  }, [user, userLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: "Firebase Authentication is not initialized."
      })
      return
    }

    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ title: "Login Successful", description: "Redirecting to admin panel..." })
      // The useEffect will handle the redirection once the state updates
    } catch (error: any) {
      console.error("Login error:", error)
      let errorMessage = "Invalid credentials. Please check your email and password."
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Email/Password provider is not enabled in Firebase Console."
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "No user found with this email."
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password."
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = "Invalid Firebase API Key. Please check your environment variables."
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-grain relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-primary/20 bg-muted/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Lock className="text-primary w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-headline font-bold">Admin Portal</CardTitle>
            <CardDescription>Enter your credentials to manage GetItWebbed.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@getitwebbed.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-border"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full h-12 bg-primary text-background font-bold rounded-xl mt-4">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <div className="mt-8">
              <Alert variant="default" className="bg-primary/5 border-primary/20">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-xs font-bold uppercase tracking-wider">Note</AlertTitle>
                <AlertDescription className="text-[10px] text-muted-foreground leading-relaxed">
                  Ensure <b>Email/Password</b> is enabled in your Firebase Console Authentication settings and at least one user is created.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
