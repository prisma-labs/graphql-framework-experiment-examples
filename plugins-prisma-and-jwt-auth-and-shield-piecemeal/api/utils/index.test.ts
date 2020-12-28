import { getUserId } from '.'

it('should error if userID is unknown', () => {
  expect(() => {
    getUserId({})
  }).toThrow()
})
