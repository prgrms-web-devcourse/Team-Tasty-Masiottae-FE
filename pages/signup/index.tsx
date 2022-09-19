import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { Input, InputMessage, Button, ImageUploader } from '@components/common'
import { BsEye } from 'react-icons/bs'
import { useSignupMutation } from '@hooks/mutations/useSignupMutation'
import { useCheckedValue } from '@hooks/queries/useCheckedValue'
import axios from '@lib/axios'
import {
  INPUT_EMAIL,
  INPUT_NICKNAME,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_EMAIL_CHECK,
  INPUT_NICKNAME_CHECK,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_NICKNAME,
  PLACEHOLDER_PASSWORD,
  PLACEHOLDER_PASSWORD_CONFIRM,
  ERROR_PASSWORD_CONFIRM,
  MESSAGE_CHECK_AVAILABLE,
  AVAILABLE
} from '@constants/inputConstants'
import useValidate from '@hooks/common/useUserValidate'

const Signup = () => {
  const { values, setValues, errors, setErrors, validate } = useValidate()
  const [isTypePassword, setIsTypePassword] = useState(false)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(false)
  const [isEmailCheck, setIsEmailCheck] = useState(false)
  const [isNickNameCheck, setIsNickNameCheck] = useState(false)
  const [checkSuccessText, setCheckSuccessText] = useState({
    email: '',
    nickName: ''
  })
  const { mutate: postSignup } = useSignupMutation()

  const handleSignUpSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const { email, nickName, password, passwordConfirm } = values
      const isValidValues =
        email !== '' &&
        nickName !== '' &&
        password !== '' &&
        passwordConfirm !== ''

      const isError = Object.keys(errors).filter(
        (key) => errors[key as keyof typeof errors] !== ''
      ).length

      if (password !== passwordConfirm) {
        setErrors({
          ...errors,
          [INPUT_PASSWORD_CONFIRM]: ERROR_PASSWORD_CONFIRM
        })
      }

      if (!isNickNameCheck) {
        setErrors({
          ...errors,
          [INPUT_NICKNAME_CHECK]: MESSAGE_CHECK_AVAILABLE
        })
      }

      if (!isEmailCheck) {
        setErrors({ ...errors, [INPUT_EMAIL_CHECK]: MESSAGE_CHECK_AVAILABLE })
      }

      if (!isError && isValidValues && isEmailCheck && isNickNameCheck) {
        postSignup(values)
      }
    },
    [errors, setErrors, isEmailCheck, isNickNameCheck, postSignup, values]
  )

  const handleCheckEmailClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    setErrors({ ...errors, [INPUT_EMAIL_CHECK]: '' })
    const value = values.email
    const { data } = await axios.get(
      `/accounts/check?property=${INPUT_EMAIL}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, [INPUT_EMAIL_CHECK]: errorMessage })
      return
    }
    setIsEmailCheck(true)
    setCheckSuccessText({
      ...checkSuccessText,
      [INPUT_EMAIL]: AVAILABLE
    })
  }

  const handleCheckNickNameClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    setErrors({ ...errors, [INPUT_NICKNAME_CHECK]: '' })
    const value = values.nickName
    const { data } = await axios.get(
      `/accounts/check?property=${INPUT_NICKNAME}&value=${value}`
    )
    const { errorMessage } = data
    if (errorMessage) {
      setErrors({ ...errors, [INPUT_NICKNAME_CHECK]: errorMessage })
      return
    }
    setIsNickNameCheck(true)
    setCheckSuccessText({
      ...checkSuccessText,
      [INPUT_NICKNAME]: AVAILABLE
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    validate(e)
    setCheckSuccessText({ ...checkSuccessText, [name]: '' })
    setIsEmailCheck(false)
  }

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    validate(e)
    setCheckSuccessText({ ...checkSuccessText, [name]: '' })
    setIsNickNameCheck(false)
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
            isValid={
              errors[INPUT_EMAIL] === '' && errors[INPUT_EMAIL_CHECK] === ''
            }
            name={INPUT_EMAIL}
            placeholder={PLACEHOLDER_EMAIL}
            onChange={handleEmailChange}
          />
          <ExistCheckButton height={7} onClick={handleCheckEmailClick}>
            중복 확인
          </ExistCheckButton>
          <InputMessage
            isValid={
              errors[INPUT_EMAIL] === '' && errors[INPUT_EMAIL_CHECK] === ''
            }
            errorMessage={
              errors[INPUT_EMAIL]
                ? errors[INPUT_EMAIL]
                : errors[INPUT_EMAIL_CHECK]
            }
            successMessage={checkSuccessText.email}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type="text"
            isValid={
              errors[INPUT_NICKNAME] === '' &&
              errors[INPUT_NICKNAME_CHECK] === ''
            }
            name={INPUT_NICKNAME}
            placeholder={PLACEHOLDER_NICKNAME}
            onChange={handleNickNameChange}
          />
          <ExistCheckButton height={7} onClick={handleCheckNickNameClick}>
            중복 확인
          </ExistCheckButton>
          <InputMessage
            isValid={
              errors[INPUT_NICKNAME] === '' &&
              errors[INPUT_NICKNAME_CHECK] === ''
            }
            errorMessage={
              errors[INPUT_NICKNAME]
                ? errors[INPUT_NICKNAME]
                : errors[INPUT_NICKNAME_CHECK]
            }
            successMessage={checkSuccessText.nickName}
          />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypePassword ? 'text' : 'password'}
            isValid={errors[INPUT_PASSWORD] === ''}
            name={INPUT_PASSWORD}
            placeholder={PLACEHOLDER_PASSWORD}
            onChange={validate}
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
            onChange={validate}
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
