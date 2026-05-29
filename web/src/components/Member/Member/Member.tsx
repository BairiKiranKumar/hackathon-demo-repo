import type {
  DeleteMemberMutation,
  DeleteMemberMutationVariables,
  FindMemberById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_MEMBER_MUTATION: TypedDocumentNode<
  DeleteMemberMutation,
  DeleteMemberMutationVariables
> = gql`
  mutation DeleteMemberMutation($id: Int!) {
    deleteMember(id: $id) {
      id
    }
  }
`

interface Props {
  member: NonNullable<FindMemberById['member']>
}

const Member = ({ member }: Props) => {
  const [deleteMember] = useMutation(DELETE_MEMBER_MUTATION, {
    onCompleted: () => {
      toast.success('Member deleted')
      navigate(routes.members())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteMemberMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete member ' + id + '?')) {
      deleteMember({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Member {member.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{member.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{member.name}</td>
            </tr>
            <tr>
              <th>Dob</th>
              <td>{timeTag(member.dob)}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{member.gender}</td>
            </tr>
            <tr>
              <th>Ethnicity</th>
              <td>{member.ethnicity}</td>
            </tr>
            <tr>
              <th>Language</th>
              <td>{member.language}</td>
            </tr>
            <tr>
              <th>Language skills</th>
              <td>{formatEnum(member.languageSkills)}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{member.phone}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{member.address}</td>
            </tr>
            <tr>
              <th>Image</th>
              <td>{member.image}</td>
            </tr>
            <tr>
              <th>Quote</th>
              <td>{member.quote}</td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>{member.bio}</td>
            </tr>
            <tr>
              <th>Insight id</th>
              <td>{member.insightId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMember({ id: member.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(member.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Member
