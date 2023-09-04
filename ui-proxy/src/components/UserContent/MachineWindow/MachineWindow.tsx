import { useAppSelector } from '../../../hooks';
import s from './MachineWindow.module.scss'

export function MachineWindow() {
  const machine = useAppSelector((state) => state.appState.selectedMachine)

  // TODO: Need to play with paddings here `ui-proxy/src/App.module.scss` because MachineWindow page on desktop looks bad.
  return !machine ? <>Machine was not selected.</> : (
    <iframe
      className={s.machineFrame}
      src={machine.url}
      title={`Frame with Touch Barry interface from selected machine "${machine.name}".`}
      />
  )
}
