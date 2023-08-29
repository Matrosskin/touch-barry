import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { PropsWithChildren, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

export function FirebaseReadyProvider({ children }: PropsWithChildren) {
  const [isFirebaseReady, setFirebaseReadyState] = useState(false)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "ololo-trololo",
      authDomain: "ololo-trololo",
      projectId: "touch-barry",
      storageBucket: "ololo-trololo",
      messagingSenderId: "ololo-trololo",
      appId: "ololo-trololo"
    }

    initializeApp(firebaseConfig);

    if (process.env.NODE_ENV !== 'production') {
      fetch('http://localhost:4400/emulators')
      .then((res) => res.json())
      .then((data) => {
        const auth = getAuth()
        connectAuthEmulator(auth, `http://${data.auth.host}:${data.auth.port}`, { disableWarnings: true })

        const db = getDatabase()
        connectDatabaseEmulator(db, data.database.host, data.database.port)

        const fns = getFunctions()
        connectFunctionsEmulator(fns, data.functions.host, data.functions.port)

        setFirebaseReadyState(true)
      })
    } else {
      setFirebaseReadyState(true)
    }
  }, [])

  return isFirebaseReady ? <>{children}</> : null
}
