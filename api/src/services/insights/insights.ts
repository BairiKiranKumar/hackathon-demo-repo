import type {
  QueryResolvers,
  MutationResolvers,
  InsightRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const insights: QueryResolvers['insights'] = () => {
  return db.insight.findMany()
}

export const insight: QueryResolvers['insight'] = ({ id }) => {
  return db.insight.findUnique({
    where: { id },
  })
}

export const createInsight: MutationResolvers['createInsight'] = ({
  input,
}) => {
  return db.insight.create({
    data: input,
  })
}

export const updateInsight: MutationResolvers['updateInsight'] = ({
  id,
  input,
}) => {
  return db.insight.update({
    data: input,
    where: { id },
  })
}

export const deleteInsight: MutationResolvers['deleteInsight'] = ({ id }) => {
  return db.insight.delete({
    where: { id },
  })
}

export const Insight: InsightRelationResolvers = {
  Member: (_obj, { root }) => {
    return db.insight.findUnique({ where: { id: root?.id } }).Member()
  },
}
