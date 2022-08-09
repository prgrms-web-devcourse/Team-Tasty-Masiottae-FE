import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'
import { setLocalToken } from '@utils/localToken'
import { useRouter } from 'next/router'
import { DEFAULT_USER_IMAGE } from '@constants/image'

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
      setLocalToken(data.token)
      router.replace('/')
    }
  })
}
