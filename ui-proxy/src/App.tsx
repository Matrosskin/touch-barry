import s from './App.module.scss';
import { WelcomePage } from './components/WelcomePage/WelcomePage';
import { UserContent } from './components/UserContent/UserContent';
import { useCurrentUser } from './hooks/useCurrentUser';
import { Spin } from 'antd';

export function App() {
  const {currentUser, isLoading} = useCurrentUser()

  return (
    <div className={s.app}>
      {isLoading && <Spin size="large" className={s.spinnerStyles} />}

      {!currentUser && !isLoading && <WelcomePage></WelcomePage>}

      {currentUser && <UserContent></UserContent>}
    </div>
  );
}
