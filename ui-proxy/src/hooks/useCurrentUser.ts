import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const auth = getAuth()
    const stopListening = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })

    return stopListening
  }, [])

  return {currentUser, isLoading}
}
