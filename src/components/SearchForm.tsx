import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import Input from '@components/Input'
import { FiSearch } from 'react-icons/fi'
import Modal from './Modal'
import { useState, ChangeEvent, FormEvent } from 'react'
import TagContainer from './TagContainer'
import { SearchFormOptions } from '@interfaces'
import Button from './Button'

interface Props {
  sortOptions: SortOption[]
  onSubmit: (values: SearchFormOptions) => void
}

interface SortOption {
  label: string
  value: string
}

const PLACEHOLDER_SEARCH_INPUT = '메뉴 검색'

const SearchForm = ({ sortOptions, onSubmit }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [tasteIdList, setTasteIdList] = useState<Array<number>>([])
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('')

  const handleFilterClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

  const handleSortOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
    onSubmit({ keyword, tasteIdList, sort: e.target.value })
  }

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ keyword, tasteIdList, sort })
    console.log({ keyword, tasteIdList, sort })
  }

  return (
    <form onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchInput
          value={keyword}
          height={5}
          type="text"
          placeholder={PLACEHOLDER_SEARCH_INPUT}
          onChange={handleKeywordChange}
        />
        <SearchIcon />
      </SearchWrapper>
      <ErrorMessage></ErrorMessage>
      <OptionContainer>
        <FilterWrapper onClick={handleFilterClick}>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <Modal visible={modalVisible} onClose={handleModalClose}>
          <form onSubmit={handleSubmit}>
            <TagContainer
              selectedTasteIdList={tasteIdList}
              backgroundColor="white"
              gap={2}
              tagHeight={3.3}
              onChange={(newTagList) => {
                setTasteIdList(newTagList)
              }}
            />
            <Button onClick={handleModalClose}>제출</Button>
          </form>
        </Modal>
        <select onChange={handleSortOptionChange}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
  height: 2rem;
  padding: 1rem;
  box-sizing: border-box;
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
