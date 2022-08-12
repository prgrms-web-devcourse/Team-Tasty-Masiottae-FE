import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'
import { useRouter } from 'next/router'
import { DEFAULT_USER_IMAGE } from '@constants/image'
import { setTokenData } from '@utils/cookie'
interface Params {
  email: string
  password: string
}

interface Token {
  token: string
  expirationDate: string
}

interface Data {
  accessToken: Token
  account: User
  refreshToken: Token
}

const postLogin = async ({ email, password }: Params) => {
  const { data } = await axios.post<Data>('/login', { email, password })

  return data
}

export const useLoginMutation = () => {
  const router = useRouter()
  const [user, setUser] = useRecoilState<User>(currentUser)
  return useMutation(postLogin, {
    onSuccess: (data) => {
      const { image } = data.account
      setUser({
        ...user,
        ...data.account,
        image: image ?? DEFAULT_USER_IMAGE
      })
      setTokenData(data)
      router.replace('/')
    }
  })
}
