import { Menu } from '../types/index'

interface Props {
  menuList: Menu[]
}

const MenuCardList = ({ menuList }: Props) => {
  return <div>{menuList}</div>
}

export default MenuCardList
