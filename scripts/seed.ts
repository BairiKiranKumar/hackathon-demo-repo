import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const membersWithInsights: Prisma.MemberCreateArgs['data'][] = [
      {
        name: 'Stephanie Newman',
        gender: 'F',
        dob: new Date('1953-05-05T00:00:00Z'),
        phone: '(123) 456-7890',
        address: '123 Street Name, City, State',
        ethnicity: 'Caucasian',
        language: 'English',
        languageSkills: ['SPEAK', 'READ', 'WRITE'],
        bio: 'The member is a 72-year-old, recently widowed, queer person of color. They live alone with two cats and a dog, their main social support. Since their partner’s death in May 2023, their declining health has limited their social interactions.',
        image: '/images/user-placeholder.png',
        quote:
          'I want to stay in my own home, where I feel comfortable and independent. Being close to my family is important, so I can see them regularly and remain connected to my loved ones. I also want to continue attending my annual fishing trip, which is a tradition that brings me joy and a sense of normalcy, allowing me to enjoy the outdoors, relax, and bond with friends. Maintaining these aspects of my life will help me stay active, engaged, and fulfilled in the years to come.',
        insight: {
          create: {
            status: 'URGENT',
            currentScore: 71,
            pastScores: {
              scores: [21],
              dates: [new Date('2024-10-10T00:00:00Z')],
            },
            aiDiagSummary: {
              heading: 'Diagnoses',
              entries: [
                {
                  status: 'active',
                  label: 'Hyperlipidemia',
                  onset: '03/03/2018',
                  abatement: '',
                  opportunity: 'Evaluate impact on functional abilities & pain',
                },
                {
                  status: 'resolved',
                  label: 'Chronic sinusitis',
                  onset: '07/15/2010',
                  abatement: '03/03/2015',
                },
              ],
            },
            aiRiskFactors: {
              entries: [
                {
                  title: 'Multiple Chronic Conditions',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [{ value: '5+ comorbidities' }],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        { value: 'Skilled nursing support' },
                        { value: 'Disease education' },
                        { value: 'Nutritional evaluation' },
                      ],
                    },
                  ],
                },
                {
                  title: 'Medication Management',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [
                        { value: 'Prescription changes', highlight: true },
                        { value: 'Unfilled refills' },
                      ],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        {
                          value:
                            'Explore interventions to address medication adherence',
                        },
                      ],
                    },
                  ],
                },
              ],
              heading: 'High Risk Factors',
            },
            aiRecommendations: {
              entries: [
                {
                  title: 'Telehealth Monitoring',
                  items: [
                    {
                      title: 'Recommendations',
                      category: 'problem',
                      subEntries: [
                        {
                          value:
                            'Manage chronic conditions Detect early health changes',
                        },
                        { value: 'Detect early health changes' },
                      ],
                    },
                    {
                      title: 'Explanation',
                      category: 'solution',
                      subEntries: [
                        { value: 'Enable early detection' },
                        { value: 'Support timely intervention' },
                      ],
                    },
                  ],
                },
              ],
              heading: 'Recommendations',
            },
          },
        },
        overview: {
          create: {
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
        },
      },
      {
        name: 'Daron Crona',
        gender: 'M',
        dob: new Date('1950-05-02T00:00:00Z'),
        phone: '555-393-5672',
        address: '326 Baumbach Throughway Suite 11, Salem, MA',
        ethnicity: 'African American',
        language: 'English',
        languageSkills: ['SPEAK', 'READ', 'WRITE'],
        bio: 'The member is a 74-year-old male. They live with family. They are retired and their declining health has limited their social interactions.',
        image: '/images/user-placeholder2.png',
        quote:
          'I want to remain in my own home, near my family, and attend my annual fishing trip.',
        insight: {
          create: {
            status: 'URGENT',
            currentScore: 85,
            pastScores: {
              scores: [44],
              dates: [new Date('2022-11-01T00:00:00Z')],
            },
            aiDiagSummary: {
              heading: 'Diagnoses',
              entries: [
                {
                  status: 'active',
                  label: 'Hyperlipidemia',
                  onset: '2015-09-22',
                  abatement: '',
                  opportunity: 'Evaluate impact on functional abilities & pain',
                },
                {
                  status: 'resolved',
                  label: 'Chronic sinusitis',
                  onset: '1987-04-07',
                  abatement: '2015-03-03',
                },
              ],
            },
            aiRiskFactors: {
              entries: [
                {
                  title: 'Multiple Chronic Conditions',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [{ value: '5+ comorbidities' }],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        { value: 'Skilled nursing support' },
                        { value: 'Disease education' },
                        { value: 'Nutritional evaluation' },
                      ],
                    },
                  ],
                },
                {
                  title: 'Medication Management',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [
                        { value: 'Prescription changes', highlight: true },
                        { value: 'Unfilled refills' },
                      ],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        {
                          value:
                            'Explore interventions to address medication adherence',
                        },
                      ],
                    },
                  ],
                },
              ],
              heading: 'High Risk Factors',
            },
            aiRecommendations: {
              entries: [
                {
                  title: 'Telehealth Monitoring',
                  items: [
                    {
                      title: 'Recommendations',
                      category: 'problem',
                      subEntries: [
                        {
                          value:
                            'Manage chronic conditions Detect early health changes',
                        },
                        { value: 'Detect early health changes' },
                      ],
                    },
                    {
                      title: 'Explanation',
                      category: 'solution',
                      subEntries: [
                        { value: 'Enable early detection' },
                        { value: 'Support timely intervention' },
                      ],
                    },
                  ],
                },
              ],
              heading: 'Recommendations',
            },
          },
        },
        overview: {
          create: {
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
                  value: 'Medicare',
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
        },
      },
      {
        name: 'Francisco Connelly',
        gender: 'M',
        dob: new Date('1947-01-31T00:00:00Z'),
        phone: '555-758-2605',
        address: '461 Schroeder Mission, Boston, MA',
        ethnicity: 'White',
        language: 'English',
        languageSkills: ['SPEAK', 'READ', 'WRITE'],
        bio: 'The member is a 77-year-old male. He lives with family. They are retired and their declining health has limited their social interactions.',
        image: '/images/user-placeholder3.png',
        quote:
          'I want to remain in my own home, near my family, and want to see my granddaughter grow up.',
        insight: {
          create: {
            status: 'URGENT',
            currentScore: 54,
            pastScores: {
              scores: [77],
              dates: [new Date('2024-10-10T00:00:00Z')],
            },
            aiDiagSummary: {
              heading: 'Diagnoses',
              entries: [
                {
                  status: 'active',
                  label: 'Hyperlipidemia',
                  onset: '1991-02-15',
                  abatement: '',
                  opportunity: 'Evaluate impact on functional abilities & pain',
                },
                {
                  status: 'resolved',
                  label: 'Chronic sinusitis',
                  onset: '07/15/2010',
                  abatement: '03/03/2015',
                },
              ],
            },
            aiRiskFactors: {
              entries: [
                {
                  title: 'Multiple Chronic Conditions',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [{ value: '5+ comorbidities' }],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        { value: 'Skilled nursing support' },
                        { value: 'Disease education' },
                        { value: 'Nutritional evaluation' },
                      ],
                    },
                  ],
                },
                {
                  title: 'Medication Management',
                  items: [
                    {
                      title: 'Indication',
                      category: 'problem',
                      subEntries: [
                        { value: 'Prescription changes', highlight: true },
                        { value: 'Unfilled refills' },
                      ],
                    },
                    {
                      title: 'Solutions',
                      category: 'solution',
                      subEntries: [
                        {
                          value:
                            'Explore interventions to address medication adherence',
                        },
                      ],
                    },
                  ],
                },
              ],
              heading: 'High Risk Factors',
            },
            aiRecommendations: {
              entries: [
                {
                  title: 'Telehealth Monitoring',
                  items: [
                    {
                      title: 'Recommendations',
                      category: 'problem',
                      subEntries: [
                        {
                          value:
                            'Manage chronic conditions Detect early health changes',
                        },
                        { value: 'Detect early health changes' },
                      ],
                    },
                    {
                      title: 'Explanation',
                      category: 'solution',
                      subEntries: [
                        { value: 'Enable early detection' },
                        { value: 'Support timely intervention' },
                      ],
                    },
                  ],
                },
              ],
              heading: 'Recommendations',
            },
          },
        },
        overview: {
          create: {
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
                  value: 'Medicare',
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
        },
      },
    ]

    for (const member of membersWithInsights) {
      await db.member.create({ data: member })
    }

    const stephanie = await db.member.findFirst({
      where: { name: 'Stephanie Newman' },
      include: { encounters: true },
    })

    await db.event.createMany({
      data: [
        {
          title: 'Follow-up Call',
          description: 'Check medication adherence',
          start: new Date('2025-11-22T10:00:00'),
          end: new Date('2025-11-22T10:30:00'),
          priority: 'HIGH',
          eventType: 'TASK',
          status: 'upcoming',
          assignedUserId: 1,
          encounterId: stephanie?.encounters?.id, // Optional link
        },
        {
          title: 'Lunch Break',
          start: new Date('2025-11-21T12:00:00'),
          end: new Date('2025-11-21T13:00:00'),
          priority: 'MEDIUM',
          eventType: 'LUNCH',
          status: 'upcoming',
          assignedUserId: 1,
          // No encounterId - standalone event
        },
        {
          title: 'Travel Time',
          start: new Date('2025-11-22T09:00:00'),
          end: new Date('2025-11-22T10:00:00'),
          priority: 'LOW',
          eventType: 'TRAVEL',
          status: 'upcoming',
          assignedUserId: 1,
        },
        {
          title: 'Call member to complete annual LTSS assessment',
          start: new Date('2025-11-22T16:00:00'),
          end: new Date('2025-11-22T16:30:00'),
          priority: 'LOW',
          eventType: 'TASK',
          status: 'upcoming',
        },
      ],
    })

    console.log('Seeding complete!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1) // Exit with an error code if seeding fails
  }
}
