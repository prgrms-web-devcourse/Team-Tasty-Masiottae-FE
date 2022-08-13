import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import Input from '@components/Input'
import { FiSearch } from 'react-icons/fi'
import Modal from './Modal'
import { useState, ChangeEvent, FormEvent } from 'react'
import { SearchFormOptions } from '@interfaces'
import SortOption from './SortOption'
import FilterForm from './FilterForm'

interface Props {
  onSubmit: (values: SearchFormOptions) => void
}

interface SortOption {
  label: string
  value: string
}

const PLACEHOLDER_SEARCH_INPUT = '메뉴 검색'

const SearchForm = ({ onSubmit }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [tasteIdList, setTasteIdList] = useState<number[]>([])
  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState('recent')

  const handleFilterClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

  const handleSortChange = (value: string) => {
    setSort(value)
    onSubmit({ keyword, tasteIdList, sort: value })
  }

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ keyword, tasteIdList, sort })
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <OptionContainer>
        <SortOption selectedValue={sort} onChange={handleSortChange} />
        <FilterWrapper onClick={handleFilterClick}>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <FilterModal visible={modalVisible} onClose={handleModalClose}>
          <FilterForm
            onSubmit={handleSubmit}
            tasteIdList={tasteIdList}
            onClose={handleModalClose}
            onChange={(newTagList) => {
              setTasteIdList(newTagList)
            }}
          />
        </FilterModal>
      </OptionContainer>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`
const SearchInput = styled(Input)`
  width: 100%;
`

const SearchIcon = styled(FiSearch)`
  font-size: 2.5rem;
  margin-left: -3.5rem;
`

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-weight: 700;
`

const FilterModal = styled(Modal)`
  border-radius: 1rem;
  margin-top: 2rem;
  top: 20rem;
`

export default SearchForm
