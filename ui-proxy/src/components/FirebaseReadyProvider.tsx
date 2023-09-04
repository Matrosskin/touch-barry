import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Functions, connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { firebaseConfig } from '../firebaseConfig';

// TODO: During local development with emulators, it is not enough to call getFunctions(), need to provide proper region.
// So, need to dial somehow with these difference between dev and prod.
export const firebaseSharedData: {
  fApp?: FirebaseApp
  fns?: Functions
} = {}

export function FirebaseReadyProvider({ children }: PropsWithChildren) {
  const [isFirebaseReady, setFirebaseReadyState] = useState(false)

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    if (process.env.NODE_ENV !== 'production') {
      fetch('http://localhost:4400/emulators')
      .then((res) => res.json())
      .then((data) => {
        const auth = getAuth()
        connectAuthEmulator(auth, `http://${data.auth.host}:${data.auth.port}`, { disableWarnings: true })

        const db = getDatabase()
        connectDatabaseEmulator(db, data.database.host, data.database.port)

        const fns = getFunctions(app, 'europe-west1')
        firebaseSharedData.fns = fns
        connectFunctionsEmulator(fns, data.functions.host, data.functions.port)

        setFirebaseReadyState(true)
      })
    } else {
      firebaseSharedData.fns = getFunctions(app, 'europe-west1')
      setFirebaseReadyState(true)
    }
  }, [])

  return isFirebaseReady ? <>{children}</> : null
}
