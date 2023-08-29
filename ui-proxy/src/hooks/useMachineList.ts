import { useEffect, useState } from 'react';
import { useCurrentUser } from './useCurrentUser';
import { getDatabase, onValue, ref } from 'firebase/database';
import { IMachine } from '../interfaces/IMachine';

export function useMachineList(): IMachine[] {
  const [machineList, setMachineList] = useState<IMachine[]>([])
  const {currentUser} = useCurrentUser()

  useEffect(() => {
    if (!currentUser) {
      setMachineList([])
      return
    }

    // TODO: Add isLoading variable.
    // TODO: Add handler of errors.
    const db = getDatabase()
    const machineListRef = ref(db, `users/${currentUser.uid}/machines`)
    const stopListening = onValue(machineListRef, (snapshot) => {
      const machines: IMachine[] = []
      snapshot.forEach((childSnapshot) => {
        machines.push({
          key: childSnapshot.key,
          ...childSnapshot.val(),
        })
      })

      setMachineList(machines)
    })

    return stopListening
  }, [currentUser])

  return machineList
}
