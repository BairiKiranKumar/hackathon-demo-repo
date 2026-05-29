import { render } from '@redwoodjs/testing/web'

import DateTime from './DateTime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DateTime', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DateTime />)
    }).not.toThrow()
  })
})
