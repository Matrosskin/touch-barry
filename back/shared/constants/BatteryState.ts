export enum BatteryState {
  NA = '',

  CHARGING = 'charging',
  DISCHARGING = 'discharging',
  FULLY_CHARGED = 'fully-charged',
}

const KNOWN_STATES = [
  'charging',
  'discharging',
  'fully-charged'
]
export function isBatteryState(state: string): state is BatteryState {
  return KNOWN_STATES.indexOf(state) >= 0
}
