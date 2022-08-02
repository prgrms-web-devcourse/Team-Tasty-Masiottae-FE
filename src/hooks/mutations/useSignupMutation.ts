import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'

interface Params {
  email: string
  password: string
  nickName: string
  snsAccount: string
  image: string
}

interface Data {
  accessToken: string
  expiredAt: string
}

const postSignup = async ({
  email,
  password,
  nickName,
  snsAccount,
  image
}: Params) => {
  const form = new FormData()
  form.append('image', image)
  form.append(
    'request',
    JSON.stringify({
      email,
      password,
      nickName,
      snsAccount
    })
  )

  const { data } = await axios.post<Data>('/signup', form, {
    headers: { 'Content-Type': '	multipart/form-data' }
  })

  return data
}

export const useSignupMutation = () => {
  return useMutation(postSignup)
}
