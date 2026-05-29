import { render } from '@redwoodjs/testing/web'

import AiButton from './AiButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AiButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AiButton />)
    }).not.toThrow()
  })
})
