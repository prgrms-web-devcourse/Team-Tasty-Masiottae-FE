import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'

interface Params {
  email: string
  password: string
}

interface Token {
  accessToken: string
  expirationTime: string
}

interface Data {
  token: Token
  account: User
}

const postLogin = async ({ email, password }: Params) => {
  const { data } = await axios.post<Data>(
    '/login',
    JSON.stringify({ email, password })
  )

  return data
}

export const useLoginMutation = () => {
  const [user, setUser] = useRecoilState<User>(currentUser)
  return useMutation(postLogin, {
    onSuccess: (data) => {
      setUser({ ...user, ...data })
    }
  })
}