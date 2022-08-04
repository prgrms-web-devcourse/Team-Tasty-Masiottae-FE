import React, { useState } from 'react'
import MenuDetail from '@components/_detail/MenuDetail'
import CommentInput from '@components/_detail/CommentInput'
import CommentList from '@components/_detail/CommentList'

const Detail = () => {
  const [user, setUser] = useState({
    id: 111,
    name: '계란이 조아',
    profileImageUrl: 'https://via.placeholder.com/300x150'
  })

  return (
    <>
      <MenuDetail />
      <CommentInput />
      <CommentList />
    </>
  )
}

export default Detail
