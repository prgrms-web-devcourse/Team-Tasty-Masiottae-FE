import Button from '@components/Button'
import styled from '@emotion/styled'
import useClickAway from '@hooks/useClickAway'

interface Props {
  onFileChange: (src: string) => void
  onProfileSubmit: React.FormEventHandler<HTMLFormElement>
  onClose: () => void
  currentProfile: string
}

const ChangeProfileModal = ({
  onFileChange,
  onProfileSubmit,
  onClose,
  currentProfile
}: Props) => {
  const ref = useClickAway(() => {
    onClose && onClose()
  })
  return (
    <BackgroundDim>
      <Modal ref={ref}>
        <Text>프로필 사진을 변경하시겠어요?</Text>
        <ModalButton>확인</ModalButton>
      </Modal>
    </BackgroundDim>
  )
}

export default ChangeProfileModal

const Text = styled.div`
  font-size: 2rem;
  font-weight: 700;
`

const Modal = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.5rem;
  background-color: white;
  box-shadow: rgb(99 99 99 / 14%) 0 0.2rem 0.6rem 0.2rem;
  box-sizing: border-box;
  max-width: 39rem;
  width: 90%;
  border-radius: 1.5rem;
  text-align: center;
`

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  width: 50rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const ModalButton = styled(Button)`
  width: 100%;
  font-size: 1.7rem;
  font-weight: 700;
  height: 6rem;
  border-radius: 1.2rem;
  margin-top: 2rem;
`
