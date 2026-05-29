import type {
  CreateOverviewMutation,
  CreateOverviewInput,
  CreateOverviewMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OverviewForm from 'src/components/Overview/OverviewForm'

export const CREATE_OVERVIEW_MUTATION: TypedDocumentNode<
  CreateOverviewMutation,
  CreateOverviewMutationVariables
> = gql`
  mutation CreateOverviewMutation($input: CreateOverviewInput!) {
    createOverview(input: $input) {
      id
    }
  }
`

const NewOverview = () => {
  const [createOverview, { loading, error }] = useMutation(
    CREATE_OVERVIEW_MUTATION,
    {
      onCompleted: () => {
        toast.success('Overview created')
        navigate(routes.overviews())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateOverviewInput) => {
    createOverview({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Overview</h2>
      </header>
      <div className="rw-segment-main">
        <OverviewForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewOverview
