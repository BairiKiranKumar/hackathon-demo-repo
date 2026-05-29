import { render } from '@redwoodjs/testing/web'

import AddEditTask from './AddEditTask'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AddEditTask', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddEditTask />)
    }).not.toThrow()
  })
})
