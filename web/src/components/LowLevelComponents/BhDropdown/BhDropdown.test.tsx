import { render } from '@redwoodjs/testing/web'

import BhDropdown from './BhDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhDropdown />)
    }).not.toThrow()
  })
})
