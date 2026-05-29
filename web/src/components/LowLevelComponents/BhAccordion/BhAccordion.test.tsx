import { render } from '@redwoodjs/testing/web'

import BhAccordion from './BhAccordion'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BhAccordion', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BhAccordion />)
    }).not.toThrow()
  })
})
