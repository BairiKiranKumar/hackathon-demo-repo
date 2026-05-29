import { render } from '@redwoodjs/testing/web'

import IconLabel from './IconLabel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('IconLabel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IconLabel />)
    }).not.toThrow()
  })
})
