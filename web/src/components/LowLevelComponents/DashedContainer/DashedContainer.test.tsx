import { render } from '@redwoodjs/testing/web'

import DashedContainer from './DashedContainer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DashedContainer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashedContainer />)
    }).not.toThrow()
  })
})
