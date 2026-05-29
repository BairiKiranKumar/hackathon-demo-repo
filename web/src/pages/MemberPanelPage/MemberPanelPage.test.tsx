import { render } from '@redwoodjs/testing/web'

import MemberPanelPage from './MemberPanelPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MemberPanelPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberPanelPage />)
    }).not.toThrow()
  })
})
