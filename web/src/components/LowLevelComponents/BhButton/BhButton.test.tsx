import { render } from '@redwoodjs/testing/web'

import BhButton from './BhButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhButton />)
    }).not.toThrow()
  })
})
