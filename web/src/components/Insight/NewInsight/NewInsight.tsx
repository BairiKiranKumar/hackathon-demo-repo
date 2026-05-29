import type {
  CreateInsightMutation,
  CreateInsightInput,
  CreateInsightMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InsightForm from 'src/components/Insight/InsightForm'

const CREATE_INSIGHT_MUTATION: TypedDocumentNode<
  CreateInsightMutation,
  CreateInsightMutationVariables
> = gql`
  mutation CreateInsightMutation($input: CreateInsightInput!) {
    createInsight(input: $input) {
      id
    }
  }
`

const NewInsight = () => {
  const [createInsight, { loading, error }] = useMutation(
    CREATE_INSIGHT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Insight created')
        navigate(routes.insights())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateInsightInput) => {
    createInsight({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Insight</h2>
      </header>
      <div className="rw-segment-main">
        <InsightForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewInsight
