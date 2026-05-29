import { render } from '@redwoodjs/testing/web'

import FeedbackPopover from './FeedbackPopover'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('FeedbackPopover', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackPopover />)
    }).not.toThrow()
  })
})
