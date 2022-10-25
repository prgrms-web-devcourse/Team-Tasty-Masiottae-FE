const GUEST_INPUT_PLACEHOLDER = '로그인 후 작성해주세요(최대 80자).'
const LOGGEDIN_INPUT_PLACEHOLDER = '댓글을 입력해주세요.'
const EDIT_INPUT_PLACEHOLDER = '수정할 내용을 입력하세요.'

export const getPlaceholder = (
  type: 'normal' | 'edit',
  isLoggedIn: boolean
) => {
  if (type === 'edit') {
    return EDIT_INPUT_PLACEHOLDER
  }

  if (isLoggedIn) {
    return LOGGEDIN_INPUT_PLACEHOLDER
  }
  return GUEST_INPUT_PLACEHOLDER
}
