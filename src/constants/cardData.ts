const Franchise = {
  id: 1234,
  image: 'https://via.placeholder.com/100',
  franchise: 'starbucks'
}

const User = {
  id: 1234,
  image: 'https://via.placeholder.com/50',
  role: null,
  nickname: 'Lee',
  email: 'lee',
  createdAt: 'string',
  updatedAt: 'string'
}

export const Card = {
  id: 1234132,
  franchise: Franchise,
  title: '치킨치킨',
  originalTitle: 'string',
  image: 'https://via.placeholder.com/300x150',
  content: 'string',
  optionList: [{ name: 'string', description: 'string' }],
  tasteList: [{ id: 1234, name: 'string', color: 'string' }],
  expectedPrice: 12345,
  author: User,
  likes: 10,
  comments: 20,
  createdAt: 'string',
  updatedAt: 'string'
}

export const PostCardDummy = Array.from({ length: 4 }, (_, idx) => {
  return {
    id: idx,
    franchise: Franchise,
    title: '참치마요',
    originalTitle: 'string',
    image: 'https://via.placeholder.com/300x150',
    content: 'string',
    optionList: [{ name: 'string', description: 'string' }],
    tasteList: [{ id: 1234, name: 'string', color: 'string' }],
    expectedPrice: 12345,
    author: User,
    likes: 10,
    comments: 20,
    createdAt: 'string',
    updatedAt: 'string'
  }
})
