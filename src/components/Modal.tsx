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
  option?: 'drawer'
  className?: string
}

const Modal = ({
  children,
  width,
  height,
  visible,
  onClose,
  option,
  className
}: Props) => {
  const ref = useClickAway(onClose)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setElement(document.getElementById('portal'))
  }, [])

  if (!element) {
    return <></>
  }

  return ReactDOM.createPortal(
    <BackgroundDim
      visible={visible}
      onClick={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <ModalContainer
        ref={ref}
        width={width}
        height={height}
        option={option}
        className={className}
      >
        {children}
        <div></div>
      </ModalContainer>
    </BackgroundDim>,
    element
  )
}

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
  option: 'drawer' | undefined
}>`
  position: fixed;
  top: ${({ option }) => (option !== 'drawer' ? '50%' : '')};
  bottom: ${({ option }) => (option === 'drawer' ? 0 : '')};
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  width: ${({ option }) => (option === 'drawer' ? `100%` : '45rem')};
  max-width: 50rem;
  height: ${({ height }) => `${height}rem`};
  padding: 1rem 0;
  background-color: white;
  box-shadow: 0 0.3rem 0.6rem rgba(0, 0, 0, 0.2);
  animation: ${({ option }) => (option === 'drawer' ? 'drawer-show 0.3s' : '')};

  @keyframes drawer-show {
    from {
      opacity: 0;
      margin-bottom: -5rem;
    }
    to {
      opacity: 1;
      margin-bottom: 0;
    }
  }

  @media screen and (max-width: 29.375rem) {
    width: ${({ option }) => (option === 'drawer' ? `100%` : '90%')};
  }
`

export default Modal
