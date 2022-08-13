import styled from '@emotion/styled'
import Input from '@components/Input'
import {
  INPUT_EMAIL,
  INPUT_PASSWORD,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PASSWORD,
  REGEX_PASSWORD,
  REGEX_EMAIL,
  MESSAGE_PASSWORD,
  ERROR_EMAIL,
  ERROR_PASSWORD_CONFIRM,
  ERROR_NOT_FOUND_USER
} from '@constants/inputConstants'
import React, { useState, useCallback } from 'react'
import { BsEye } from 'react-icons/bs'
import Button from '@components/Button'
import { useLoginMutation } from '@hooks/mutations/useLoginMutation'
import Link from 'next/link'
import InputMessage from '@components/InputMessage'

interface Errors {
  email: string
  password: string
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' })
  const [isTypePassword, setIsTypePassword] = useState(false)
  const { mutate: postLogin } = useLoginMutation()

  const handleLoginSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const isError = Object.keys(errors).some(
      (key) => errors[key as keyof typeof errors] !== ''
    )
    const isLoginValid = password && email && !isError
    if (isLoginValid) {
      postLogin(
        { email, password },
        {
          onError: handleLoginError
        }
      )
    }
  }

  const handleLoginError = useCallback(
    (error: any) => {
      const { message } = error.response.data

      if (message === ERROR_PASSWORD_CONFIRM) {
        setErrors({
          ...errors,
          [INPUT_PASSWORD]: ERROR_PASSWORD_CONFIRM
        })
        return
      }

      setErrors({
        ...errors,
        [INPUT_EMAIL]: ERROR_NOT_FOUND_USER
      })
    },
    [errors]
  )

  const handleEyeClick = useCallback(() => {
    setIsTypePassword((isTypePassword) => !isTypePassword)
  }, [])

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name === INPUT_PASSWORD) {
      setErrors({ ...errors, [name]: '' })
      if (value.length > 10) {
        e.target.value = value.slice(0, 10)
      }
      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      setPassword(e.target.value)
    }
    if (name === INPUT_EMAIL) {
      setErrors({ ...errors, [name]: '' })
      if (!REGEX_EMAIL.test(value)) {
        setErrors({ ...errors, [name]: ERROR_EMAIL })
      }
      setEmail(e.target.value)
    }
  }

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <LoginForm>
        <InputWrapper>
          <LoginInput
            type="text"
            name={INPUT_EMAIL}
            isValid={errors[INPUT_EMAIL] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_EMAIL}
          />
          <InputMessage errorMessage={errors[INPUT_EMAIL]} />
        </InputWrapper>
        <InputWrapper>
          <LoginInput
            type={isTypePassword ? 'text' : 'password'}
            name={INPUT_PASSWORD}
            isValid={errors[INPUT_PASSWORD] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_PASSWORD}
          />
          <ShowPasswordIcon onClick={handleEyeClick} />
          <InputMessage errorMessage={errors[INPUT_PASSWORD]} />
        </InputWrapper>
        <ChangePasswordButton onClick={handleLoginSubmit}>
          로그인
        </ChangePasswordButton>
      </LoginForm>
      <SignupText>
        아직 회원이 아니라면
        <Link href={'/signup'}>
          <SignUpAnchor>[회원가입]</SignUpAnchor>
        </Link>
      </SignupText>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Title = styled.div`
  margin-top: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  font-weight: 700;
  font-size: 2.8rem;
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`

const LoginInput = styled(Input)`
  width: 100%;
  height: 5.6rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.8rem;
  margin-top: 1rem;
`

const ShowPasswordIcon = styled(BsEye)`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: 2.8rem;
  top: 2.8rem;
  cursor: pointer;
`

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 5.6rem;
  margin-top: 3rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  border-radius: 1rem;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

const SignupText = styled.div`
  text-align: left;
  margin-top: 1rem;
  margin-left: 0.5rem;
  font-size: 1.6rem;
  font-weight: 700;
`
const SignUpAnchor = styled.a`
  color: ${(props) => props.theme.color.mainBlue};
  cursor: pointer;
`

export default LoginPage
