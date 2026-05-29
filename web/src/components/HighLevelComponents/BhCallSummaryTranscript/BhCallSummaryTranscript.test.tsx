import { render } from '@redwoodjs/testing/web'

import BhCallSummaryTranscript from './BhCallSummaryTranscript'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhCallSummaryTranscript', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhCallSummaryTranscript />)
    }).not.toThrow()
  })
})
