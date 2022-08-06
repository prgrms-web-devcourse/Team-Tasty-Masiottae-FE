import MenuDetail from '@components/detail/MenuDetail'
import CommentInput from '@components/detail/CommentInput'
import CommentList from '@components/detail/CommentList'
import { useRouter } from 'next/router'
import { useMenu } from '@hooks/queries/useMenu'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { useCommentList } from '@hooks/queries/useCommentList'

const Detail = () => {
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const [user] = useRecoilState(currentUser)
  const { data: menu, isSuccess: isMenuSuccess } = useMenu(id)
  const { data: commentList, isSuccess: isCommentListSuccess } =
    useCommentList(id)

  return (
    <>
      {isMenuSuccess && (
        <>
          <MenuDetail menu={menu} />
          <CommentInput menuId={menu.id} userId={user.id} />
        </>
      )}
      {isCommentListSuccess && (
        <CommentList user={user} commentList={commentList} />
      )}
    </>
  )
}

export default Detail
