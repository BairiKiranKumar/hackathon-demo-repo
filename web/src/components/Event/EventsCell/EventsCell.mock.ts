// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  events: [
    {
      __typename: 'Event' as const,
      id: 42,
    },
    {
      __typename: 'Event' as const,
      id: 43,
    },
    {
      __typename: 'Event' as const,
      id: 44,
    },
  ],
})
