import { render } from '@redwoodjs/testing/web'

import ServicePlanCard from './ServicePlanCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ServicePlanCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ServicePlanCard />)
    }).not.toThrow()
  })
})
