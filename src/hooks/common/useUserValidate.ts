import { useState } from 'react'
import {
  INPUT_EMAIL,
  INPUT_NICKNAME,
  REGEX_EMAIL,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  MESSAGE_PASSWORD,
  MESSAGE_NICKNAME,
  ERROR_PASSWORD_CONFIRM,
  REGEX_PASSWORD,
  REGEX_NICKNAME,
  MAX_NICKNAME,
  MAX_PASSWORD,
  ERROR_EMAIL,
  INPUT_EMAIL_CHECK,
  INPUT_NICKNAME_CHECK
} from '@constants/inputConstants'

export interface UserFormValues {
  image?: File | null
  email: string
  nickNameCheck: string
  emailCheck: string
  nickName: string
  password: string
  passwordConfirm: string
}

const initialValues = {
  email: '',
  nickName: '',
  emailCheck: '',
  nickNameCheck: '',
  password: '',
  passwordConfirm: ''
}

const initialErrors = {
  email: '',
  nickName: '',
  emailCheck: '',
  nickNameCheck: '',
  password: '',
  passwordConfirm: ''
}

const useValidate = () => {
  const [values, setValues] = useState<UserFormValues>(initialValues)
  const [errors, setErrors] = useState(initialErrors)

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === INPUT_EMAIL) {
      setErrors({ ...errors, [name]: '', [INPUT_EMAIL_CHECK]: '' })
      if (!REGEX_EMAIL.test(value)) {
        setErrors({ ...errors, [name]: ERROR_EMAIL })
      }
    }

    if (name === INPUT_NICKNAME) {
      setErrors({ ...errors, [name]: '', [INPUT_NICKNAME_CHECK]: '' })
      e.target.value = value.replace(/\s/, '').slice(0, MAX_NICKNAME)

      if (!REGEX_NICKNAME.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_NICKNAME })
      }
    }

    if (name === INPUT_PASSWORD) {
      e.target.value = value.replace(/\s/, '').slice(0, MAX_PASSWORD)
      setErrors({ ...errors, [name]: '' })
      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      if (values.passwordConfirm === e.target.value) {
        setErrors({ ...errors, [INPUT_PASSWORD_CONFIRM]: '' })
      }
      if (
        values.passwordConfirm !== '' &&
        values.passwordConfirm !== e.target.value
      ) {
        setErrors({
          ...errors,
          [INPUT_PASSWORD_CONFIRM]: ERROR_PASSWORD_CONFIRM
        })
      }
    }

    if (name === INPUT_PASSWORD_CONFIRM) {
      e.target.value = value.replace(/\s/, '').slice(0, MAX_PASSWORD)
      setErrors({ ...errors, [name]: '' })
      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      if (values.password !== e.target.value) {
        setErrors({ ...errors, [name]: ERROR_PASSWORD_CONFIRM })
      }
    }

    setValues({ ...values, [name]: e.target.value })
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    validate
  }
}

export default useValidate
