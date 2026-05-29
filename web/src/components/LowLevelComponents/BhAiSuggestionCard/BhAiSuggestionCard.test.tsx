import { render } from '@redwoodjs/testing/web'

import BhAiSuggestionCard from './BhAiSuggestionCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhAiSuggestionCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhAiSuggestionCard />)
    }).not.toThrow()
  })
})
