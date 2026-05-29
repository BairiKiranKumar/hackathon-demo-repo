import { render } from '@redwoodjs/testing/web'

import BhRiskIndicatorLegend from './BhRiskIndicatorLegend'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhRiskIndicatorLegend', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhRiskIndicatorLegend />)
    }).not.toThrow()
  })
})
