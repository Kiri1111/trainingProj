import axios from "axios"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "3f0bd518-e3ef-420a-b8dc-d517a6d5a7f7",
  },
})

export const authApi = {
  login(authData: AuthDataType) {
    return instance.post<LoginResponseType>("auth/login", { authData })
  },
}

export type AuthDataType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}

type LoginResponseType = {
  resultCode: number
  messages: string[]
  data: {
    userId: number
  }
}
