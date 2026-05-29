import { render } from '@redwoodjs/testing/web'

import ScheduleTabPanel from './ScheduleTabPanel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScheduleTabPanel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScheduleTabPanel />)
    }).not.toThrow()
  })
})
