import styled from '@emotion/styled'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import { NAME_SELECT } from '@constants/menuConstant'

const PLACEHOLDER_FRANCHISE_LIST = '해당하는 프랜차이즈를 선택해주세요'
interface Props {
  defaultValue?: number
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void
}

const FranchiseSelect = ({ defaultValue, onChange }: Props) => {
  const { franchiseList } = useFranchiseList()

  return (
    <Select name={NAME_SELECT} onChange={onChange} value={defaultValue}>
      <option key={0} value={0} disabled>
        {PLACEHOLDER_FRANCHISE_LIST}
      </option>
      {franchiseList?.map((franchise) => (
        <option key={franchise.id} value={franchise.id}>
          {franchise.name}
        </option>
      ))}
    </Select>
  )
}

const Select = styled.select`
  width: 100%;
  height: 4.8rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
`

export default FranchiseSelect
