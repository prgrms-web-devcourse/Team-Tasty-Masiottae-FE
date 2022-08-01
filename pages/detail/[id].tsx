import React, { useState } from 'react'
import MenuDetail from '@components/Detail/MenuDetail'
import CommentInput from '@components/Detail/CommentInput'
import CommentList from '@components/Detail/CommentList'
import userDummy from '../../src/components/Detail/userDummy.json'

const Detail = () => {
  const [user, setUser] = useState(userDummy) // 로그인한 유저

  return (
    <>
      <MenuDetail />
      <CommentInput />
      <CommentList />
    </>
  )
}

export default Detail
