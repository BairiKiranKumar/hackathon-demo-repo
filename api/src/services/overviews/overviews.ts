import type {
  QueryResolvers,
  MutationResolvers,
  OverviewRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const overviews: QueryResolvers['overviews'] = () => {
  return db.overview.findMany()
}

export const overview: QueryResolvers['overview'] = ({ id }) => {
  return db.overview.findUnique({
    where: { id },
  })
}

export const createOverview: MutationResolvers['createOverview'] = ({
  input,
}) => {
  return db.overview.create({
    data: input,
  })
}

export const updateOverview: MutationResolvers['updateOverview'] = ({
  id,
  input,
}) => {
  return db.overview.update({
    data: input,
    where: { id },
  })
}

export const deleteOverview: MutationResolvers['deleteOverview'] = ({ id }) => {
  return db.overview.delete({
    where: { id },
  })
}

export const Overview: OverviewRelationResolvers = {
  Member: (_obj, { root }) => {
    return db.overview.findUnique({ where: { id: root?.id } }).Member()
  },
}
