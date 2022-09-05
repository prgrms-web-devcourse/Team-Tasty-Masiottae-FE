import React, { useState, useEffect } from 'react'
import { Option } from '@interfaces'
import { useMenu } from '@hooks/queries/useMenu'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import PostMenuPage from '@components/post-menu/postMenuPage'

export interface InputListType {
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  isPriceButtonClicked: boolean
}

interface MenuData {
  menuImage: string | null
  franchiseId: number
  title: string
  originalTitle: string
  optionList: Option[]
  expectedPrice: number
  tasteIdList: number[]
}

const EditMenu = () => {
  const router = useRouter()
  const { id } = router.query
  const user = useRecoilValue(currentUser)
  const { data } = useMenu(Number(id))

  const [menuData, setMenuData] = useState<MenuData>({
    menuImage: null,
    franchiseId: 0,
    title: '',
    originalTitle: '',
    optionList: [],
    tasteIdList: [],
    expectedPrice: 0
  })

  useEffect(() => {
    if (data) {
      if (data.author.id !== user.id) {
        alert('글쓴이만 수정할 수 있어요')
        router.replace(`/detail/${id}`)
      }

      const {
        image,
        franchise,
        title,
        originalTitle,
        optionList,
        expectedPrice,
        tasteList
      } = data

      setMenuData((menuData) => {
        return {
          ...menuData,
          menuImage: image,
          franchiseId: franchise.id,
          title,
          originalTitle,
          optionList,
          expectedPrice,
          tasteIdList: tasteList.map((taste) => taste.id)
        }
      })
    }
  }, [data, id, router, user.id])

  return (
    <PostMenuPage
      menuId={Number(id)}
      menuImage={menuData.menuImage}
      franchiseId={menuData.franchiseId}
      title={menuData.title}
      originalTitle={menuData.originalTitle}
      optionList={menuData.optionList}
      expectedPrice={menuData.expectedPrice}
      tasteIdList={menuData.tasteIdList}
    />
  )
}

export default EditMenu
