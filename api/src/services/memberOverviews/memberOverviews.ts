import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const memberOverviews: QueryResolvers['memberOverviews'] = () => {
  return db.memberOverview.findMany()
}

export const memberOverview: QueryResolvers['memberOverview'] = ({ id }) => {
  return db.memberOverview.findUnique({
    where: { id },
  })
}

export const createMemberOverview: MutationResolvers['createMemberOverview'] =
  ({ input }) => {
    return db.memberOverview.create({
      data: input,
    })
  }

export const updateMemberOverview: MutationResolvers['updateMemberOverview'] =
  ({ id, input }) => {
    return db.memberOverview.update({
      data: input,
      where: { id },
    })
  }

export const deleteMemberOverview: MutationResolvers['deleteMemberOverview'] =
  ({ id }) => {
    return db.memberOverview.delete({
      where: { id },
    })
  }
