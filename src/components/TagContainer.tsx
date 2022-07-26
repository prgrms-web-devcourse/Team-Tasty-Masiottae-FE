import styled from '@emotion/styled'
interface Props {
  width?: number
  height?: number
  gap?: number
  backgroundColor?: string
  children: React.ReactNode
}
const TagContainer = ({
  width,
  height,
  gap,
  backgroundColor = '#d9d9d9',
  children
}: Props) => {
  return (
    <Container
      width={width}
      height={height}
      gap={gap}
      backgroundColor={backgroundColor}
    >
      {children}
    </Container>
  )
}

const Container = styled.div<{
  width: number | undefined
  height: number | undefined
  gap: number | undefined
  backgroundColor: string
}>`
  width: ${({ width }) => (width ? `${width}rem` : '100%')};
  height: ${({ height }) => (height ? `${height}rem` : '100%')};
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 0 0.5rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow-y: scroll;
  gap: ${({ gap }) => (gap ? `${gap}rem` : '0.4rem')};
  ::-webkit-scrollbar {
    display: none;
  }
`
export default TagContainer
