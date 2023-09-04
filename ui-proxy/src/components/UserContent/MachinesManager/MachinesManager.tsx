import { Button, Divider, List, Modal, Popconfirm } from 'antd';
import { useMachineList } from '../../../hooks/useMachineList';
import s from './MachinesManager.module.scss'
import { useAppDispatch } from '../../../hooks';
import { useCallback, useState } from 'react';
import { setAppPage } from '../../../slices/appStateSlice';
import { AppPage } from '../../../constants/AppPages';
import { RegisterMachineModal } from '../RegisterMachineModal/RegisterMachineModal';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { getDatabase, ref, remove } from 'firebase/database';
import { httpsCallable } from 'firebase/functions';
import { firebaseSharedData } from '../../FirebaseReadyProvider';

export function MachinesManager() {
  const dispatch = useAppDispatch()
  const machineList = useMachineList()
  const [isRegisterShown, setIsRegisterShown] = useState(false)
  const {currentUser} = useCurrentUser()
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [machineToken, setMachineToken] = useState<string>('')
  const [machineName, setMachineName] = useState<string>('')

  const goBack = useCallback(() => {
    dispatch(setAppPage(AppPage.UserOptions))
  }, [dispatch])

  const onRemove = useCallback((key: string) => {
    if (!currentUser) return

    if (inProgress) return

    setInProgress(true)

    const db = getDatabase()
    const machineToRemoveRef = ref(db, `users/${currentUser.uid}/machines/${key}`)
    remove(machineToRemoveRef)
      .catch((error) => {
        console.error('machine removing error:', error)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [currentUser, inProgress])

  const onGenerateToken = useCallback((key: string) => {
    if (inProgress) return

    setInProgress(true)
    // TODO: Need to provide the correct region: 'europe-north1'
    const fn = firebaseSharedData.fns!
    const renewTouchBarryMachineToken = httpsCallable<{machineKey: string}, {newToken: string}>(fn, 'renewTouchBarryMachineToken');
    renewTouchBarryMachineToken({machineKey: key})
      .then((resp) => {
        setMachineName(machineList.find((m) => m.key === key)!.name)
        setMachineToken(resp.data.newToken)
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [inProgress, machineList])

  return <>
    <div className={s.toolbar}>
      <div>
        <Button icon={<>&lt;</>} onClick={goBack} />
      </div>
      <div className={s.toolbarSpace}></div>
      <div>
        <Button icon={<>+</>} onClick={() => {setIsRegisterShown(true)}} />
      </div>
    </div>
    <Divider style={{margin: '5px 0'}}></Divider>

    <List
      bordered
      dataSource={machineList}
      className={s.listContainer}
      renderItem={(machine) => (
        <div className={s.listItem}>
          <span className={s.listItemText}>{machine.name}</span>
          <span className={s.listItemActions}>
            <Popconfirm
              title="Renew machine token"
              description={<>
                <div>This action will renew your machine token.</div>
                <div>Are you sure you wish to do it?</div>
              </>}
              onConfirm={() => {onGenerateToken(machine.key)}}
              okText="Yes"
              cancelText="No"
              placement="topRight"
              className={s.confirmDialog}
              >
              <Button icon={<>#</>} />
            </Popconfirm>
            <Button icon={<>X</>} onClick={() => {onRemove(machine.key)}} />
          </span>
        </div>
      )}
    />

    {isRegisterShown && <RegisterMachineModal onClose={() => {setIsRegisterShown(false)}} />}

    {machineToken && (
      <Modal
        title={`New token for "${machineName}"`}
        open={true}
        onCancel={() => setMachineToken('')}
        footer={
          <Button type='primary' onClick={() => setMachineToken('')}>OK</Button>
        }
        >
          {/* // TODO: Need to add an opportunity to copy the value. */}
        <p>{machineToken}</p>
      </Modal>
    )}
  </>
}
