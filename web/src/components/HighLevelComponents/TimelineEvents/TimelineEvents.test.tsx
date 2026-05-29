import { render } from '@redwoodjs/testing/web'

import TimelineEvents from './TimelineEvents'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimelineEvents', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimelineEvents />)
    }).not.toThrow()
  })
})
