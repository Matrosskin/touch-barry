import 'antd/dist/reset.css';
import './App.css';
import { Tabs } from 'antd';
import CpuTabContent from './components/CpuTabContent/CpuTabContent';
import BatteryStateBtn from './components/BatteryStateBtn/BatteryStateBtn';
import WSStateBtn from './components/WSStateBtn/WSStateBtn';

function App() {
  const items = [{
    label: `CPU`,
    key: `cpu`,
    children: <CpuTabContent />,
  }, {
    label: 'Valheim',
    key: 'valheim',
    children: <div>Valheim shortcuts tab</div>,
  }]

  const operations = <>
    <BatteryStateBtn />
    <WSStateBtn />
  </>

  return (
    <div className="App">
      <Tabs items={items} tabBarExtraContent={operations} destroyInactiveTabPane={true} />
    </div>
  );
}

export default App;
