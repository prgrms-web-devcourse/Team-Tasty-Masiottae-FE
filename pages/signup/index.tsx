import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsEye } from 'react-icons/bs'
import { useSignupMutation } from '@hooks/mutations/useSignupMutation'
import axios from '@lib/axios'
import {
  TEXT,
  PASSWORD,
  INPUT_EMAIL,
  INPUT_NICKNAME,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_SNS,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CONFIRM,
  PLACEHOLDER_SNS,
  MESSAGE_NICKNAME,
  MESSAGE_PASSWORD,
  ERROR_EMAIL,
  ERROR_PASSWORD_CONFIRM,
  REGEX_EMAIL,
  REGEX_NICKNAME,
  REGEX_PASSWORD,
  MAX_PASSWORD,
  MAX_NICKNAME
} from '@constants/inputConstant'
import ImageUploader from '@components/ImageUploader'

interface SignUpValues {
  image?: File
  email: string
  nickName: string
  password: string
  passwordConfirm?: string
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
  const { mutate: postSignup } = useSignupMutation()

  const handleSignUpSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isError = Object.keys(errors).filter(
      (key) => errors[key as keyof SignUpValues] !== ''
    ).length
    const { email, nickName, password } = values
    const isValues = email !== '' && nickName !== '' && password !== ''

    !isError && isValues && postSignup(values)
  }

  const handleEyeClick = useCallback((name: string) => {
    name === INPUT_PASSWORD
      ? setIsTypePassword((isTypePassword) => !isTypePassword)
      : setIsTypeConfirmPassword(
          (isTypeConfirmPassword) => !isTypeConfirmPassword
        )
  }, [])

  const handleImageChange = (file: File) => {
    setValues({ ...values, image: file })
  }

  const handleCheckEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const property = 'email'
    const value = values.email
    const { data } = await axios.get(
      `/accounts/check?property=${property}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, email: errorMessage })
    }
  }

  const handleCheckNickNameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const property = 'nickName'
    const value = values.nickName
    const { data } = await axios.get(
      `/accounts/check?property=${property}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, nickName: errorMessage })
    }
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setErrors(initialValues)

    if (name === INPUT_EMAIL) {
      if (!REGEX_EMAIL.test(value)) {
        setErrors({ ...errors, [name]: ERROR_EMAIL })
      }
    }

    if (name === INPUT_NICKNAME) {
      e.target.value = value.replace(/\s/, '').slice(0, MAX_NICKNAME)

      if (!REGEX_NICKNAME.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_NICKNAME })
      }
    }

    if (name === INPUT_PASSWORD) {
      e.target.value = value.replace(/\s/, '').slice(0, MAX_PASSWORD)

      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
    }

    if (name === INPUT_PASSWORD_CONFIRM) {
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

  return (
    <SignUpForm>
      <Title>회원 가입</Title>
      <ImageUploader onChange={handleImageChange} />
      <InputContainer>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_EMAIL}
            placeholder={PLACEHOLDER_EMAIL}
            onChange={handleSignUpChange}
          />{' '}
          <ExistCheckButton height={7} onClick={handleCheckEmailClick}>
            중복 확인
          </ExistCheckButton>
          <ErrorText>{errors[INPUT_EMAIL]}</ErrorText>
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_NICKNAME}
            placeholder={PLACEHOLDER_NICKNAME}
            onChange={handleSignUpChange}
          />{' '}
          <ExistCheckButton height={7} onClick={handleCheckNickNameClick}>
            중복 확인
          </ExistCheckButton>
          <ErrorText>{errors[INPUT_NICKNAME]}</ErrorText>
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypePassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD}
            placeholder={PLACEHOLDER_PASSWORD}
            onChange={handleSignUpChange}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD)
            }}
          />
          <ErrorText>{errors[INPUT_PASSWORD]}</ErrorText>
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypeConfirmPassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD_CONFIRM}
            placeholder={PLACEHOLDER_PASSWORD_CONFIRM}
            onChange={handleSignUpChange}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD_CONFIRM)
            }}
          />
          <ErrorText>{errors[INPUT_PASSWORD_CONFIRM]}</ErrorText>
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_SNS}
            placeholder={PLACEHOLDER_SNS}
          />
        </InputWrapper>
      </InputContainer>
      <SignUpButton height={7} onClick={handleSignUpSubmit}>
        회원 가입
      </SignUpButton>
    </SignUpForm>
  )
}

const ExistCheckButton = styled(Button)`
  width: 8rem;
  height: 5rem;
  border-radius: 1rem;
  background-color: black;
  padding: 0 0.1rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  position: absolute;
  right: 1.2rem;
  top: 1rem;
  cursor: pointer;
`

const SignUpButton = styled(Button)`
  width: 100%;
  height: 7rem;
  margin-top: 1rem;
  background-color: black;
  border-radius: 1rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 500;
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
  font-size: 4rem;
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
  height: 7rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.7rem;
`

const ErrorText = styled.span`
  text-align: left;
  margin-top: 1rem;
  margin-left: 1rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.mainRed};
`

const ShowPasswordIcon = styled(BsEye)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 2.8rem;
  top: 2.2rem;
  cursor: pointer;
`

export default Signup
