import styled from '@emotion/styled'
import { useState, useCallback } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsEye } from 'react-icons/bs'
import {
  PLACEHOLDER_EDIT_PASSWORD,
  PLACEHOLDER_EDIT_PASSWORD_CONFIRM,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  MESSAGE_PASSWORD,
  ERROR_PASSWORD_CONFIRM,
  REGEX_PASSWORD
} from '@constants/inputConstant'
import InputMessage from '@components/InputMessage'

interface Errors {
  password: string
  passwordConfirm: string
}

const PasswordEditPage = () => {
  const [password, setPassword] = useState('')
  const [isTypePassword, setIsTypePassword] = useState(false)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    password: '',
    passwordConfirm: ''
  })

  const handleEyeClick = useCallback((name: string) => {
    name === INPUT_PASSWORD
      ? setIsTypePassword((isTypePassword) => !isTypePassword)
      : setIsTypeConfirmPassword(
          (isTypeConfirmPassword) => !isTypeConfirmPassword
        )
  }, [])

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    e.target.value = value.slice(0, 10)
    setErrors({
      password: '',
      passwordConfirm: ''
    })
    if (name === INPUT_PASSWORD) {
      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      setPassword(e.target.value)
    }
    if (name === INPUT_PASSWORD_CONFIRM) {
      if (!REGEX_PASSWORD.test(value)) {
        setErrors({ ...errors, [name]: MESSAGE_PASSWORD })
      }
      if (password !== e.target.value) {
        setErrors({ ...errors, [name]: ERROR_PASSWORD_CONFIRM })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isError = Object.keys(errors).some(
      (key) => errors[key as keyof typeof errors] !== ''
    )
    if (password && !isError) {
      console.log(password)
    }
  }
  return (
    <UserContainer>
      <Title>비밀번호 변경</Title>
      <UserEditForm onSubmit={handleSubmit}>
        <InputWrapper>
          <PasswordInput
            type={isTypePassword ? 'text' : 'password'}
            name={INPUT_PASSWORD}
            isValid={errors[INPUT_PASSWORD] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD)
            }}
          />
          <InputMessage errorMessage={errors[INPUT_PASSWORD]} />
        </InputWrapper>
        <InputWrapper>
          <PasswordInput
            type={isTypeConfirmPassword ? 'text' : 'password'}
            name={INPUT_PASSWORD_CONFIRM}
            isValid={errors[INPUT_PASSWORD_CONFIRM] === ''}
            onChange={validate}
            placeholder={PLACEHOLDER_EDIT_PASSWORD_CONFIRM}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD_CONFIRM)
            }}
          />
          <InputMessage errorMessage={errors[INPUT_PASSWORD_CONFIRM]} />{' '}
        </InputWrapper>
        <ChangePasswordButton>완료</ChangePasswordButton>
      </UserEditForm>
    </UserContainer>
  )
}

const Title = styled.div`
  margin: 3rem 0 4rem 0.5rem;
  text-align: left;
  font-weight: 700;
  font-size: 2.8rem;
`

const UserContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
`

const UserInfo = styled.div`
  text-align: center;
  margin: 5rem auto 0 auto;
  position: relative;
`

const UserEditForm = styled.form`
  padding-bottom: 9rem;
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 1rem;
`

const PasswordInput = styled(Input)`
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

const ChangePasswordButton = styled(Button)`
  width: 100%;
  height: 5.6rem;
  margin-top: 3rem;
  background-color: ${(props) => props.theme.color.mainBlack};
  border-radius: 1rem;
  color: ${(props) => props.theme.color.mainWhite};
  font-size: 1.8rem;
  font-weight: 700;
  cursor: pointer;
`

export default PasswordEditPage
