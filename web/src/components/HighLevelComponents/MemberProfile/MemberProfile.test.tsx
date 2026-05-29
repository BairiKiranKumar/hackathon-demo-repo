import { render } from '@redwoodjs/testing/web'

import MemberProfile from './MemberProfile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberProfile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberProfile />)
    }).not.toThrow()
  })
})
