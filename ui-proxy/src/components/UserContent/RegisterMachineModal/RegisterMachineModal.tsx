import { Alert, Button, Form, Input, Modal } from 'antd';
import { useCallback, useState } from 'react';
import s from './RegisterMachineModal.module.scss'
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import { getDatabase, push, ref, set } from 'firebase/database';
import { INewMachine } from '../../../interfaces/IMachine';

type FieldType = {
  machineName: string;
};

interface IRegisterMachineModalProps {
  onClose: () => void
}

export function RegisterMachineModal({onClose}: IRegisterMachineModalProps) {
  const [errorCode, setErrorCode] = useState('')
  const [inProgress, setInProgress] = useState<boolean>(false)
  const {currentUser} = useCurrentUser()

  const onCloseModal = useCallback(() => {
    setErrorCode('')
    onClose()
  }, [onClose])

  const onFinish = useCallback((data: FieldType) => {
    if (!currentUser) return

    setInProgress(true)

    const newMachine: INewMachine = {
      name: data.machineName,
      updatedAt: Date.now(),
    }

    const db = getDatabase()
    const machineListRef = ref(db, `users/${currentUser.uid}/machines`)
    const newMachineRef = push(machineListRef)
    set(newMachineRef, newMachine)
      .then(() => {
        onCloseModal()
      })
      .catch(() => {
        // NOTE: Firebase does not provide the list of possible errors.
        setErrorCode('unknown')
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [currentUser, onCloseModal])

  return (
    <Modal title="Edit profile form" open={true} onCancel={onCloseModal} destroyOnClose={true}
      footer={[
        <Button key='submitEditProfile' type='primary' htmlType="submit" form='registerMachineForm' loading={inProgress}>Save</Button>
      ]}>

      { "unknown" === errorCode && <Alert message="Something broke during Sign In. Try again later." type="error" className={s.errorMessage} />}

      <Form
        name="registerMachineForm"
        id='registerMachineForm'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        className={s.registerMachineForm}
        disabled={inProgress}
      >
        <Form.Item<FieldType>
          label="Machine name"
          name="machineName"
          rules={[{ required: true, message: 'Please input name for new machine!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
