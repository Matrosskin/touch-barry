import { Alert, Button, Form, Input, Modal } from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import s from './SignInModal.module.scss'

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

interface ISignInModalProps {
  isOpen: boolean
  onClose: () => void
}

// TODO: Should be reworked similar to MachineListModal - without prop isOpen.
export function SignInModal({isOpen, onClose}: ISignInModalProps) {
  const [errorCode, setErrorCode] = useState('')
  const [inProgress, setInProgress] = useState<boolean>(false);

  const onCloseModal = useCallback(() => {
    setErrorCode('')
    onClose()
  }, [onClose])

  const onFinish = useCallback((data: FieldType) => {
    setInProgress(true)
    signInWithEmailAndPassword(getAuth(), data.email, data.password)
      .then(() => {
        onCloseModal()
      })
      .catch((error) => {
        if ([
          "auth/invalid-email",
          "auth/user-disabled",
          "auth/user-not-found",
          "auth/wrong-password",
        ].indexOf(error.code) !== -1) {
          setErrorCode(error.code)
          return
        }

        setErrorCode('unknown')
      })
      .finally(() => {
        setInProgress(false)
      })
  }, [onCloseModal])

  return (
    <Modal title="Sign In Form" open={isOpen} onCancel={onCloseModal} destroyOnClose={true}
      footer={[
        <Button key='submitSignIn' type='primary' htmlType="submit" form='signInForm' loading={inProgress}>Sign In</Button>
      ]}>

      { "auth/invalid-email" === errorCode && <Alert message="Invalid email." type="error" className={s.errorMessage} />}
      { "auth/user-disabled" === errorCode && <Alert message="User exists but inactive. Contact the site owner please." type="error" className={s.errorMessage} />}
      { "auth/user-not-found" === errorCode && <Alert message="User and/or password were not found." type="error" className={s.errorMessage} />}
      { "auth/wrong-password" === errorCode && <Alert message="User and/or password were not found." type="error" className={s.errorMessage} />}
      { "unknown" === errorCode && <Alert message="Something broke during Sign In. Try again later." type="error" className={s.errorMessage} />}

      <Form
        name="signInForm"
        id='signInForm'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        className={s.signInForm}
        disabled={inProgress}
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}
