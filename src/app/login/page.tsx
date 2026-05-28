
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
import { Lock, Loader2, AlertCircle, ShieldAlert } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { firebaseConfig } from '@/firebase/config'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [debugError, setDebugError] = useState<string | null>(null)
  
  const { user, loading: userLoading } = useUser()
  const auth = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (!userLoading && user) {
      router.push('/adminpanel')
    }
  }, [user, userLoading, router])

  const isConfigMissing = !firebaseConfig.apiKey || firebaseConfig.apiKey === "placeholder-api-key"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setDebugError(null)

    if (isConfigMissing) {
      const msg = "Firebase API Key is missing. Please check your .env.local file."
      setDebugError(msg)
      toast({ variant: "destructive", title: "Config Error", description: msg })
      return
    }

    if (!auth) {
      const msg = "Firebase Auth service is not available."
      setDebugError(msg)
      toast({ variant: "destructive", title: "Auth Error", description: msg })
      return
    }

    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ title: "Login Successful", description: "Identity verified. Redirecting..." })
    } catch (error: any) {
      console.error("Firebase Login Error:", error)
      let errorMessage = "Access denied. Please check your credentials."
      
      if (error.code === 'auth/configuration-not-found' || error.code === 'auth/operation-not-allowed') {
        errorMessage = "Email/Password sign-in is not enabled in Firebase Console."
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password."
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password."
      } else if (error.code === 'auth/invalid-api-key') {
        errorMessage = "The API key provided is invalid."
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your connection."
      }

      setDebugError(`${error.code}: ${error.message}`)
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-xs font-code text-muted-foreground uppercase tracking-widest">Checking Auth Status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-grain relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-primary/20 bg-muted/20 backdrop-blur-sm shadow-2xl rounded-[2rem]">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
              <Lock className="text-primary w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Unauthorized access is strictly prohibited.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isConfigMissing && (
              <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/20">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Configuration Missing</AlertTitle>
                <AlertDescription className="text-xs">
                  Your Firebase keys are not configured. Check <code>.env.local</code>.
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@getitwebbed.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-background border-border rounded-xl focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" dangerouslySetInnerHTML={{ __html: 'Password' }} className="text-xs font-bold uppercase tracking-widest text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-background border-border rounded-xl focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" disabled={isLoading || isConfigMissing} className="w-full h-14 bg-primary text-background hover:bg-primary/90 font-bold rounded-xl text-lg transition-all active:scale-95 shadow-lg shadow-primary/20">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify Identity"}
              </Button>
            </form>

            {debugError && (
              <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <p className="text-[10px] font-code text-red-400 break-all">
                  <b>System Log:</b> {debugError}
                </p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-border/50">
              <Alert variant="default" className="bg-primary/5 border-primary/10">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertTitle className="text-[10px] font-bold uppercase tracking-widest">Setup Instructions</AlertTitle>
                <AlertDescription className="text-[10px] text-muted-foreground leading-relaxed mt-1">
                  1. Enable <b>Email/Password</b> in Firebase Auth.<br />
                  2. Create a user in the <b>Users</b> tab.<br />
                  3. Ensure <code>NEXT_PUBLIC_FIREBASE_API_KEY</code> is set.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
