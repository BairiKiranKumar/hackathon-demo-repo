import { render } from '@redwoodjs/testing/web'

import BhTimeline from './BhTimeline'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhTimeline', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhTimeline />)
    }).not.toThrow()
  })
})
