import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { User } from '@interfaces'

interface Params {
  email: string
  password: string
}

const postLogin = async ({ email, password }: Params) => {
  const { data } = await axios.post<User>(
    '/login',
    JSON.stringify({ email, password })
  )

  console.log('뮤테이션 로그인 파람', email, password)
  return data
}

export const useLoginMutation = () => {
  const [user, setUser] = useRecoilState<User>(currentUser)
  return useMutation(postLogin, {
    onSuccess: (data) => {
      console.log('뮤테이션 로그인 데이터', data)
      setUser({ ...user, ...data })
    }
  })
}
