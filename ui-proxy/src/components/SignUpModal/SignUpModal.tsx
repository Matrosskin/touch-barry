import { Alert, Button, Form, Input, Modal } from 'antd';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useCallback, useState } from 'react';
import s from './SignUpModal.module.scss'

type FieldType = {
  email: string;
  password: string;
  remember: string;
};

interface ISignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

// TODO: Should be reworked similar to MachineListModal - without prop isOpen.
export function SignUpModal({isOpen, onClose}: ISignUpModalProps) {
  const [errorCode, setErrorCode] = useState('')
  const [inProgress, setInProgress] = useState<boolean>(false);

  const onCloseModal = useCallback(() => {
    setErrorCode('')
    onClose()
  }, [onClose])

  const onFinish = useCallback((data: FieldType) => {
    setInProgress(true)
    createUserWithEmailAndPassword(getAuth(), data.email, data.password)
      .then(() => {
        onCloseModal()
      })
      .catch((error) => {
        if ([
          "auth/email-already-in-use",
          "auth/invalid-email",
          "auth/operation-not-allowed",
          "auth/weak-password",
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
    <Modal title="Sign Up Form" open={isOpen} onCancel={onCloseModal} destroyOnClose={true}
      footer={[
        <Button key='submitSignUp' type='primary' htmlType="submit" form='signUpForm' loading={inProgress}>Sign Up</Button>
      ]}>

      { "auth/email-already-in-use" === errorCode && <Alert message="User with such email already registered." type="error" className={s.errorMessage} />}
      { "auth/invalid-email" === errorCode && <Alert message="Invalid email." type="error" className={s.errorMessage} />}
      { "auth/operation-not-allowed" === errorCode && <Alert message="Registration with email/password is not allowed on  this service." type="error" className={s.errorMessage} />}
      { "auth/weak-password" === errorCode && <Alert message="The password is not strong enough." type="error" className={s.errorMessage} />}
      { "unknown" === errorCode && <Alert message="Something broke during Sign Up. Try again later." type="error" className={s.errorMessage} />}

      <Form
        name="signUpForm"
        id='signUpForm'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        className={s.signUpForm}
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
