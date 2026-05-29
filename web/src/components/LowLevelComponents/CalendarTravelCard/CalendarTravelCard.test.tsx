import { render } from '@redwoodjs/testing/web'

import CalendarTravelCard from './CalendarTravelCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarTravelCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarTravelCard />)
    }).not.toThrow()
  })
})
