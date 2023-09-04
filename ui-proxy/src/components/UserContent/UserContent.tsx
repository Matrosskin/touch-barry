import { AppPage } from '../../constants/AppPages';
import { useAppSelector } from '../../hooks';
import { UserOptions } from '../UserOptions/UserOptions';
import { MachineWindow } from './MachineWindow/MachineWindow';
import { MachinesManager } from './MachinesManager/MachinesManager';

export function UserContent() {
  const page = useAppSelector((state) => state.appState.page)

  switch (page) {
    case AppPage.UserOptions:
      return <UserOptions />

    case AppPage.MachineWindow:
      return <MachineWindow />

    case AppPage.ManageMachines:
      return <MachinesManager />

    default:
      return <>404 - Page not found :(</>
  }
}
