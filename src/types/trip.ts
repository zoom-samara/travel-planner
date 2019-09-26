export interface INewTrip {
  destination: string
  endDate: string
  startDate: string
  comment?: string
}

export interface ITrip extends INewTrip {
  id: string
  uid: string
}
