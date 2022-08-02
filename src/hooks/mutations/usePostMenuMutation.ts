import axios from '@lib/axios'
interface Option {
  name: string
  description: string
}

interface Params {
  userId: number
  franchiseId: number
  image: string
  title: string
  content: string
  originalTitle: string
  expectedPrice: number
  optionList: Option[]
  tasteIdList: number[]
}

const postMenu = async (form: Params) => {
  const formData = new FormData()
  for (const [key, value] of Object.entries(form)) {
    formData.append(key, JSON.stringify(value))
  }
  axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {})
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}
