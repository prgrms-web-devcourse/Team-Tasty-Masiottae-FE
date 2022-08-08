export const dummyFranchiseList = [
  { id: 1, name: '스타벅스' },
  { id: 2, name: '이디야' },
  { id: 3, name: '공차' },
  { id: 4, name: '아마스빈' },
  { id: 5, name: '서브웨이' }
]

export const dummyTasteList = [
  { id: 1, name: '차가운', color: '#1C78D2' },
  { id: 2, name: '뜨거운', color: '#ED0E05' },
  { id: 4, name: '매콤한', color: '#d00000' },
  { id: 3, name: '달콤한', color: '#EA0E4C' },
  { id: 5, name: '새콤한', color: '#ffa500' },
  { id: 6, name: '쌉쌀한', color: '#3d405b' },
  { id: 7, name: '짭짤한', color: '#EA5400' },
  { id: 8, name: '느끼한', color: '#eccf8b' },
  { id: 9, name: '고소한', color: '#83624d' }
]

export const dummyMenu = {
  id: 1,
  franchise: { id: 0, name: '스타벅스' },
  image: '',
  title: '슈렉 프라푸치노',
  originalTitle: '제주 유기농 말차로 만든 크림 프라푸치노',
  author: { id: 'user1' },
  content: '설명' || null,
  options: [
    { name: '에스프레소샷', description: '1' },
    { name: '자바칩', description: '약간' },
    { name: '아이스크림', description: '한 스쿱' }
  ],
  expectedPrice: 6700,
  tastes: [
    { id: 0, name: '차가운', color: '#00B5E3' },
    { id: 2, name: '달콤한', color: '#CC0099' }
  ],
  likes: 100,
  createdAt: String,
  updatedAt: String
}
