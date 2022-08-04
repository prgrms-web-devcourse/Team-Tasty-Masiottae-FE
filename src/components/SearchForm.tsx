import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import Input from '@components/Input'
import { FiSearch } from 'react-icons/fi'
import useForm from '@hooks/useForm'
import Modal from './Modal'
import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import TagContainer from './TagContainer'

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
  const router = useRouter()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTagList, setSelectedTagList] = useState<Array<number>>([])
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      keyword: ''
    },
    onSubmit: (values) => {
      const res = {
        keyword: values.keyword,
        sort: router.query.sort,
        tasteIdList: selectedTagList
      }
      return res
    },
    validate
  })

  const handleFilterClick = () => setModalVisible(true)
  const handleModalClose = () => setModalVisible(false)

  const handleSortOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, sort: e.target.value }
    })
  }

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
      <ErrorMessage>
        {Object.keys(errors).length > 0 && Object.values(errors)}
      </ErrorMessage>
      <OptionContainer>
        <FilterWrapper onClick={handleFilterClick}>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <Modal visible={modalVisible} onClose={handleModalClose}>
          <TagContainer
            selectedTasteIdList={selectedTagList}
            backgroundColor="white"
            gap={2}
            tagHeight={3.3}
            onChange={(newTagList) => {
              setSelectedTagList([...newTagList])
            }}
          />
        </Modal>
        <select onChange={handleSortOptionChange}>
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
