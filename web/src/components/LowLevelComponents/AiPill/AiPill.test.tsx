import { render } from '@redwoodjs/testing/web'

import AiPill from './AiPill'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AiPill', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AiPill size={'sm'}>AI Generated</AiPill>)
    }).not.toThrow()
  })
})
