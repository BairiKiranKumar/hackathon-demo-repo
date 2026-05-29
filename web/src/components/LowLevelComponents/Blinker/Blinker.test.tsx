import { render } from '@redwoodjs/testing/web'

import Blinker from './Blinker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Blinker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Blinker />)
    }).not.toThrow()
  })
})
