import { render } from '@redwoodjs/testing/web'

import DiagnosesCard from './DiagnosesCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DiagnosesCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DiagnosesCard />)
    }).not.toThrow()
  })
})
