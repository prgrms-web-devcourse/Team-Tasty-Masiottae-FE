import styled from '@emotion/styled'
import { useFranchiseList } from '@hooks/queries/useFranchiseList'
import { NAME_SELECT } from '@constants/menuConstant'

interface Props {
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void
}

const FranchiseSelect = ({ onChange }: Props) => {
  const { data: franchiseList } = useFranchiseList()

  return (
    <Select name={NAME_SELECT} onChange={onChange}>
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
`

export default FranchiseSelect
