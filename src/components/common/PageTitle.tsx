import Head from 'next/head'

interface Props {
  title?: string
}

const CONSTANT_TITLE = '맛이 어때'

const PageTitle = ({ title }: Props) => {
  return (
    <Head>
      <title>{title || CONSTANT_TITLE}</title>
    </Head>
  )
}

export default PageTitle
