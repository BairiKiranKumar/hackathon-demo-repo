import MemberProfile from '@highLevelComp/MemberProfile/MemberProfile'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import type { FindMemberById, FindMemberByIdVariables } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import MemberDetailsForm from 'src/components/HighLevelComponents/MemberDetailsForm/MemberDetailsForm'
import { useMemberFormStore } from 'src/store/MemberFormStore'

// import Member from 'src/components/Member/Member'

export const QUERY: TypedDocumentNode<FindMemberById, FindMemberByIdVariables> =
  gql`
    query FindMemberById($id: Int!) {
      member: member(id: $id) {
        id
        name
        dob
        gender
        ethnicity
        language
        languageSkills
        phone
        secondaryPhone
        address
        image
        quote
        bio
        insightId
        insight {
          status
          currentScore
          pastScores
        }
      }
    }
  `

export const Loading = () => (
  <div>
    <SkeletonLoader height={133} />
  </div>
)

export const Empty = () => {
  navigate(routes.memberPanel())
  return null
}

export const Failure = ({
  error,
}: CellFailureProps<FindMemberByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  member,
  setGenerateMemberInsight,
  isInsightGenerated,
  memberWithRiskScore,
  updateProfileHeight,
}: CellSuccessProps) => {
  const isEditing = useMemberFormStore((state) => state.isEditing)
  return (
    <>
      {isEditing ? (
        <MemberDetailsForm memberProfile={member} isEditing={true} />
      ) : (
        <MemberProfile
          memberProfile={member}
          generateMemberInsight={setGenerateMemberInsight}
          isInsightGenerated={isInsightGenerated}
          memberWithRiskScore={memberWithRiskScore}
          updateProfileHeight={updateProfileHeight}
        />
      )}
    </>
  )
}
