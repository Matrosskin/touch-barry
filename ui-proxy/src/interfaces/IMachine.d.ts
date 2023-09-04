export interface IMachine extends INewMachine {
  key: string
}

// TODO: It would be awesome to reuse machine interface in firebase functions.
export interface INewMachine {
  name: string
  url?: string
  updatedAt: number
}
