import { render } from '@redwoodjs/testing/web'

import CallWidget from './CallWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CallWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CallWidget />)
    }).not.toThrow()
  })
})
