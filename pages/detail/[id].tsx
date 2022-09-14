import MenuDetail from '@components/detail/MenuDetail'
import CommentInput from '@components/detail/CommentInput'
import CommentList from '@components/detail/CommentList'
import { useRouter } from 'next/router'
import { useMenu } from '@hooks/queries/useMenu'
import { useRecoilState } from 'recoil'
import { currentUser } from '@recoil/currentUser'
import { useCommentList } from '@hooks/queries/useCommentList'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { Menu } from '@interfaces'
import PageTitle from '@components/common/PageTitle'

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
          <PageTitle title={`맛이 어때 | ${menu.title}`} />
          <MenuDetail menu={menu} userId={user.id} />
          <CommentInput menuId={menu.id} userId={user.id} />
        </>
      )}
      {isCommentListSuccess && (
        <CommentList user={user} commentList={commentList} />
      )}
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const menuId = parseInt(context.query.id as string, 10)
  const queryClient = new QueryClient()

  const getMenuById = async (menuId: number) => {
    const cookie = context.req.cookies['tastyToken']
    if (!cookie) {
      return
    }

    const { data } = await axios.get<Menu>(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
      {
        headers: { Authorization: cookie }
      }
    )

    return data
  }

  await queryClient.prefetchQuery(['menu', menuId], () => getMenuById(menuId), {
    staleTime: 10000
  })

  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Detail
