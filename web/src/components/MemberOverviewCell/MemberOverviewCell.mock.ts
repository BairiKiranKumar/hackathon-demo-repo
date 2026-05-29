import type { FindMemberOverviewQuery } from 'types/graphql'

export const standard = (): FindMemberOverviewQuery => ({
  memberOverview: {
    __typename: 'MemberOverview',
    id: 1,
    overview: {
      title: 'Member Overview',
      overviewData: [
        {
          key: 'Diagnosis',
          value:
            'Obesity, Rheumatoid Arthritis, Hypertension, Frailty & Diabetes',
        },
        {
          key: 'Program Eligibility',
          value: 'Mobility',
        },
      ],
    },
    careManagement: {
      title: 'Care Management',
      overviewData: [
        {
          key: 'Last Attempt',
          value: '11/15/2024',
        },
        {
          key: 'Date of Last Contact',
          value: '11/15/2024',
        },
        {
          key: 'Open Care Gaps',
          value: '4',
        },
        {
          key: 'Service Delivery',
          value: '73/100',
        },
      ],
    },
    operationalMetrics: {
      title: 'Operational Metrics',
      overviewData: [
        {
          key: 'Insurer',
          value: 'MyHealthOne',
        },
        {
          key: 'HCBS Completion Date',
          value: '10/24/2024',
        },
        {
          key: 'Preferred days of contact',
          value: 'Mo, We, Th & Fr',
        },
        {
          key: 'Preferred time for contact',
          value: '12:00pm - 06:00pm',
        },
      ],
    },
  },
})
