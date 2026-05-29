import type {
  EditOverviewById,
  UpdateOverviewInput,
  UpdateOverviewMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OverviewForm from 'src/components/Overview/OverviewForm'

export const QUERY: TypedDocumentNode<EditOverviewById> = gql`
  query EditOverviewById($id: Int!) {
    overview: overview(id: $id) {
      id
      overview
      careManagement
      operationalMetrics
    }
  }
`

export const UPDATE_OVERVIEW_MUTATION: TypedDocumentNode<
  EditOverviewById,
  UpdateOverviewMutationVariables
> = gql`
  mutation UpdateOverviewMutation($id: Int!, $input: UpdateOverviewInput!) {
    updateOverview(id: $id, input: $input) {
      id
      overview
      careManagement
      operationalMetrics
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ overview }: CellSuccessProps<EditOverviewById>) => {
  const [updateOverview, { loading, error }] = useMutation(
    UPDATE_OVERVIEW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Overview updated')
        navigate(routes.overviews())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateOverviewInput,
    id: EditOverviewById['overview']['id']
  ) => {
    updateOverview({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Overview {overview?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OverviewForm
          overview={overview}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
