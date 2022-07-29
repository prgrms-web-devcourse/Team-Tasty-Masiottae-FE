import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsEye } from 'react-icons/bs'
import InputMessage from './InputMessage'
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
  ERROR_EMAIL
} from '@constants/inputConstant'

const handleSignupSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  e.preventDefault()
}

const Signup = () => {
  const [isTypePassword, setIsTypePassword] = useState(false)
  const [isTypeConfirmPassword, setIsTypeConfirmPassword] = useState(false)

  const handleEyeClick = useCallback((name: string) => {
    name === INPUT_PASSWORD
      ? setIsTypePassword((isTypePassword) => !isTypePassword)
      : setIsTypeConfirmPassword(
          (isTypeConfirmPassword) => !isTypeConfirmPassword
        )
  }, [])

  return (
    <SignupForm>
      <Title>회원 가입</Title>
      {/* //TODO신영: 내영님의 이미지 업로드 컴포넌트로 교체 */}
      <InputContainer>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_EMAIL}
            placeholder={PLACEHOLDER_EMAIL}
          />
          <InputMessage message={ERROR_EMAIL} isValid={false} />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_NICKNAME}
            placeholder={PLACEHOLDER_NICKNAME}
          />
          <InputMessage message={MESSAGE_NICKNAME} />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypePassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD}
            placeholder={PLACEHOLDER_PASSWORD}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD)
            }}
          />
          <InputMessage message={MESSAGE_PASSWORD} />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isTypeConfirmPassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD_CONFIRM}
            placeholder={PLACEHOLDER_PASSWORD_CONFIRM}
          />
          <ShowPasswordIcon
            onClick={() => {
              handleEyeClick(INPUT_PASSWORD_CONFIRM)
            }}
          />
          <InputMessage />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={TEXT}
            name={INPUT_SNS}
            placeholder={PLACEHOLDER_SNS}
          />
          <InputMessage message={MESSAGE_NICKNAME} />
        </InputWrapper>
      </InputContainer>
      <SignupButton height={7} onClick={handleSignupSubmit}>
        회원 가입
      </SignupButton>{' '}
    </SignupForm>
  )
}

const SignupButton = styled(Button)`
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

const SignupForm = styled.form`
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
  margin-top: 3rem;
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

const ShowPasswordIcon = styled(BsEye)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 2.8rem;
  top: 2.2rem;
  cursor: pointer;
`

export default Signup
