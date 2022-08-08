export const getDate = (createdAt: string) => {
  const month = Number(createdAt.slice(5, 7)) + '월'
  const day = Number(createdAt.slice(8, 10)) + '일'

  return month + ' ' + day
}
