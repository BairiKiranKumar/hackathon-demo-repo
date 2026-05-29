import { render } from '@redwoodjs/testing/web'

import BhToastNotification from './BhToastNotification'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhToastNotification', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhToastNotification />)
    }).not.toThrow()
  })
})
