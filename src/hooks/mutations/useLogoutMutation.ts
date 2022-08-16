import axios from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import { removeTokenData, getTokenData } from '@utils/cookie'
import { useRouter } from 'next/router'

const postLogout = async () => {
  const { currentUser, tastyToken, tastyRefreshToken } = getTokenData()
  await axios.post(
    '/logout',
    JSON.stringify({
      email: currentUser.email,
      accessToken: tastyToken,
      refreshToken: `${tastyRefreshToken}`
    })
  )
}

export const useLogoutMutation = () => {
  const router = useRouter()
  return useMutation(postLogout, {
    onSuccess: () => {
      removeTokenData()
      router.reload()
    }
  })
}
