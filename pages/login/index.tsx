import styled from '@emotion/styled'
import Input from '@components/Input'
import {
  INPUT_EMAIL,
  PLACEHOLDER_EMAIL,
  INPUT_PASSWORD,
  PLACEHOLDER_PASSWORD,
  REGEX_PASSWORD,
  REGEX_EMAIL
} from '@constants/inputConstant'
import React, { useState, useCallback } from 'react'
import { BsEye } from 'react-icons/bs'
import Button from '@components/Button'

interface Errors {
  email?: string
  password?: string
}

const LoginPage = () => {
  const [emailIsValid, setEmailIsValid] = useState(true)
  const [passwordIsValid, setPasswordIsValid] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [isTypePassword, setIsTypePassword] = useState(false)

  const handleEyeClick = useCallback(() => {
    setIsTypePassword((isTypePassword) => !isTypePassword)
  }, [])

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    const newErrors: Errors = {}

    if (name === INPUT_PASSWORD) {
      if (value.length > 10) {
        e.target.value = value.slice(0, 10)
      }
      if (!REGEX_PASSWORD.test(value)) {
        newErrors.password = '8-10자 사이로 공백없이 입력해주세요'
        setPasswordIsValid(false)
      }
      setPassword(e.target.value)
    }
    if (name === INPUT_EMAIL) {
      if (!REGEX_EMAIL.test(value)) {
        newErrors.email = '이메일 형식으로 입력해주세요.'
        setEmailIsValid(false)
      }
      setEmail(e.target.value)
    }

    setErrors(newErrors)
    !newErrors.password && setPasswordIsValid(true)
    !newErrors.email && setEmailIsValid(true)
  }

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <LoginForm>
        <InputWrapper>
          <EmailInput
            type="text"
            name={INPUT_EMAIL}
            isValid={emailIsValid}
            onChange={validate}
            placeholder={PLACEHOLDER_EMAIL}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <PasswordInput
            type={isTypePassword ? 'password' : 'text'}
            name={INPUT_PASSWORD}
            isValid={passwordIsValid}
            onChange={validate}
            placeholder={PLACEHOLDER_PASSWORD}
          />
          <ShowPasswordIcon onClick={handleEyeClick} />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputWrapper>
        <ChangePasswordButton onClick={handleLoginSubmit}>
          로그인
        </ChangePasswordButton>
      </LoginForm>
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
  margin: 0 0.5rem 0 0.5rem;
  padding: 2.2rem 2.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 2rem 0 0 0;
  padding-bottom: 9rem;
`

const Title = styled.div`
  margin: 4rem 0 0 2.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 2.8rem;
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`

const EmailInput = styled(Input)`
  width: 100%;
  height: 7rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.7rem;
  margin-top: 2rem;
`

const PasswordInput = styled(Input)`
  width: 100%;
  height: 7rem;
  border-radius: 1rem;
  padding-left: 2rem;
  font-size: 1.7rem;
  margin-top: 2rem;
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
  top: 4rem;
  cursor: pointer;
`

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 7rem;
  margin-top: 4rem;
  background-color: black;
  border-radius: 1rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 500;
  cursor: pointer;
`

export default LoginPage