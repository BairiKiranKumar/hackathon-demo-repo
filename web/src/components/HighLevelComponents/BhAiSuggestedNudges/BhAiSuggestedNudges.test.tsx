import { render } from '@redwoodjs/testing/web'

import BhAiSuggestedNudges from './BhAiSuggestedNudges'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhAiSuggestedNudges', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhAiSuggestedNudges />)
    }).not.toThrow()
  })
})
