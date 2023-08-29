import { Button, Form, Modal, Select } from 'antd';
import { useCallback } from 'react';
import s from './MachineListModal.module.scss'
import { useMachineList } from '../../../hooks/useMachineList';
import { useAppDispatch } from '../../../hooks';
import { selectMachine, setAppPage } from '../../../slices/appStateSlice';
import { AppPage } from '../../../constants/AppPages';

type FieldType = {
  machineKey: string;
};

interface IMachineListModalProps {
  isOpen: boolean
  onClose: () => void
}

// TODO: Remove isOpen property as it is not used anymore.
export function MachineListModal({isOpen, onClose}: IMachineListModalProps) {
  const dispatch = useAppDispatch()
  // TODO: At the moment I have multiple render triggers because hooks implemented in the way
  // that they trigger in null user, then on user loader and finally on fetch the machine list.
  // Need to rework it.
  const machineList = useMachineList()

  const onFinish = useCallback((data: FieldType) => {
    const selectedMachine = machineList.find((machine) => machine.key === data.machineKey)
    if (!selectedMachine) {
      throw new Error(`Not found machine for key "${data.machineKey}".`)
    }

    dispatch(selectMachine(selectedMachine))
    onClose()
    dispatch(setAppPage(AppPage.MachineWindow))
  }, [dispatch, machineList, onClose])

  return (
    <Modal title="List of registered machines" open={true} onCancel={onClose} destroyOnClose={true}
      footer={[
        <Button key='submitSelectedMachine' type='primary' htmlType="submit" form='machineListForm'>Open</Button>
      ]}>

      {machineList.length === 0 ? null : (
        <Form
          name="machineListForm"
          id='machineListForm'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
          className={s.machineListForm}
        >
          <Form.Item name="machineKey" label="Machine" rules={[{ required: true }]} initialValue={machineList[0].key}>
            <Select>
              {machineList.map((machine) => (
                <Select.Option key={machine.key} value={machine.key}>{machine.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}
