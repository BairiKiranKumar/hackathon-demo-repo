import { render } from '@redwoodjs/testing/web'

import MemberDetailsPage from './MemberDetailsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MemberDetailsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberDetailsPage />)
    }).not.toThrow()
  })
})
