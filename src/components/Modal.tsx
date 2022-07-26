import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import useClickAway from '@hooks/useClickAway'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  width?: number
  height?: number
  visible: boolean
  onClose: () => void
}

const Modal = ({ children, width, height, visible = true, onClose }: Props) => {
  const ref = useClickAway(onClose)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setElement(document.getElementById('portal'))
  }, [])

  if (!element) {
    return <></>
  }

  // Modal 컴포넌트를 root가 아닌 document.body에 붙임
  return ReactDOM.createPortal(
    <BackgroundDim visible={visible}>
      <ModalContainer ref={ref} width={width} height={height}>
        {children}
        <div></div>
      </ModalContainer>
    </BackgroundDim>,
    element
  )
}

// Dim은 모달 외 부분
const BackgroundDim = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const ModalContainer = styled.div<{
  width: number | undefined
  height: number | undefined
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  padding: 0.8rem;
  background-color: white;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
`

export default Modal
