export const UPDATE_ENCOUNTER = gql`
  mutation UpdateEncounter($id: Int!, $input: UpdateEncounterInput!) {
    updateEncounter(id: $id, input: $input) {
      id
      patientResponse
    }
  }
`
