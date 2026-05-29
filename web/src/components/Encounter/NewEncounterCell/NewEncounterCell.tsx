export const CREATE_ENCOUNTER_MUTATION = gql`
  mutation CreateEncounterMutation($input: CreateEncounterInput!) {
    createEncounter(input: $input) {
      when
      id
      type
      memberId
      summary
      communication
    }
  }
`
