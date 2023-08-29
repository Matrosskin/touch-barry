import { Tooltip } from 'antd';
import { useCurrentUser } from '../../../hooks/useCurrentUser';
import s from './DisplayUserName.module.scss'

export function DisplayUserName() {
  const {currentUser} = useCurrentUser()

  return currentUser?.displayName
    ? (
      <>{currentUser?.displayName}</>
    ) : (
      <Tooltip title="While you have not set your name I will call you John 😊">
        <span className={s.temporaryUserName}>John</span>
      </Tooltip>
    )
}
