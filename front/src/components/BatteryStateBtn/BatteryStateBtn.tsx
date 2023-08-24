import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty } from '@fortawesome/free-solid-svg-icons/faBatteryEmpty'
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons/faBatteryQuarter'
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons/faBatteryHalf'
import { faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons/faBatteryThreeQuarters'
import { faBatteryFull } from '@fortawesome/free-solid-svg-icons/faBatteryFull'
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt'
import { useMemo } from 'react'
import { useAppSelector } from '../../hooks'
import { BatteryState } from '@touch-barry/shared/constants/BatteryState';

function BatteryStateBtn() {
  const { percentage: batteryPercentage, state: batteryState } = useAppSelector((state) => state.dataToShow.battery)

  const [batteryIcon, batteryColor] = useMemo(() => {
    if (batteryPercentage < 25) {
      return [faBatteryEmpty, 'red']
    }
    if (batteryPercentage < 50) {
      return [faBatteryQuarter, 'orange']
    }
    if (batteryPercentage < 75) {
      return [faBatteryHalf, 'orange']
    }
    if (batteryPercentage < 95) {
      return [faBatteryThreeQuarters, 'limegreen']
    }

    return [faBatteryFull, 'limegreen']
  }, [batteryPercentage])

  return (
    <Tooltip placement="bottom" title={`${batteryPercentage}%`}>
      <Button size='large'>
        <span className='fa-layers fa-fw'>
          <FontAwesomeIcon icon={batteryIcon} color={batteryColor} />
          {[BatteryState.CHARGING, BatteryState.FULLY_CHARGED].includes(batteryState) && <FontAwesomeIcon icon={faBolt} transform="shrink-6" color='yellow' />}
        </span>
      </Button>
    </Tooltip>
  );
}

export default BatteryStateBtn;
