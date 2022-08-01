const FranchiseDummy = {
  id: 1234,
  image: 'https://via.placeholder.com/100',
  franchise: 'starbucks'
}

const UserDummy = {
  id: 1234,
  image: 'https://via.placeholder.com/50',
  role: null,
  nickname: 'Lee',
  email: 'lee',
  createdAt: 'string',
  updatedAt: 'string'
}

export const MenuDummy = {
  id: 1234132,
  franchise: FranchiseDummy,
  title: '치킨치킨',
  originalTitle: 'string',
  image: 'https://via.placeholder.com/300x150',
  content: 'string',
  optionList: [{ name: 'string', description: 'string' }],
  tasteList: [{ id: 1234, name: 'string', color: 'string' }],
  expectedPrice: 12345,
  author: UserDummy,
  likes: 10,
  comments: 20,
  createdAt: 'string',
  updatedAt: 'string'
}

export const MenuListDummy = Array.from({ length: 4 }, (_, idx) => {
  return {
    id: idx,
    franchise: FranchiseDummy,
    title: '참치마요',
    originalTitle: 'string',
    image: 'https://via.placeholder.com/300x150',
    content: 'string',
    optionList: [{ name: 'string', description: 'string' }],
    tasteList: [{ id: 1234, name: 'string', color: 'string' }],
    expectedPrice: 12345,
    author: UserDummy,
    likes: 10,
    comments: 20,
    createdAt: 'string',
    updatedAt: 'string'
  }
})
