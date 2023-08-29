import { useAppSelector } from '../../../hooks';
import s from './MachineWindow.module.scss'

export function MachineWindow() {
  const machine = useAppSelector((state) => state.appState.selectedMachine)

  return !machine ? <>Machine was not selected.</> : (
    <iframe
      className={s.machineFrame}
      src={machine.url}
      title={`Frame with Touch Barry interface from selected machine "${machine.name}".`}
      />
  )
}
