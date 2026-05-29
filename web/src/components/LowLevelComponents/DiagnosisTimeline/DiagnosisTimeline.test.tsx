import { render } from '@redwoodjs/testing/web'

import DiagnosisTimeline from './DiagnosisTimeline'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DiagnosisTimeline', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DiagnosisTimeline />)
    }).not.toThrow()
  })
})
