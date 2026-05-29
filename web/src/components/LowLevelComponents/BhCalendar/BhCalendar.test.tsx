import { render } from '@redwoodjs/testing/web'

import BhCalendar from './BhCalendar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhCalendar />)
    }).not.toThrow()
  })
})
