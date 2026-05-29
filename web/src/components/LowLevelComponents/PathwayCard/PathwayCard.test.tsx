import { render } from '@redwoodjs/testing/web'

import PathwayCard from './PathwayCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PathwayCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PathwayCard />)
    }).not.toThrow()
  })
})
