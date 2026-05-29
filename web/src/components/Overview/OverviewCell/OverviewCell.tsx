import type { FindOverviewById, FindOverviewByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Overview from 'src/components/Overview/Overview'

export const QUERY: TypedDocumentNode<
  FindOverviewById,
  FindOverviewByIdVariables
> = gql`
  query FindOverviewById($id: Int!) {
    overview: overview(id: $id) {
      id
      overview
      careManagement
      operationalMetrics
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Overview not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindOverviewByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  overview,
}: CellSuccessProps<FindOverviewById, FindOverviewByIdVariables>) => {
  return <Overview overview={overview} />
}
