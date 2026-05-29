import { render } from '@redwoodjs/testing/web'

import BhReviewPlanCard from './BhReviewPlanCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhReviewPlanCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhReviewPlanCard />)
    }).not.toThrow()
  })
})
