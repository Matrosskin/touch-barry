import os from 'os'
import { CPU_MEASURE_INTERVAL } from '../../shared/constants/cpu'
import { pushCpuUsage, setCpuCores } from '../../shared/slices/dataToShow'
import { store } from '../store'

export const monitorCpuUsage = () => {
  const cores = os.cpus()

  store.dispatch(setCpuCores(cores.length))

  let cpus0: any = null
  setInterval(() => {
    if (!cpus0) {
      cpus0 = os.cpus()
      return
    }
    const cores = os.cpus()

    const coresUsage = cores.map((time, i) => {
      const user = time.times.user - cpus0[i].times.user
      const nice = time.times.nice - cpus0[i].times.nice
      const sys = time.times.sys - cpus0[i].times.sys
      const idle = time.times.idle - cpus0[i].times.idle
      const irq = time.times.irq - cpus0[i].times.irq

      const total = user + nice + sys + idle + irq

      return Math.round((1 - idle / total) * 1000)/10
    })
    cpus0 = cores

    store.dispatch(pushCpuUsage(coresUsage))
  }, CPU_MEASURE_INTERVAL)
}
