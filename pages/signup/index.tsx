import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Input, InputMessage, Button, ImageUploader } from '@components/common'
import { BsEye } from 'react-icons/bs'
import { useSignupMutation } from '@hooks/mutations/useSignupMutation'
import axios from '@lib/axios'
import {
  TEXT,
  INPUT_EMAIL,
  INPUT_NICKNAME,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_SNS,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CONFIRM,
  MESSAGE_NICKNAME,
  MESSAGE_PASSWORD,
  ERROR_EMAIL,
  ERROR_PASSWORD_CONFIRM,
  REGEX_EMAIL,
  REGEX_NICKNAME,
  REGEX_PASSWORD,
  MAX_PASSWORD,
  MAX_NICKNAME,
  MESSAGE_CHECK_AVAILABLE,
  AVAILABLE
} from '@constants/inputConstants'

interface SignUpValues {
  image?: File | null
  email: string
  nickName: string
  password: string
  passwordConfirm: string
  snsAccount?: string
}

const initialValues = {
  email: '',
  nickName: '',
  password: '',
  passwordConfirm: '',
  snsAccount: ''
}

const Signup = () => {
  const [isTypePassword, setIsTypePassword] = useState(false)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(false)
  const [values, setValues] = useState<SignUpValues>(initialValues)
  const [errors, setErrors] = useState<SignUpValues>(initialValues)
  const [isEmailCheck, setIsEmailCheck] = useState(false)
  const [isNickNameCheck, setIsNickNameCheck] = useState(false)
  const [checkSuccessText, setCheckSuccessText] = useState({
    email: '',
    nickName: ''
  })
  const { mutate: postSignup } = useSignupMutation()

  const handleSignUpSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { email, nickName, password } = values
    const isValidValues = email !== '' && nickName !== '' && password !== ''

    const isError = Object.keys(errors).filter(
      (key) => errors[key as keyof SignUpValues] !== ''
    ).length

    if (!isNickNameCheck) {
      setErrors({ ...errors, nickName: MESSAGE_CHECK_AVAILABLE })
    }

    if (!isEmailCheck) {
      setErrors({ ...errors, email: MESSAGE_CHECK_AVAILABLE })
    }

    if (!isError && isValidValues && isEmailCheck && isNickNameCheck) {
      postSignup(values)
    }
  }

  const handleCheckEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    setErrors({ ...errors, email: '' })
    const property = 'email'
    const value = values.email
    const { data } = await axios.get(
      `/accounts/check?property=${property}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, email: errorMessage })
      return
    }
    setIsEmailCheck(true)
    setCheckSuccessText({ ...checkSuccessText, [property]: AVAILABLE })
  }

  const handleCheckNickNameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    setErrors({ ...errors, nickName: '' })
    const property = 'nickName'
    const value = values.nickName
    const { data } = await axios.get(
      `/accounts/check?property=${property}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, nickName: errorMessage })
      return
    }
    setIsNickNameCheck(true)
    setCheckSuccessText({ ...checkSuccessText, [property]: AVAILABLE })
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === INPUT_EMAIL) {
      setErrors({ ...errors, [name]: '' })
      if (!REGEX_EMAIL.test(value)) {
        setErrors({ ...errors, [name]: ERROR_EMAIL })
      }
      setCheckSuccessText({ ...checkSuccessText, [name]: '' })
      setIsEmailCheck(false)
    }

    if (name === INPUT_NICKNAME) {
      setErrors({ ...errors, [name]: '' })
      e.target.value = value.replace(/\s/, '').slice(0, MAX_NICKNAME)

      if (!REGEX_NICKNAME.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_NICKNAME })
      }
      setCheckSuccessText({ ...checkSuccessText, [name]: '' })
      setIsNickNameCheck(false)
    }

    if (name === INPUT_PASSWORD) {
      setErrors({ ...errors, [name]: '' })
      e.target.value = value.replace(/\s/, '').slice(0, MAX_PASSWORD)

      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }

      if (values.passwordConfirm && values.passwordConfirm !== e.target.value) {
        setErrors({ ...errors, [name]: ERROR_PASSWORD_CONFIRM })
      }
    }

    if (name === INPUT_PASSWORD_CONFIRM) {
      setErrors({ ...errors, password: '', [name]: '' })
      e.target.value = value.replace(/\s/, '').slice(0, MAX_PASSWORD)

      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      if (values.password !== e.target.value) {
        setErrors({ ...errors, [name]: ERROR_PASSWORD_CONFIRM })
      }
    }
    setValues({ ...values, [name]: e.target.value })
  }

  const handleEyeClick = useCallback(() => {
    setIsTypePassword((isTypePassword) => !isTypePassword)
  }, [])

  const handleConfirmEyeClick = useCallback(() => {
    setIsTypeConfirmPassword((isTypeConfirmPassword) => !isTypeConfirmPassword)
  }, [])

  const handleImageChange = (file: File | null) => {
    setValues({ ...values, image: file })
  }

  return (
    <SignUpForm>
      <Title>회원 가입</Title>
      <ImageUploader shape="circle" size={14} onChange={handleImageChange} />
      <InputContainer>
        <InputWrapper>
          <TextInput
            type="text"
            isValid={errors[INPUT_EMAIL] === ''}
            name={INPUT_EMAIL}
            placeholder={PLACEHOLDER_EMAIL}
            onChange={handleSignUpChange}
          />
          <ExistCheckButton height={7} onClick={handleCheckEmailClick}>
            중복 확인
          </ExistCheckButton>
          <InputMessage
            isValid={errors[INPUT_EMAIL] === ''}
            errorMessage={errors[INPUT_EMAIL]}
            successMessage={checkSuccessText.email}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type="text"
            isValid={errors[INPUT_NICKNAME] === ''}
            name={INPUT_NICKNAME}
            placeholder={PLACEHOLDER_NICKNAME}
            onChange={handleSignUpChange}
          />
          <ExistCheckButton height={7} onClick={handleCheckNickNameClick}>
            중복 확인
          </ExistCheckButton>
          <InputMessage
            isValid={errors[INPUT_NICKNAME] === ''}
            errorMessage={errors[INPUT_NICKNAME]}
            successMessage={checkSuccessText.nickName}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypePassword ? 'text' : 'password'}
            isValid={errors[INPUT_PASSWORD] === ''}
            name={INPUT_PASSWORD}
            placeholder={PLACEHOLDER_PASSWORD}
            onChange={handleSignUpChange}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick()
            }}
          />
          <InputMessage errorMessage={errors[INPUT_PASSWORD]} />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypeConfirmPassword ? 'text' : 'password'}
            isValid={errors[INPUT_PASSWORD_CONFIRM] === ''}
            name={INPUT_PASSWORD_CONFIRM}
            placeholder={PLACEHOLDER_PASSWORD_CONFIRM}
            onChange={handleSignUpChange}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleConfirmEyeClick()
            }}
          />
          <InputMessage errorMessage={errors[INPUT_PASSWORD_CONFIRM]} />
        </InputWrapper>
      </InputContainer>
      <SignUpButton height={7} onClick={handleSignUpSubmit}>
        회원 가입
      </SignUpButton>
    </SignUpForm>
  )
}

const ExistCheckButton = styled(Button)`
  white-space: nowrap;
  width: 8rem;
  height: 4rem;
  border-radius: 1rem;
  background-color: black;
  padding: 0 0.1rem;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  position: absolute;
  right: 1rem;
  top: 0.7rem;
  cursor: pointer;
`

const SignUpButton = styled(Button)`
  width: 100%;
  height: 5.6rem;
  margin-top: 1rem;
  background-color: black;
  border-radius: 1rem;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const Title = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 2.8rem;
  font-weight: 700;
`

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputWrapper = styled.div`
  position: relative;
`

const TextInput = styled(Input)`
  width: 100%;
  height: 5.6rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.8rem;
`

const ShowPasswordIcon = styled(BsEye)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 2.8rem;
  top: 1.7rem;
  cursor: pointer;
`

export default Signup
