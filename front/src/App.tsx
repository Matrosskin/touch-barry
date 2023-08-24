import 'antd/dist/reset.css';
import './App.css';
import s from './App.module.scss';
import { Tabs } from 'antd';
import CpuTabContent from './components/CpuTabContent/CpuTabContent';
import BatteryStateBtn from './components/BatteryStateBtn/BatteryStateBtn';
import WSStateBtn from './components/WSStateBtn/WSStateBtn';
import { MainTabPanelContainer } from './components/MainTabPanelContainer/MainTabPanelContainer';
import { ShortCatsTabContent } from './components/ShortCatsTabContent/ShortCatsTabContent';

function App() {
  const items = [{
    label: `CPU`,
    key: `cpu`,
    children: <MainTabPanelContainer>
      <CpuTabContent />
    </MainTabPanelContainer>,
  }, {
    label: 'ShortCats',
    key: 'short-cats',
    children: <MainTabPanelContainer>
      <ShortCatsTabContent />
    </MainTabPanelContainer>,
  }]

  const operations = <>
    <BatteryStateBtn />
    <WSStateBtn />
  </>

  return (
    <div className={s.app}>
      <Tabs items={items} tabBarExtraContent={operations} destroyInactiveTabPane={true} />
    </div>
  );
}

export default App;
