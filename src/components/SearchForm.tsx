import styled from '@emotion/styled'
import { BsFilterLeft } from 'react-icons/bs'
import Input from '@components/Input'
import { FiSearch } from 'react-icons/fi'

interface Props {
  sortOptions: string[]
}

const PLACEHOLDER_SEARCH_INPUT = '메뉴 검색'

const SearchForm = ({ sortOptions }: Props) => {
  return (
    <>
      <SearchWrapper>
        <SearchInput
          height={5}
          type="text"
          placeholder={PLACEHOLDER_SEARCH_INPUT}
        />
        <SearchIcon />
      </SearchWrapper>
      <OptionContainer>
        <FilterWrapper>
          <FilterIcon />
          <Text>필터</Text>
        </FilterWrapper>
        <select>
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </OptionContainer>
    </>
  )
}

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
