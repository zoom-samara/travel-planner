export interface IUser {
  uid: string
  displayName: string
  email: string
}

export interface IAuthUser {
  displayName?: string
  email: string
  password: string
}
