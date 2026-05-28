
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // In production, we'd log this. In dev, we show a toast.
      toast({
        variant: 'destructive',
        title: 'Permission Denied',
        description: `You don't have permission to ${error.context.operation} at ${error.context.path}`,
      });
      // Optionally re-throw to trigger Next.js error boundary
      // throw error;
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null;
}
