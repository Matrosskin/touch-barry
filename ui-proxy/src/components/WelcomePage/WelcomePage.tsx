import Title from 'antd/es/typography/Title';
import { Button, Space, Typography } from 'antd';
import { SignInModal } from '../SignInModal/SignInModal';
import { useState } from 'react';
import { SignUpModal } from '../SignUpModal/SignUpModal';
const { Text } = Typography;

export function WelcomePage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  return <>
    <Space direction='vertical' align='center'>
      <Title>Welcome to Touch Barry "Welcome" page :)</Title>
      <Text >At this page you can <Button onClick={() => setIsSignInOpen(true)}>Sign In</Button> or <Button onClick={() => setIsSignUpOpen(true)}>Sign Up</Button> to access your machine remotely.</Text>
    </Space>
    <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)}></SignInModal>
    <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}></SignUpModal>
  </>
}
