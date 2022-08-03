export const dummyFranchiseList = [
  { id: 0, name: '스타벅스' },
  { id: 1, name: '이디야' },
  { id: 2, name: '공차' },
  { id: 3, name: '아마스빈' },
  { id: 4, name: '서브웨이' }
]

export const dummyTasteList = [
  { id: 0, name: '차가운', color: '#00B5E3' },
  { id: 1, name: '뜨거운', color: '#FF3333' },
  { id: 2, name: '달콤한', color: '#CC0099' },
  { id: 3, name: '매콤한', color: '#df2020' },
  { id: 4, name: '새콤한', color: '#FFDD33' },
  { id: 5, name: '쌉쌀한', color: '#339966' },
  { id: 6, name: '짭짤한', color: '#FF5533' }
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
