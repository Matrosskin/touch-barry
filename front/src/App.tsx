import 'antd/dist/reset.css';
import './App.css';
import { Button, Tabs } from 'antd';
import { useAppSelector } from './hooks';
import { WebSocketStatus } from './slices/websocket-status';
import { CheckCircleTwoTone, ExclamationCircleTwoTone, LoadingOutlined } from '@ant-design/icons';
import CpuTabContent from './components/CpuTabContent/CpuTabContent';

function App() {
  const wsStatus = useAppSelector((state) => state.webSocketStatus.value)

  const items = [{
    label: `CPU`,
    key: `cpu`,
    children: <CpuTabContent />,
  }, {
    label: 'Valheim',
    key: 'valheim',
    children: <div>Valheim shortcuts tab</div>,
  }]

  const operations = <Button>
    {wsStatus === WebSocketStatus.OPEN && <CheckCircleTwoTone twoToneColor="#52c41a" />}
    {wsStatus === WebSocketStatus.CLOSED && <ExclamationCircleTwoTone twoToneColor="#eb2f96" />}
    {wsStatus === WebSocketStatus.WAITING && <LoadingOutlined />}
  </Button>

  return (
    <div className="App">
      <Tabs items={items} tabBarExtraContent={operations} destroyInactiveTabPane={true} />
    </div>
  );
}

export default App;
