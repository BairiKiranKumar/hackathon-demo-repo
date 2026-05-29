import { render } from '@redwoodjs/testing/web'

import CommandPalette from './CommandPalette'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommandPalette', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommandPalette />)
    }).not.toThrow()
  })
})
