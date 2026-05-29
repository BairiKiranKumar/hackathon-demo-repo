import { render } from '@redwoodjs/testing/web'

import CareHubPage from './CareHubPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CareHubPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CareHubPage />)
    }).not.toThrow()
  })
})
