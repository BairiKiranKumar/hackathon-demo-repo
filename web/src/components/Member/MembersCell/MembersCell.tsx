import type { FindMembers, FindMembersVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Members from 'src/components/Member/Members'

export const QUERY: TypedDocumentNode<FindMembers, FindMembersVariables> = gql`
  query FindMembers {
    members {
      id
      name
      dob
      gender
      ethnicity
      language
      languageSkills
      phone
      address
      image
      quote
      bio
      insightId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No members yet.{' '}
      <Link to={routes.newMember()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindMembers>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  members,
}: CellSuccessProps<FindMembers, FindMembersVariables>) => {
  return <Members members={members} />
}
