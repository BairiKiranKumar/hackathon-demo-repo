import { render } from '@redwoodjs/testing/web'

import BhCallWidget from './BhCallWidget'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhCallWidget', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhCallWidget />)
    }).not.toThrow()
  })
})
