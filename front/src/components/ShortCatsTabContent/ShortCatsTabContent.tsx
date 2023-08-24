import { Button } from 'antd';
import axios from 'axios';
import { useCallback } from 'react';

export function ShortCatsTabContent() {
  const typeHelloWorld = useCallback(() => {
    axios.post('/api/triggerShortCat', {key: 'typeHelloWorld'})
  }, [])


  return <div>
    <Button type="primary" size='large' onClick={typeHelloWorld}>
      Type Hello World
    </Button>
  </div>
}
