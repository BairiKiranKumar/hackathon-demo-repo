import type {
  DeleteInsightMutation,
  DeleteInsightMutationVariables,
  FindInsights,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Insight/InsightsCell'
import { formatEnum, jsonTruncate, truncate } from 'src/lib/formatters'

const DELETE_INSIGHT_MUTATION: TypedDocumentNode<
  DeleteInsightMutation,
  DeleteInsightMutationVariables
> = gql`
  mutation DeleteInsightMutation($id: Int!) {
    deleteInsight(id: $id) {
      id
    }
  }
`

const InsightsList = ({ insights }: FindInsights) => {
  const [deleteInsight] = useMutation(DELETE_INSIGHT_MUTATION, {
    onCompleted: () => {
      toast.success('Insight deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteInsightMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete insight ' + id + '?')) {
      deleteInsight({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Current score</th>
            <th>Past scores</th>
            <th>Ai diag summary</th>
            <th>Ai risk factors</th>
            <th>Ai recommendations</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight) => (
            <tr key={insight.id}>
              <td>{truncate(insight.id)}</td>
              <td>{formatEnum(insight.status)}</td>
              <td>{truncate(insight.currentScore)}</td>
              <td>{jsonTruncate(insight.pastScores)}</td>
              <td>{jsonTruncate(insight.aiDiagSummary)}</td>
              <td>{jsonTruncate(insight.aiRiskFactors)}</td>
              <td>{jsonTruncate(insight.aiRecommendations)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.insight({ id: insight.id })}
                    title={'Show insight ' + insight.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInsight({ id: insight.id })}
                    title={'Edit insight ' + insight.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete insight ' + insight.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(insight.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InsightsList
