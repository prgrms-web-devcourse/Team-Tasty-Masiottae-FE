import theme from '@constants/theme'
import styled from '@emotion/styled'
import { FormEvent } from 'react'
import Button from './Button'
import TagContainer from './TagContainer'

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onChange: (value: number[]) => void
  onClose: () => void
  tasteIdList: number[]
}

const FilterForm = ({ tasteIdList, onSubmit, onChange, onClose }: Props) => {
  return (
    <Form onSubmit={onSubmit}>
      <Title>필터</Title>
      <TagContainer
        selectedTasteIdList={tasteIdList}
        backgroundColor="white"
        gap={0.8}
        height={15}
        tagHeight={3}
        onChange={onChange}
      />
      <FormButton
        backgroundColor={theme.color.mainBlack}
        onClick={onClose}
        height={5.6}
        fontSize={1.6}
        color={theme.color.mainWhite}
      >
        필터 적용
      </FormButton>
    </Form>
  )
}

const FormButton = styled(Button)`
  font-weight: 700;
  margin-bottom: -0.5rem;
`

const Title = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
`

const Form = styled.form`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

export default FilterForm
