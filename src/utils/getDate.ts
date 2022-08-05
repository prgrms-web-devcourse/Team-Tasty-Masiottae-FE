export const getDate = (createdAt: string) => {
  let month = createdAt.slice(5, 7) + '월'
  let day = createdAt.slice(8, 10) + '일'

  if (createdAt[5] === '0') {
    month = createdAt[6] + '월'
  }

  if (createdAt[8] === '0') {
    day = createdAt[9] + '일'
  }

  return month + ' ' + day
}
