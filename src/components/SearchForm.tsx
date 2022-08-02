import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import Input from '@components/Input'
import { FiSearch } from 'react-icons/fi'
import useForm from '@hooks/useForm'
import Modal from './Modal'
import { useState } from 'react'

interface Props {
  sortOptions: string[]
}

interface SearchInput {
  keyword: string
}

interface FormError {
  length?: string
}

const PLACEHOLDER_SEARCH_INPUT = '메뉴 검색'

const validate = ({ keyword }: SearchInput) => {
  const result: FormError = {}

  if (keyword.length < 2) {
    result.length = '2글자 이상 입력해주세요!'
  }

  return result
}

const SearchForm = ({ sortOptions }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: ''
    },
    onSubmit: ({ keyword }) => {
      alert(`${keyword} submitted!`)
    },
    validate
  })

  const handleFilterClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

  return (
    <form onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchInput
          name="keyword"
          value={values.keyword}
          height={5}
          type="text"
          placeholder={PLACEHOLDER_SEARCH_INPUT}
          onChange={handleChange}
        />
        <SearchIcon />
      </SearchWrapper>
      {Object.keys(errors).length > 0 && (
        <ErrorMessage>{Object.values(errors)}</ErrorMessage>
      )}
      <OptionContainer>
        <FilterWrapper onClick={handleFilterClick}>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <Modal visible={modalVisible} onClose={handleModalClose}>
          모달이여
        </Modal>
        <select>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </OptionContainer>
    </form>
  )
}

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`
const SearchInput = styled(Input)`
  width: 100%;
`

const ErrorMessage = styled.div`
  font-size: 1.6rem;
  color: red;
`

const SearchIcon = styled(FiSearch)`
  font-size: 2.5rem;
  margin-left: -3.5rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

const FilterIcon = styled(BsFilterLeft)`
  font-size: 3.5rem;
  font-weight: bold;
`

const Text = styled.span`
  font-size: 2rem;
  user-select: none;
`

export default SearchForm
