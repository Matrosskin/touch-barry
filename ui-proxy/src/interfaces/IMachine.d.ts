export interface IMachine extends INewMachine {
  key: string
}

export interface INewMachine {
  name: string
  url: string
  updatedAt: number
}
