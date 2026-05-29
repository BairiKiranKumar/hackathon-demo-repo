import type { FindOverviews, FindOverviewsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Overviews from 'src/components/Overview/Overviews'

export const QUERY: TypedDocumentNode<FindOverviews, FindOverviewsVariables> =
  gql`
    query FindOverviews {
      overviews {
        id
        overview
        careManagement
        operationalMetrics
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No overviews yet.{' '}
      <Link to={routes.newOverview()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindOverviews>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  overviews,
}: CellSuccessProps<FindOverviews, FindOverviewsVariables>) => {
  return <Overviews overviews={overviews} />
}
