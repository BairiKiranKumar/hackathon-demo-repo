import { render } from '@redwoodjs/testing/web'

import PathwayStages from './PathwayStages'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PathwayStages', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PathwayStages />)
    }).not.toThrow()
  })
})
