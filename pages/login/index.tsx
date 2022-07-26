import styled from '@emotion/styled'
import { Input, Button, InputMessage } from '@components/common'
import {
  INPUT_EMAIL,
  INPUT_PASSWORD,
  PLACEHOLDER_EMAIL,
  PLACEHOLDER_PASSWORD,
  MESSAGE_PASSWORD,
  ERROR_EMAIL,
  ERROR_PASSWORD_CONFIRM,
  ERROR_NOT_FOUND_USER
} from '@constants/inputConstants'
import React, { useState, useCallback } from 'react'
import { BsEye } from 'react-icons/bs'
import { useLoginMutation } from '@hooks/mutations/useLoginMutation'
import Link from 'next/link'
import useValidate from '@hooks/common/useUserValidate'

const LoginPage = () => {
  const [isTypePassword, setIsTypePassword] = useState(false)
  const { mutate: postLogin } = useLoginMutation()
  const { values, errors, setErrors, validate } = useValidate()
  const { email, password } = values

  const handleLoginSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!password) {
      setErrors({ ...errors, [INPUT_PASSWORD]: MESSAGE_PASSWORD })
    }

    if (!email) {
      setErrors({ ...errors, [INPUT_EMAIL]: ERROR_EMAIL })
    }

    const isError = Object.keys(errors).some(
      (key) => errors[key as keyof typeof errors] !== ''
    )

    if (email && password && !isError) {
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
