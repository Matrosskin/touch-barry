import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryEmpty } from '@fortawesome/free-solid-svg-icons/faBatteryEmpty'
import { faBatteryQuarter } from '@fortawesome/free-solid-svg-icons/faBatteryQuarter'
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons/faBatteryHalf'
import { faBatteryThreeQuarters } from '@fortawesome/free-solid-svg-icons/faBatteryThreeQuarters'
import { faBatteryFull } from '@fortawesome/free-solid-svg-icons/faBatteryFull'
import { faBolt } from '@fortawesome/free-solid-svg-icons/faBolt'
import { useMemo } from 'react'
import { useAppSelector } from '../../hooks'

function BatteryStateBtn() {
  const { percentage: batteryPercentage, state: batteryState } = useAppSelector((state) => state.dataToShow.value.battery)

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
    <Button size='large'>
      <span className='fa-layers fa-fw'>
        <FontAwesomeIcon icon={batteryIcon} color={batteryColor} />
        {['charging', 'fully-charged'].includes(batteryState) && <FontAwesomeIcon icon={faBolt} transform="shrink-6" color='yellow' />}
      </span>
    </Button>
  );
}

export default BatteryStateBtn;
