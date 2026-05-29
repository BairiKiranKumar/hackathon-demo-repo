import { render } from '@redwoodjs/testing/web'

import InterventionTable from './BhInterventionTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InterventionTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InterventionTable />)
    }).not.toThrow()
  })
})
