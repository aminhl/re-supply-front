export interface User {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  image: string,
  password: string,
  confirmPassword: string
  role: string,
  active: boolean,
  joinedAt: Date,
  passwordChangedAt: Date
}
