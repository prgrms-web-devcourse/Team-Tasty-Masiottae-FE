import styled from '@emotion/styled'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import { NAME_SELECT } from '@constants/menuConstant'

interface Props {
  defaultValue?: number
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void
}

const FranchiseSelect = ({ defaultValue, onChange }: Props) => {
  const { franchiseList } = useFranchiseList()

  return (
    <Select name={NAME_SELECT} onChange={onChange} value={defaultValue}>
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
  border-radius: 6px;
  margin-bottom: 0.8rem;
`

export default FranchiseSelect
