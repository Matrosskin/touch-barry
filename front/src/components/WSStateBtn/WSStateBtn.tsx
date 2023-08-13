import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { WebSocketStatus } from '../../slices/websocket-status';
import { useAppSelector } from '../../hooks';

function WSStateBtn() {
  const wsStatus = useAppSelector((state) => state.webSocketStatus.value)

  return (
    <Button size='large'>
      <span className='fa-layers fa-fw'>
        <FontAwesomeIcon icon={faLaptop} />
        {wsStatus === WebSocketStatus.OPEN && <FontAwesomeIcon icon={faCheck} transform="shrink-6" color='limegreen' />}
        {wsStatus === WebSocketStatus.CLOSED && <FontAwesomeIcon icon={faXmark} transform="shrink-6" color='red' />}
        {wsStatus === WebSocketStatus.WAITING && <FontAwesomeIcon icon={faSpinner} spin transform="grow-6" color='yellow' />}
      </span>
    </Button>
  );
}

export default WSStateBtn;
