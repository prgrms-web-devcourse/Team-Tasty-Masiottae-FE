import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { useLoginMutation } from '@hooks/mutations/useLoginMutation'

interface Params {
  image?: File | null
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
  return useMutation(postSignup, {
    onSuccess: ({ email, password }) => {
      postLogin({ email, password })
    }
  })
}
