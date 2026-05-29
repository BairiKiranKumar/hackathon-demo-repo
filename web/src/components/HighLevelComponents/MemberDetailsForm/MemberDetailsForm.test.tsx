import { render } from '@redwoodjs/testing/web'

import MemberDetailsForm from './MemberDetailsForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberDetailsForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberDetailsForm />)
    }).not.toThrow()
  })
})
