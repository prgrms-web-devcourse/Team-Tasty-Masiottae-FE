import theme from '@constants/theme'
import styled from '@emotion/styled'
import { ChangeEvent } from 'react'
import { SORT_OPTIONS } from '@constants/searchOption'

interface SortOptionProps {
  selectedValue: string
  onChange: (value: string) => void
}

interface TagProps {
  value: string
  label: string
  isClicked: boolean
  onChange: (value: string) => void
}

const SortOption = ({ selectedValue, onChange }: SortOptionProps) => {
  return (
    <SortTagWrapper>
      {SORT_OPTIONS.map((option) => (
        <SortTag
          key={option.label}
          value={option.value}
          label={option.label}
          isClicked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </SortTagWrapper>
  )
}

const SortTag = ({ value, label, isClicked, onChange }: TagProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <StyledTag isClicked={isClicked}>
      {label}
      <RadioButton
        type="radio"
        value={value}
        checked={isClicked}
        onChange={handleChange}
      />
    </StyledTag>
  )
}

const SortTagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const StyledTag = styled.label<{ isClicked: boolean }>`
  display: inline-flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background-color: ${({ isClicked }) =>
    isClicked ? theme.color.mainPink : theme.color.mainWhite};
  border: 1px solid ${theme.color.mainPink};
  padding: 0.5rem 1rem;
  color: ${({ isClicked }) =>
    isClicked ? theme.color.mainWhite : theme.color.mainPink};
  font-size: 1.4rem;
  font-weight: 400;
  cursor: pointer;
`

const RadioButton = styled.input`
  display: none;
`

export default SortOption
