export interface DataToShow {
  cpu: {
    usage: (number[])[]
    amountOfCores: number
  },
  battery: {
    state: string // 'charging' | 'discharging' | 'fully-charged'
    percentage: number
  },
}
