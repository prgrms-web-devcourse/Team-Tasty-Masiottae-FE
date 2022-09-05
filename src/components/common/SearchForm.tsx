import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import { Input } from '@components/common'
import { FiSearch } from 'react-icons/fi'
import Modal from './Modal'
import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { SearchFormOptions } from '@interfaces'
import SortOption from './SortOption'
import FilterForm from './FilterForm'
interface Props {
  onSubmit: (values: SearchFormOptions) => void
  searchDomain?: string
  initialValue: SearchFormOptions
}

interface SortOption {
  label: string
  value: string
}

const PLACEHOLDER_SEARCH_INPUT = '메뉴 검색'

const SearchForm = ({ onSubmit, searchDomain, initialValue }: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [searchOptions, setSearchOptions] =
    useState<SearchFormOptions>(initialValue)
  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchOptions(initialValue)
  }, [searchDomain])

  const handleFilterClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

  const handleSortChange = (sort: string) => {
    setSearchOptions({ ...searchOptions, sort })
    onSubmit({ ...searchOptions, sort })
  }

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: keyword } = e.target
    setSearchOptions({ ...searchOptions, keyword })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(searchOptions)
    inputElement.current?.blur()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SearchWrapper>
        <SearchInput
          value={searchOptions.keyword}
          height={5}
          type="text"
          placeholder={PLACEHOLDER_SEARCH_INPUT}
          onChange={handleKeywordChange}
          InputRef={inputElement}
        />
        <SearchButton>
          <SearchIcon />
        </SearchButton>
      </SearchWrapper>
      <OptionContainer>
        <SortOption
          selectedValue={searchOptions.sort || 'recent'}
          onChange={handleSortChange}
        />
        <FilterWrapper onClick={handleFilterClick}>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <Modal visible={modalVisible} onClose={handleModalClose}>
          <FilterForm
            onSubmit={handleSubmit}
            tasteIdList={searchOptions.tasteIdList}
            onClose={handleModalClose}
            onChange={(newTagList) => {
              setSearchOptions({ ...searchOptions, tasteIdList: newTagList })
            }}
          />
        </Modal>
      </OptionContainer>
    </Form>
  )
}

const SearchButton = styled.button`
  font-size: 2.5rem;
  margin-top: 0.5rem;
  margin-left: -4.5rem;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
`

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

const SearchIcon = styled(FiSearch)``

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

export default SearchForm
