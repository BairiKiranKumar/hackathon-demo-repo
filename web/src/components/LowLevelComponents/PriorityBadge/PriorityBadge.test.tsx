import { render } from '@redwoodjs/testing/web'

import PriorityBadge from './PriorityBadge'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PriorityBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PriorityBadge />)
    }).not.toThrow()
  })
})
