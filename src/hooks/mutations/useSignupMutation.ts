import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { setLocalToken } from '@utils/localToken'
import { useRouter } from 'next/router'
import { useLoginMutation } from '@hooks/mutations/useLoginMutation'

interface Params {
  image?: File
  email: string
  nickName: string
  password: string
  passwordConfirm?: string
  snsAccount?: string
}

interface Data {
  accessToken: string
  expirationTime: string
}

const postSignup = async ({
  email,
  password,
  nickName,
  snsAccount,
  image
}: Params) => {
  const form = new FormData()
  if (image != null) {
    form.append('image', image)
  }

  form.append(
    'request',
    new Blob(
      [
        JSON.stringify({
          email,
          password,
          nickName,
          snsAccount
        })
      ],
      { type: 'application/json' }
    )
  )
  const { data } = await axios.post<Data>('/signup', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  return { data, email, password }
}

export const useSignupMutation = () => {
  const { mutate: postLogin } = useLoginMutation()
  const router = useRouter()
  return useMutation(postSignup, {
    onSuccess: ({ data, email, password }) => {
      setLocalToken(data)
      postLogin({ email, password })
      router.push('/')
    }
  })
}
