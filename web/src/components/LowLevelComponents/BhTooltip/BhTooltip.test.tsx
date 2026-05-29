import { render } from '@redwoodjs/testing/web'

import BhTooltip from './BhTooltip'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhTooltip', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhTooltip />)
    }).not.toThrow()
  })
})
