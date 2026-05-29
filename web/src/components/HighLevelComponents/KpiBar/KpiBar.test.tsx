import { render } from '@redwoodjs/testing/web'

import KpiBar from './KpiBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('KpiBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KpiBar />)
    }).not.toThrow()
  })
})
