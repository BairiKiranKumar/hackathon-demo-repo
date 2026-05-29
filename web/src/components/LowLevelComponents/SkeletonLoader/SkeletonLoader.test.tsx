import { render } from '@redwoodjs/testing/web'

import SkeletonLoader from './SkeletonLoader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SkeletonLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SkeletonLoader />)
    }).not.toThrow()
  })
})
