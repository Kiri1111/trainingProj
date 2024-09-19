import axios from "axios"
import { ResultCode } from "../common/resultCodes"

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "3f0bd518-e3ef-420a-b8dc-d517a6d5a7f7",
  },
})

export const authApi = {
  login(authData: AuthDataType) {
    return instance.post<LoginResponseType>("auth/login", authData)
  },
  logout() {
    return instance.delete("auth/login")
  },
  me() {
    return instance.get<MeResponseType>("auth/me")
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
type MeResponseType = {
  data: { id: number; login: string; email: string }
  fieldsErrors: string[]
  messages: string[]
  resultCode: ResultCode
}
