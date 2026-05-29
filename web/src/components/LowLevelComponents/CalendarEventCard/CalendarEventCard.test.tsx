import { render } from '@redwoodjs/testing/web'

import CalendarEventCard from './CalendarEventCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarEventCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarEventCard />)
    }).not.toThrow()
  })
})
