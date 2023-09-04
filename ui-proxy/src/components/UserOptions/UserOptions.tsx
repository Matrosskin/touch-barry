import { Button, Typography } from 'antd';
import { getAuth, signOut } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { DisplayUserName } from '../UserContent/DisplayUserName/DisplayUserName';
import { UpdateProfileModal } from '../UserContent/UpdateProfileModal/UpdateProfileModal';
import { MachineListModal } from '../UserContent/MachineListModal/MachineListModal';
import { useMachineList } from '../../hooks/useMachineList';
import { useAppDispatch } from '../../hooks';
import { setAppPage } from '../../slices/appStateSlice';
import { AppPage } from '../../constants/AppPages';

const { Title, Text } = Typography;

export function UserOptions() {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false)
  const [isMachineListOpen, setIsMachineListOpen] = useState(false)
  const machineList = useMachineList()
  const dispatch = useAppDispatch()

  const signOutHandler = useCallback(() => {
    signOut(getAuth())
  }, [])

  const openUpdateProfileModal = useCallback(() => {
    setIsUpdateProfileOpen(true)
  }, [])

  const closeUpdateProfileModal = useCallback(() => {
    setIsUpdateProfileOpen(false)
  }, [])

  const showTheMachineList = useCallback(() => {
    setIsMachineListOpen(true)
  }, [])

  const closeTheMachineList = useCallback(() => {
    setIsMachineListOpen(false)
  }, [])

  const goToMachineList = useCallback(() => {
    dispatch(setAppPage(AppPage.ManageMachines))
  }, [dispatch])

  return <>
      <Title level={4}>Hello dear <DisplayUserName />! Here you have a few possible actions:</Title>
      <ul>
        {machineList.length ? (
          <>
            <li>
              {/* TODO: If user has only one machine then we can show only "Connect to 'machine1'" button */}
              <Text>Chose your machine to connects to it's Touch Barry interface: <Button onClick={showTheMachineList}>Select machine</Button></Text>
            </li>
            <li>
              {/* TODO: If user has only one machine then we can show only "Connect to 'machine1'" button */}
              <Text>Manage your registered machines: <Button onClick={goToMachineList}>Manage machines</Button></Text>
            </li>
          </>
        ) : (

          <li>
            {/* TODO: If user has only one machine then we can show only "Connect to 'machine1'" button */}
            <Text>Register machine to be able easily connect to it: <Button onClick={goToMachineList}>Register machine</Button></Text>
          </li>
        )}
        <li><Button onClick={signOutHandler}>Sign Out</Button></li>
        <li>Update you name: <Button onClick={openUpdateProfileModal}>Edit profile</Button></li>
      </ul>

      <UpdateProfileModal isOpen={isUpdateProfileOpen} onClose={closeUpdateProfileModal}></UpdateProfileModal>
      {isMachineListOpen && <MachineListModal isOpen={isMachineListOpen} onClose={closeTheMachineList} />}
  </>
}
