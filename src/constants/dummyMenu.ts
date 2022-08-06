export const dummyFranchiseList = [
  { id: 1, name: '스타벅스' },
  { id: 2, name: '이디야' },
  { id: 3, name: '공차' },
  { id: 4, name: '아마스빈' },
  { id: 5, name: '서브웨이' }
]

export const dummyTasteList = [
  { id: 1, name: '차가운', color: '#1e88e5' },
  { id: 2, name: '뜨거운', color: '#f72c25' },
  { id: 3, name: '달콤한', color: '#ef476f' },
  { id: 4, name: '매콤한', color: '#f94144' },
  { id: 5, name: '새콤한', color: '#f9c74f' },
  { id: 6, name: '쌉쌀한', color: '#90be6d' },
  { id: 7, name: '짭짤한', color: '#f86624' },
  { id: 8, name: '느끼한', color: '#fcb232' },
  { id: 9, name: '부드러운', color: '#B69521' },
  { id: 10, name: '매우 단', color: '#9e0059' },
  { id: 11, name: '매우 짠', color: '#ca6702' },
  { id: 12, name: '매우 쓴', color: '#3f5549' },
  { id: 13, name: '매우 신', color: '#ee9b00' },
  { id: 14, name: '매우 매운', color: '#74092c' },
  { id: 15, name: '감칠맛 나는', color: '#4d194d' },
  { id: 16, name: '고소한', color: '#cf995f' }
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
