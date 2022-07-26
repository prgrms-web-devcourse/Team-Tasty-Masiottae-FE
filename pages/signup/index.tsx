import styled from '@emotion/styled'
import theme from '@constants/theme'
import { useRef, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import Input from '@components/Input'
import Button from '@components/Button'
import { BsEye } from 'react-icons/bs'
import InputMessage from './InputMessage'
import {
  FILE,
  TEXT,
  PASSWORD,
  INPUT_EMAIL,
  INPUT_NICKNAME,
  INPUT_PASSWORD,
  INPUT_PASSWORD_CONFIRM,
  INPUT_SNS,
  FILE_TYPE,
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
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
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
            type={isShowPassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD}
            placeholder={PLACEHOLDER_PASSWORD}
          />
          <StyledEye
            onClick={() =>
              setIsShowPassword((isShowPassword) => !isShowPassword)
            }
          />
          <InputMessage message={MESSAGE_PASSWORD} />
        </InputWrapper>
        <InputWrapper>
          <TextInput
            type={isShowConfirmPassword ? TEXT : PASSWORD}
            name={INPUT_PASSWORD_CONFIRM}
            placeholder={PLACEHOLDER_PASSWORD_CONFIRM}
          />
          <StyledEye
            onClick={() =>
              setIsShowConfirmPassword(
                (isShowConfirmPassword) => !isShowConfirmPassword
              )
            }
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

      <StyledButton height={7} onClick={handleSignupSubmit}>
        회원 가입
      </StyledButton>
    </SignupForm>
  )
}

const StyledButton = styled(Button)`
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

const ImageContainer = styled.div`
  margin-top: 1rem;
  width: 50%;
  position: relative;
  border-radius: 50%;
`

const ImageLoad = styled.div`
  width: 100%;
  border-radius: 50%;
  background-color: ${theme.color.backgroundNormal};
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
    border-radius: 50%;
  }
`

const ImageInner = styled.div`
  position: absolute;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const ImageInput = styled.input`
  display: none;
`

const StyledPlus = styled(BsPlusLg)`
  width: 5rem;
  height: 5rem;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
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

const StyledEye = styled(BsEye)`
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  right: 2.8rem;
  top: 2.2rem;
  cursor: pointer;
`

export default Signup
