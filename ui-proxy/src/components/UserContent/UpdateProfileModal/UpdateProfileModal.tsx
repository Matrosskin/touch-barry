import { Alert, Button, Form, Input, Modal } from 'antd';
import { updateProfile } from 'firebase/auth';
import { useCallback, useState } from 'react';
import s from './UpdateProfileModal.module.scss'
import { useCurrentUser } from '../../../hooks/useCurrentUser';

type FieldType = {
  displayName: string;
};

interface IUpdateProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

// TODO: Should be reworked similar to MachineListModal - without prop isOpen.
export function UpdateProfileModal({isOpen, onClose}: IUpdateProfileModalProps) {
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
    updateProfile(currentUser, {displayName: data.displayName})
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
    <Modal title="Edit profile form" open={isOpen} onCancel={onCloseModal} destroyOnClose={true}
      footer={[
        <Button key='submitEditProfile' type='primary' htmlType="submit" form='editProfileForm' loading={inProgress}>Save</Button>
      ]}>

      { "unknown" === errorCode && <Alert message="Something broke during Sign In. Try again later." type="error" className={s.errorMessage} />}

      <Form
        name="editProfileForm"
        id='editProfileForm'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        className={s.editProfileForm}
        disabled={inProgress}
      >
        <Form.Item<FieldType>
          label="User name"
          name="displayName"
          initialValue={currentUser?.displayName}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
