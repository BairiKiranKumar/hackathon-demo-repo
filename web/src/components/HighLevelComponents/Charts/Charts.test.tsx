import { render } from '@redwoodjs/testing/web'

import Charts from './Charts'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Charts', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Charts />)
    }).not.toThrow()
  })
})
