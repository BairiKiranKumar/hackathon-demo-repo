import { render } from '@redwoodjs/testing/web'

import MemberInsights from './MemberInsights'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberInsights', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberInsights />)
    }).not.toThrow()
  })
})
