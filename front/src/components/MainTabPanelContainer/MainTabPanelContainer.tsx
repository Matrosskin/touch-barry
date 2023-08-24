import { PropsWithChildren } from 'react';
import s from './MainTabPanelContainer.module.scss';

export function MainTabPanelContainer({ children }: PropsWithChildren) {
  return <div className={s.tabPanelFullHeightContainer}>
    { children }
  </div>
}
