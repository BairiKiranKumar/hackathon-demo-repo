import type {
  QueryResolvers,
  MutationResolvers,
  EncounterRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const encounters: QueryResolvers['encounters'] = () => {
  return db.encounter.findMany()
}

export const encounter: QueryResolvers['encounter'] = ({ id }) => {
  return db.encounter.findUnique({
    where: { id },
  })
}

export const createEncounter: MutationResolvers['createEncounter'] = ({
  input,
}) => {
  const { memberId, activity, activityId, ...rest } = input

  return db.encounter.create({
    data: {
      ...rest,
      // Connect to existing member
      member: memberId
        ? {
            connect: { id: memberId },
          }
        : undefined,
      // Handle activity if provided
      activity: activityId
        ? {
            connect: { id: activityId },
          }
        : activity
          ? {
              create: {
                description: activity.description,
                completed: activity.completed,
                triggers: activity.triggers,
              },
            }
          : undefined,
    },
  })
}

export const updateEncounter: MutationResolvers['updateEncounter'] = ({
  id,
  input,
}) => {
  return db.encounter.update({
    data: input,
    where: { id },
  })
}

export const deleteEncounter: MutationResolvers['deleteEncounter'] = ({
  id,
}) => {
  return db.encounter.delete({
    where: { id },
  })
}

export const Encounter: EncounterRelationResolvers = {
  activity: (_obj, { root }) => {
    return db.encounter.findUnique({ where: { id: root?.id } }).activity()
  },
  Member: (_obj, { root }) => {
    return db.encounter.findUnique({ where: { id: root?.id } }).member()
  },
}
