import type {
  DeleteOverviewMutation,
  DeleteOverviewMutationVariables,
  FindOverviews,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Overview/OverviewsCell'
import { jsonTruncate, truncate } from 'src/lib/formatters'

const DELETE_OVERVIEW_MUTATION: TypedDocumentNode<
  DeleteOverviewMutation,
  DeleteOverviewMutationVariables
> = gql`
  mutation DeleteOverviewMutation($id: Int!) {
    deleteOverview(id: $id) {
      id
    }
  }
`

const OverviewsList = ({ overviews }: FindOverviews) => {
  const [deleteOverview] = useMutation(DELETE_OVERVIEW_MUTATION, {
    onCompleted: () => {
      toast.success('Overview deleted')
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

  const onDeleteClick = (id: DeleteOverviewMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete overview ' + id + '?')) {
      deleteOverview({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Overview</th>
            <th>Care management</th>
            <th>Operational metrics</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {overviews.map((overview) => (
            <tr key={overview.id}>
              <td>{truncate(overview.id)}</td>
              <td>{jsonTruncate(overview.overview)}</td>
              <td>{jsonTruncate(overview.careManagement)}</td>
              <td>{jsonTruncate(overview.operationalMetrics)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.overview({ id: overview.id })}
                    title={'Show overview ' + overview.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editOverview({ id: overview.id })}
                    title={'Edit overview ' + overview.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete overview ' + overview.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(overview.id)}
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

export default OverviewsList
