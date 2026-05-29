import { IconPhone, IconHome } from '@tabler/icons-react'
import moment from 'moment'

import { PunchListItem, TimelineData } from './types'

export const timeline: TimelineData[] = [
  {
    id: 1,
    date: '11/11/24',
    time: '5:30 PM',
    event: 'Telephonic Encounter',
    description:
      'To discuss and plan the member’s health goals and interventions, ensuring alignment with their personal aspirations, such as the annual fishing trip.',
    active: true,
    type: 'call',
    Icon: IconPhone,
    summary: [
      {
        id: 1,
        label: 'Meeting Purpose',
        value: [
          'To discuss and plan the member’s health goals and interventions, ensuring alignment with their personal aspirations, such as hanging out with her grandkids.',
        ],
      },
      {
        id: 2,
        label: 'Pathway Enrollment',
        value: [
          'Suggested pathway enrollment to support annual fishing trip goal.',
          'Explained the benefits of the pathway for achieving personal goals.',
          'Provided information on how to enroll and what to expect.',
        ],
      },
      {
        id: 3,
        label: 'Goal and Intervention Review',
        value: [
          'Reviewed and selected relevant goals and interventions with member.',
          'Discussed the importance of each goal in relation to the member’s overall health.',
          'Identified specific interventions that align with the member’s preferences and needs.',
        ],
      },
      {
        id: 4,
        label: 'Patient Concerns',
        value: [
          'Discussed patient’s concerns, emphasizing tailored interventions.',
          'Listened to and validated the member’s worries and questions.',
          'Offered solutions and resources to address specific concerns',
        ],
      },
      {
        id: 5,
        label: 'Member Assessment',
        value: [
          'Conducted brief, comfortable assessment for member.',
          'Ensured the assessment was non-intrusive and respectful.',
          'Collected necessary information to tailor future interventions.',
        ],
      },
      {
        id: 6,
        label: 'Follow-Up Planning',
        value: [
          'Scheduled assessment and planned follow-up calls after doctor’s appointment.',
          'Set clear expectations for the next steps and timelines.',
          'Confirmed member’s availability and preferences for follow-up communication.',
        ],
      },
      {
        id: 7,
        label: 'Notes',
        value: [
          'Advised on diet, encouraged physical activity suitable for mobility. Patient interested in weight management program.',
        ],
      },
    ],
    transcript: [
      {
        id: 1,
        person: 'Dana Grubbs',
        conversation:
          'Hi, this is Dana calling from Braided Health, may I speak to Ms. Newman, please?',
        time: '00:10',
      },
      {
        id: 2,
        person: 'Stephanie Newman',
        conversation: 'This is Stephanie Newman',
        time: '00:15',
      },
      {
        id: 3,
        person: 'Dana Grubbs',
        conversation:
          'Before we get started, can you please confirm your full name and date of birth, so I can make sure I’m talking to the right person?',
        time: '00:25',
      },
      {
        id: 4,
        person: 'Stephanie Newman',
        conversation: 'Stephanie Newman. 12/08/1952.',
        time: '00:30',
      },
      {
        id: 5,
        person: 'Dana Grubbs',
        conversation:
          'Thank you. Ms. Newman, so nice to hear from you! How are you?',
        time: '00:45',
      },
      {
        id: 6,
        person: 'Stephanie Newman',
        conversation:
          'Oh, thank you, it’s good to talk to you, too. I’m doing okay.',
        time: '01:00',
      },
      {
        id: 7,
        person: 'Dana Grubbs',
        conversation:
          'I’d like to start off today by making sure I understand what’s important to you, so that we are able to address your concerns and goals straight away. What’s on your mind today?',
        time: '01:10',
      },
      {
        id: 8,
        person: 'Stephanie Newman',
        conversation:
          'I’m really excited about my grandson’s second birthday next weekend, it’s been awhile since we’ve had the whole family in one place, and I’m very much looking forward to it. Last year I had to miss the party because I was in the hospital after I fell.',
        time: '01:30',
      },
      {
        id: 9,
        person: 'Dana Grubbs',
        conversation:
          'That’s so exciting – so glad you’re healthy this year so you can attend. Is there anything that you’re worried about right now?',
        time: '02:10',
      },
      {
        id: 10,
        person: 'Stephanie Newman',
        conversation:
          'I have an appointment with my orthopaedic doctor next week – I’m worried he’s going to tell me I will need to have surgery on my hip, it’s been pretty bad lately, and I know it needs to be fixed, but I don’t want to have to spend time in the hospital lately. On the one hand, I’ve noticed I’ve been feeling a bit down, and less energy - I just feel like I’m in a funk - and I think it’s probably related to my pain, and not being able to get around - but on the other hand I’m scared.',
        time: '02:40',
      },
      {
        id: 11,
        person: 'Dana Grubbs',
        conversation:
          'I hear you – that can be scary. What date is your appointment – do you have someone available to accompany you to the appointment? Can I help you get your questions/concerns written down before you go so you can make sure you get the information you need about your options? Do you have a way to get there?',
        time: '03:50',
      },
      {
        id: 12,
        person: 'Stephanie Newman',
        conversation:
          'My daughter is going to take me, but I do like the idea of writing down my questions – she can also help me make sure I get them answered.',
        time: '04:15',
      },
      {
        id: 13,
        person: 'Dana Grubbs',
        conversation:
          'Great, I can request a copy of your notes, and we can review them next time we talk as well. Ms Newman, I also want to understand what things you are looking forward to or excited about in the next 3-6 months?',
        time: '05:05',
      },
      {
        id: 14,
        person: 'Stephanie Newman',
        conversation:
          'Really, I just want to spend as much time as possible with my family as I can. I’m not spry as I used to be, but I want to enjoy the time I have left as much as possible. It’s nothing fancy, but when you’re my age, it’s the things you’ve taken for granted that become important – being able to walk without pain, getting to the bathroom without falling…',
        time: '06:28',
      },
      {
        id: 15,
        person: 'Dana Grubbs',
        conversation:
          'It’s the little things, eh? I think those are great goals – and we are definitely going to work with you to support you, get you what you need in order to meet those goals, so you can spend as much time as possible enjoying time with your family. You mentioned pain – is this new or getting worse? Have you talked to your doctor about this?',
        time: '06:40',
      },
      {
        id: 16,
        person: 'Stephanie Newman',
        conversation:
          'A little bit, last time I saw them, but it seems to be getting worse, and although I’ve had pain in my hip for years, I’m now noticing it in my knee and feet too. Getting old is not for the weak!!',
        time: '07:00',
      },
      {
        id: 17,
        person: 'Dana Grubbs',
        conversation:
          'Well let’s make sure we add that to your list to talk to your doctor about next week. They may have ideas how to reduce pain or refer you to someone else who can address those issues. You also mentioned being in the hospital last year – that was after one of your falls, right?',
        time: '07:30',
      },
      {
        id: 18,
        person: 'Stephanie Newman',
        conversation:
          'Yeah, that’s right, I fell getting out of the bathtub – it was so scary.',
        time: '07:50',
      },
    ],
    activities: [
      'Initiated Frailty Pathway',
      'PHQ2',
      'PHQ9',
      'Updated person centered service plan',
    ],
    recommendations: [
      {
        id: 1,
        label:
          'Schedule home visit to complete home safety assessment in 2 weeks',
        priority: 'High',
        action: 'Schedule',
      },
      {
        id: 2,
        label: 'Request records from orthopaedic surgeon',
        priority: 'Medium',
        action: 'Create a Task',
      },
      {
        id: 3,
        label: 'Call in 1 week to follow up on referral for home based mods',
        priority: null,
        action: 'Add to Calendar',
      },
    ],
  },
  {
    id: 2,
    date: '11/10/24',
    time: '3:20 PM',
    event: 'Home Visit',
    description:
      'Reminded about BP meds, patient agrees to monitor BP at home. Follow-up on BP next week.',
    active: false,
    type: 'visit',
    Icon: IconHome,
    summary: {},
    transcript: {},
    activities: [],
    recommendations: [],
  },
  {
    id: 3,
    date: '11/08/24',
    time: '6:10 PM',
    event: 'Telephonic Encounter',
    description:
      'Suggested home safety measures to prevent falls, possible referral to PT. Patient notes occasional dizziness.',
    active: false,
    type: 'call',
    Icon: IconPhone,
    summary: {},
    transcript: {},
    activities: [],
    recommendations: [],
  },
  {
    id: 4,
    date: '10/02/24',
    time: '4:40 PM',
    event: 'Home Visit',
    description:
      'Reminded about BP meds, patient agrees to monitor BP at home. Follow-up on BP next week.',
    active: false,
    type: 'visit',
    Icon: IconHome,
    summary: {},
    transcript: {},
    activities: [],
    recommendations: [],
  },
]

export const servicePlan = [
  {
    id: 1,
    urgency: 'High',
    label: 'Need 1',
    description:
      'I am unable to complete activites of daily living and instrumental activities of daily living without support.',
    status: 'Not Started',
    startDate: '06/27/2024',
    endDate: '07/26/2024',
  },
  {
    id: 2,
    urgency: 'High',
    label: 'Need 2',
    description: 'I struggle to get in and out of my shower without falling.',
    status: 'In Progress',
    startDate: '06/27/2024',
    endDate: '07/26/2024',
  },
  {
    id: 3,
    urgency: 'Medium',
    label: 'Need 3',
    description: 'I do not exercise regularly',
    status: 'Completed',
    startDate: '06/27/2024',
    endDate: '07/26/2024',
  },
]

export const carePlan = [
  {
    id: 1,
    name: 'Issue: Fall Risk',
    priority: 'Urgent',
    description: 'Prevent falls and maintain fall-free status over 3 months.',
    description2:
      'Barriers: Fear of falling, cognitive impairment, medication side effects',
    background: '#FFE3E3',
    dueDate: `12/31/2024`,
    color: '#C92A2A',
    state: 'active',
    stageInfo: null,
    entries: [
      {
        id: 1,
        task: 'Conduct a comprehensive fall risk assessment, including evaluation of medications that may contribute to fall risk (e.g., sedatives, antihypertensives)',
        assigned: 'Jane Cooper',
        department: 'PCP',
        date: '06/30/2024',
        status: 'Completed',
      },
      {
        id: 2,
        task: 'Conduct a medication review to identify polypharmacy or medications that may increase fall risk (e.g., sedatives, antihypertensives).',
        assigned: 'Jacob Jones',
        department: 'Pharmacist',
        date: '07/30/2024',
        status: 'In Progress',
      },
      {
        id: 3,
        task: 'Educate family members or caregivers on fall prevention strategies and how to assist the patient with safe transfers and mobility.',
        assigned: 'Bessie Smith',
        department: 'NCM',
        date: '08/15/2024',
        status: 'In Progress',
      },
    ],
  },
  {
    id: 2,
    name: 'Issue: Depression',
    priority: 'Low',
    description: 'Member will report 50% decrease in PHQ9 score',
    background: '#DEF3EE',
    color: '#000',
    state: '',
    stageInfo: null,
  },
  {
    id: 3,
    name: 'Issue: Diabetes',
    priority: 'Medium',
    description: 'Member will maintain A1c at <8.0%',
    background: '#FFF3BF',
    color: '#000',
    state: '',
    stageInfo: null,
  },
]

export const HCBSPlan = [
  {
    id: 1,
    date: '12/01/2024',
    active: true,
    visit: ['home'],
    data: [
      '2x CHW visits',
      'Member remains fall free',
      'Ongoing monthly therapy sessions with community provider',
      'Ongoing PEARLs coaching',
    ],
  },
  {
    id: 2,
    date: '01/01/2025',
    active: false,
    visit: ['home'],
    data: [
      '2x CHW visits',
      'Member remains fall free',
      'Ongoing monthly therapy sessions with community provider',
      'Ongoing PEARLs coaching',
    ],
  },
]

export const punchList: PunchListItem[] = [
  {
    id: 1,
    checked: false,
    name: 'Consent',
    description: 'Ensure member’s consent to process assessment',
    state: 'active',
    aiEnabled: false,
    aiSuggestion: true,
    stageInfo: {
      stage: 'started',
    },
    category: 'introduction',
    view: true,
    key: 'consent',
  },
  {
    id: 2,
    checked: false,
    name: 'Eligibility',
    description: 'CHW eligibility and module suggestion',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'introduction',
    view: true,
    key: 'eligibility',
  },
  {
    id: 3,
    checked: false,
    name: 'Conversation Starter',
    description: 'Verify member identity and elicit member priorities',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'introduction',
    view: true,
    key: 'conversationStarter',
  },
  {
    id: 4,
    checked: false,
    name: 'Person Centered Discovery',
    description: 'Personal overview',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'assessment',
    view: true,
    key: 'personCenteredDiscovery',
  },
  {
    id: 5,
    checked: false,
    name: 'Pathway Assessment Tools',
    description: 'Based on concerns raised',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    formCount: 4,
    priority: 'Urgent',
    showPriorityBadge: false,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'assessment',
    view: true,
    key: 'pathwayAssessmentTools',
  },
  {
    id: 6,
    checked: false,
    name: 'PHQ2 Assessment',
    description: 'Evaluate depression severity.',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    showPriorityBadge: false,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'interaction',
    view: false,
    key: 'phq2Assessment',
  },
  {
    id: 7,
    checked: false,
    name: 'PHQ9 Assessment',
    description: 'Evaluate depression severity.',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    showPriorityBadge: false,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'interaction',
    view: false,
    key: 'phq9Assessment',
  },
  {
    id: 8,
    checked: false,
    name: 'Time to wrap-up',
    description:
      'Review the updated service plan, schedule follow ups and finalise documentation.',
    state: '',
    aiEnabled: false,
    aiSuggestion: true,
    stageInfo: {
      stage: 'notStarted',
      content: '10 min',
    },
    category: 'wrapup',
    view: true,
    key: 'timeToWrapUp',
  },
]

export const PHQ9Questionaire = [
  {
    problem: 'Little interest or pleasure in doing things',
    answer: 2,
    id: 'pr0',
  },
  {
    problem: 'Feeling down, depressed or hopeless',
    answer: 3,
    id: 'pr1',
  },
  {
    problem: 'Trouble falling or staying asleep, or sleeping too much',
    answer: '',
    id: 'pr2',
  },
  {
    problem: 'Feeling tired or having little energy',
    answer: '',
    id: 'pr3',
  },
  {
    problem: 'Poor appetite or overeating',
    answer: '',
    id: 'pr4',
  },
  {
    problem:
      'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    answer: '',
    id: 'pr5',
  },
  {
    problem:
      'Trouble concentrating on things, such as reading the newspaper or watching television',
    answer: '',
    id: 'pr6',
  },
  {
    problem:
      'Moving or speaking so slowly that other people could have noticed? Or the opposite being so fidgety or restless that you have been moving around a lot more than usual',
    answer: '',
    id: 'pr7',
  },
  {
    problem:
      'Thoughts that you would be better off dead or of hurting yourself in some way',
    answer: '',
    id: 'pr8',
  },
]

export const serviceDate = {
  'Start Date': '06/28/2024',
  'End Date': '06/27/2024',
}

export const HCBSChart = [
  {
    month: 'Sep',
    visit: true,
    call: true,
    readings: [
      { current: 59, date: moment('2024-09-01').toISOString(), acute: false },
      { current: 61, date: moment('2024-09-12').toISOString(), acute: true },
      { current: 62, date: moment('2024-09-16').toISOString(), acute: true },
    ],
  },
  {
    month: 'Oct',
    visit: true,
    call: true,
    readings: [
      { current: 64, date: moment('2024-10-17').toISOString(), acute: true },
    ],
  },
  {
    month: 'Nov',
    visit: false,
    call: true,
    readings: [
      { current: 71, date: moment('2024-11-29').toISOString(), acute: true },
    ],
  },
  {
    month: 'Dec',
    visit: true,
    call: false,
    readings: [],
  },
  {
    month: 'Jan',
    visit: true,
    call: false,
    readings: [],
  },
  {
    month: 'Feb',
    visit: true,
    call: false,
    readings: [
      {
        current: null,
        date: moment('2025-02-28').toISOString(),
        desired: 55,
        projected: 81,
        acute: false,
      },
    ],
  },
]

export const reviewPlan = [
  {
    id: 1,
    name: 'Frailty Pathway',
    issue: 'Issue 1: Fall Risk',
    aiGen: true,
    goalDescription: 'Goal A: Member will have zero falls',
    dueDate: `12/31/2024`,
    isAiGenerated: true,
    description: 'Rising risk score due to multiple recent ED admissions',
    isSelected: false,
    entries: [
      {
        id: 1,
        task: 'Home Mods: install shower bar',
        assigned: 'Dana Grubbs',
        date: '06/30/2024',
        status: '',
      },
      {
        id: 2,
        task: 'Silver Sneakers Enrollment',
        assigned: 'Dana Grubbs',
        date: '07/30/2024',
        status: '',
      },
      {
        id: 3,
        task: 'In home visit: Home Risk Assessment',
        assigned: 'Dana Grubbs',
        date: '08/15/2024',
        status: '',
      },
    ],
    aiReason:
      'Risk score continues to increase, with several falls and resulting admission over last 3 months, despite execution of these interventions',
    aiSuggestions: [
      {
        id: 1,
        task: 'Refer to PT for weekly in home sessions',
        assigned: 'Dana Grubbs',
        date: '06/30/2024',
        status: 'In Progress',
      },
      {
        id: 2,
        task: 'High risk medication review',
        assigned: 'Dana Grubbs',
        date: '07/30/2024',
        status: 'In Progress',
      },
    ],
  },
  {
    id: 2,
    name: 'Mental Health Pathway',
    issue: 'Issue 2: Depression Symptoms',
    aiGen: true,
    goalDescription:
      'Goal A: Member will have 50% reduction in PHQ9 score, indicating reduction in depression symptoms',
    dueDate: `12/31/2024`,
    isAiGenerated: true,
    description:
      'Manage mental health symptoms which impair ability to take care of daily needs',
    isSelected: false,
    entries: [
      {
        id: 1,
        task: 'Home Mods: install shower bar',
        assigned: 'Dana Grubbs',
        date: '06/30/2024',
        status: '',
      },
      {
        id: 2,
        task: 'Silver Sneakers Enrollment',
        assigned: 'Dana Grubbs',
        date: '07/30/2024',
        status: '',
      },
      {
        id: 3,
        task: 'In home visit: Home Risk Assessment',
        assigned: 'Dana Grubbs',
        date: '08/15/2024',
        status: '',
      },
    ],
    aiReason:
      'Risk score continues to increase, with several falls and resulting admission over last 3 months, despite execution of these interventions',
    aiSuggestions: [
      {
        id: 1,
        task: 'Refer to PT for weekly in home sessions',
        assigned: 'Dana Grubbs',
        date: '06/30/2024',
        status: 'In Progress',
      },
      {
        id: 2,
        task: 'High risk medication review',
        assigned: 'Dana Grubbs',
        date: '07/30/2024',
        status: 'In Progress',
      },
    ],
  },
]

export const PunchlistSummaryTransactions = {
  caseNote: {
    dateTimeInfo: {
      date: '11/11/2024',
      time: '5:30 PM',
      duration: '45 mins',
    },
    patient: 'Stephanie Newman',
    chw: 'Dana Grubbs',
    subjective: `Stephanie reports increased stress related to being asked to move out of her current living situation by the end of the month. She has been staying in a friend’s guest room but needs to find new housing soon. She shares that she is feeling “stressed, but not depressed” and expresses concern about being perceived as “crazy.” She states she has been taking her meds, but is concerned she will not be able to continue to do so if she doesn’t find a stable place to live. She also reports transportation barriers, her daughter, who previously helped with caregiving and rides, has become “really stressed out” and has said she’s no longer available for transportation. Stephanie states she has a small Social Security income and
    has tried applying for assistance but found the paperwork confusing. She wants to “spend more time with family” in the coming months and appreciates the support from Braided Health.`,
    objective: `Stephanie was alert, oriented, and cooperative throughout the call. Speech was coherent, and mood appeared mildly anxious but engaged. She was able to clearly articulate her needs and goals. Primary concerns centered around housing instability, utilities, her daughter’s stress around caregiving. CHW observed that Stephanie is motivated by family connections and receptive to assistance. No acute safety or medical concerns noted during the interaction.`,
    assessment: `Stephanie presents with multiple social determinants of health barriers impacting her ability to manage chronic conditions (diabetes, hypertension). Housing instability and limited income are current stressors contributing to her concern about ability to maintain medication adherence  and increased anxiety. She demonstrates insight into her health needs and willingness to  collaborate.

    Identified barriers include: unstable housing, limited financial resources (eligible for SNAP and housing benefits), potential instability of caregiving support, and future medication adherence issues due to housing instability.

    Stephanie would benefit from support in securing stable housing, reapplying for SNAP, arranging transportation to medical appointments, and receiving medication adherence education and behavioral support around injection anxiety.`,
    plan: [
      {
        id: 1,
        title: 'Housing Stability:',
        description:
          'Provide guided assistance completing Section 8 application, provide resources for temporary crisis housing.',
      },
      {
        id: 2,
        title: 'Utilities',
        description:
          'Contact utility company to verify eligibility for assistance program, provide client printed LIHEAP application and assist with completion.',
      },
      {
        id: 3,
        title: 'Medication adherence',
        description:
          'Deferred per client request, as feels if other issues are addressed, that she will be able to maintain medication adherence.',
      },
      {
        id: 4,
        title: 'Caregiver Support',
        description: 'Identify respite care giver resources.',
      },
    ],
  },

  clientCarePlan: {
    goals: [
      {
        id: 1,
        title: 'Client Stated Goal',
        description:
          'I want to spend more time playing with my grandkids without worrying about pain or mobility limitations.',
      },
    ],
    issues: [
      {
        id: 1,
        title: 'Housing Instability',
        status: 'In Progress',
        priority: 'High',
        smartGoal:
          'By 01/24/2026, Stephanie will apply to at least three housing programs (Section 8, Senior Housing, and Local Affordable Housing) and complete one housing application with CHW support.',
        identifiedBarriers:
          'Limited income; confusion with paperwork; limited computer and transportation access.',
        startDate: '12/10/2024',
        targetEndDate: '04/24/2026',
        recenterCount: 0,
        // rows to render in "Intervention and Assigned To" table
        interventions: [
          {
            id: 1,
            task: 'Refer to housing navigation program',
            assignedTo: 'Dana Grubbs, CHW',
            startDate: '10/28/2025',
            targetEndDate: '02/28/2026',
            status: 'In Progress',
          },
          {
            id: 2,
            task: 'Refer to local rent relief / emergency housing support',
            assignedTo: 'Dana Grubbs, CHW',
            startDate: '10/30/2025',
            targetEndDate: '02/28/2026',
            status: 'Not Started',
          },
        ],
      },

      {
        id: 2,
        title: 'Utilities and Basic Needs',
        status: 'Not Started',
        priority: 'Medium',
        smartGoal:
          'By 12/31/2025, Stephanie will apply for at least one utility assistance program (LIHEAP or hardship fund) to prevent shut-off or arrears accumulation.',
        identifiedBarriers:
          'Difficulty navigating online forms; limited transportation.',
        startDate: '10/24/2025',
        targetEndDate: '12/31/2025',
        recenterCount: 0,
        interventions: [
          {
            id: 1,
            task: 'Provide printed LIHEAP application and assist with completion',
            assignedTo: 'Dana Grubbs, CHW',
            startDate: '11/01/2025 ',
            targetEndDate: '2/15/2026',
            status: 'In Progress',
          },
          {
            id: 2,
            task: 'Contact utility company to verify eligibility for assistance',
            assignedTo: 'Dana Grubbs, CHW',
            startDate: '11/01/2025 ',
            targetEndDate: '01/10/2026',
            status: 'Not Started',
          },
        ],
      },

      {
        id: 3,
        title: 'Caregiver Support',
        status: 'In Progress',
        priority: 'Not assigned',
        smartGoal:
          'By 01/15/2026, Stephanie’s daughter,  will identify at least two support resources that can assist with supporting her as Stephanie’s caregiver',
        identifiedBarriers:
          'Embarrassment about needing help; limited awareness of community supports.',
        startDate: '10/24/2025',
        targetEndDate: '01/15/2026',
        recenterCount: 0,
        interventions: [
          {
            id: 1,
            task: 'Facilitate discussion with family  about assistance.',
            assignedTo: 'Cheryl Newman',
            startDate: '10/28/2025',
            targetEndDate: '2/10/2026',
            status: 'In Progress',
          },
          {
            id: 2,
            task: 'Provide resource list for local CG  respite services',
            assignedTo: 'Dana Grubbs, CHW',
            startDate: '01/05/2025',
            targetEndDate: '02/15/2026',
            status: 'Not Started',
          },
        ],
      },
    ],
  },

  transcript: [
    {
      id: 1,
      person: 'Dana Grubbs',
      conversation:
        'Hi, this is Dana calling from Braided Health, may I speak to Ms. Newman, please?',
      time: '00:10',
    },
    {
      id: 2,
      person: 'Stephanie Newman',
      conversation: 'This is Stephanie Newman',
      time: '00:15',
    },
    {
      id: 3,
      person: 'Dana Grubbs',
      conversation:
        'Before we get started, can you please confirm your full name and date of birth, so I can make sure I’m talking to the right person?',
      time: '00:25',
    },
    {
      id: 4,
      person: 'Stephanie Newman',
      conversation: 'Stephanie Newman. 12/08/1952.',
      time: '00:30',
    },
    {
      id: 5,
      person: 'Dana Grubbs',
      conversation:
        'Thank you. Ms. Newman, so nice to hear from you! How are you?',
      time: '00:45',
    },
    {
      id: 6,
      person: 'Stephanie Newman',
      conversation:
        'Oh, thank you, it’s good to talk to you, too. I’m doing okay.',
      time: '01:00',
    },
    {
      id: 7,
      person: 'Dana Grubbs',
      conversation:
        "I’d like to start off today by making sure I understand what's important to you, so that we are able to address your concerns and goals straight away. What’s on your mind today?",
      time: '01:10',
    },
    {
      id: 8,
      person: 'Stephanie Newman',
      conversation:
        'I’m really excited about my grandson’s second birthday next weekend... Last year I had to miss the party because I was in the hospital after I fell.',
      time: '01:30',
    },
    {
      id: 9,
      person: 'Dana Grubbs',
      conversation:
        'That’s so exciting – so glad you’re healthy this year so you can attend. Is there anything that you’re worried about right now?',
      time: '02:10',
    },
    {
      id: 10,
      person: 'Stephanie Newman',
      conversation:
        'I have an appointment with my orthopaedic doctor next week – I’m worried he’s going to tell me I will need to have surgery on my hip...',
      time: '02:40',
    },
    {
      id: 11,
      person: 'Dana Grubbs',
      conversation:
        'I hear you – that can be scary. What date is your appointment – do you have someone available to accompany you to the appointment? ...',
      time: '03:50',
    },
    {
      id: 12,
      person: 'Stephanie Newman',
      conversation:
        'My daughter is going to take me, but I do like the idea of writing down my questions – she can also help me make sure I get them answered.',
      time: '04:15',
    },
    {
      id: 13,
      person: 'Dana Grubbs',
      conversation:
        'Great, I can request a copy of your notes, and we can review them next time we talk as well. Ms Newman, I also want to understand what things you are looking forward to or excited about in the next 3-6 months?',
      time: '05:05',
    },
    {
      id: 14,
      person: 'Stephanie Newman',
      conversation:
        'Really, I just want to spend as much time as possible with my family as I can. I’m not spry as I used to be...',
      time: '06:28',
    },
    {
      id: 15,
      person: 'Dana Grubbs',
      conversation:
        'It’s the little things, eh? ... You mentioned pain – is this new or getting worse? Have you talked to your doctor about this?',
      time: '06:40',
    },
    {
      id: 16,
      person: 'Stephanie Newman',
      conversation:
        'A little bit, last time I saw them, but it seems to be getting worse...',
      time: '07:00',
    },
    {
      id: 17,
      person: 'Dana Grubbs',
      conversation:
        'Well let’s make sure we add that to your list to talk to your doctor about next week. ...',
      time: '07:30',
    },
    {
      id: 18,
      person: 'Stephanie Newman',
      conversation:
        'Yeah, that’s right, I fell getting out of the bathtub – it was so scary.',
      time: '07:50',
    },
  ],
}

export const conversationStartersData = {
  script:
    'Great! Now I want to talk about you. We’ll keep this brief, but it’s important that I learn more about you so we can make sure the support we offer is what you want and actually fits your life.',
  questions: [
    {
      label: 'How are you feeling today?',
      key: 1,
      checked: false,
      children: [],
    },
    {
      label: 'Anything you are particularly worried about that’s on your mind?',
      key: 2,
      checked: false,
      children: [],
    },
    {
      label:
        'When you think about your day-to-day right now, whats going well?',
      key: 3,
      checked: false,
      children: [],
    },
    {
      label:
        'Is that something you’d like help with? Or is something else feeling more urgent right now?',
      key: 4,
      checked: false,
      children: [],
    },
  ],
  todoText: 'Re-check the concerns mentioned so far',
  additionalPrompt:
    'Tell me more, there may be some additional things I can help you with.',
}

export const pathwayAssessmentToolsData = {
  assessmentTools: [
    {
      id: 1,
      name: 'Utilities',
      description: 'Ensuring resource availability',
      questionsGroup: {
        radioSelectionQuestion: {
          options: ['Yes', 'No', 'Unsure', 'Prefer not to say'],
          questions: [
            {
              id: 1,
              question:
                'Are you able to pay for basic needs like rent, food, and utilities each month?',
              selectedAnswer: null,
            },
            {
              id: 2,
              question:
                'Do you ever have to choose between paying bills and other essentials?',
              selectedAnswer: null,
            },
            {
              id: 3,
              question: 'Do you have a steady source of income right now?',
              selectedAnswer: null,
            },
            {
              id: 4,
              question:
                'Are you receiving benefits like SNAP, TANF, or Social Security?',
              selectedAnswer: null,
            },
            {
              id: 5,
              question: 'Do you have any debt or bills that feel overwhelming?',
              selectedAnswer: null,
            },
            {
              id: 6,
              question:
                'Have you received any notices about utilities being shut off?',
              selectedAnswer: null,
            },
            {
              id: 7,
              question: 'Do you have enough food and supplies for the week?',
              selectedAnswer: null,
            },
            {
              id: 8,
              question:
                'Do you want help exploring additional financial resources or getting or keeping a job?',
              selectedAnswer: null,
            },
          ],
        },
        textInputQuestions: [
          {
            id: 1,
            question: 'What are your current sources of income?',
            value: '',
            placeholder: 'Write here',
          },
        ],
      },
    },
    {
      id: 2,
      name: 'Legal Assistance',
      description: 'Gathering legal or active case information',
      questionsGroup: {
        radioSelectionQuestion: {
          options: ['Yes', 'No', 'Unsure', 'Prefer not to say'],
          questions: [
            {
              id: 1,
              question: 'Received any legal notices or paperwork lately?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 2,
              question:
                'Is this issue urgent or a risk to your housing, job, or safety?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 3,
              question: 'What is the deadline?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 4,
              question: 'Have you consulted a lawyer?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 5,
              question: 'Do you know how to reach legal services nearby?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 6,
              question: 'Would free or low-cost legal support help you?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 7,
              question: 'Do you have hearings or deadlines related to this?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 8,
              question: 'Need help with paperwork or reminders?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
            {
              id: 9,
              question:
                'Do you have legal needs (eviction, custody, immigration, discrimination)?',
              selectedAnswer: null,
              allowPreferNotToSay: true,
            },
            {
              id: 10,
              question: 'Need help finding legal services?',
              selectedAnswer: null,
              allowPreferNotToSay: false,
            },
          ],
        },
        multipleChoiceQuestions: [
          {
            questionId: 1,
            question:
              'Do you have unmet legal needs (eviction risk, custody, immigration, discrimination)?',
            options: [
              {
                id: 1,
                label: 'Eviction risk',
              },
              {
                id: 2,
                label: 'Custody',
              },
              {
                id: 3,
                label: 'Immigration',
              },
              {
                id: 4,
                label: 'Descrimination',
              },
              {
                id: 5,
                label: 'Criminal charges',
              },
              {
                id: 6,
                label: 'Other',
              },
            ],
          },
        ],
        textInputQuestions: [
          {
            id: 1,
            question: 'If, other, what legal assistance is required?',
            value: '',
          },
        ],
      },
    },
    {
      id: 3,
      name: 'Housing',
      description: 'Ensuring resources for stay, food etc.',
      questionsGroup: {
        multipleChoiceQuestions: [
          {
            questionId: 1,
            question:
              'Can you tell me more about where you are staying right now?',
            options: [
              {
                id: 1,
                label: 'Own/rent',
              },
              {
                id: 2,
                label: 'Staying with others',
              },
              {
                id: 3,
                label: 'Shelter',
              },
              {
                id: 4,
                label: 'Street',
              },
              {
                id: 5,
                label: 'Other',
              },
            ],
          },
          {
            questionId: 2,
            question: 'What’s most important to you in a place to live?',
            options: [
              {
                id: 1,
                label: 'Safety',
              },
              {
                id: 2,
                label: 'Location',
              },
              {
                id: 3,
                label: 'Near Services',
              },
              {
                id: 4,
                label: 'Other',
              },
            ],
          },
        ],
        radioSelectionQuestion: {
          options: ['Yes', 'No', 'Unsure', 'Prefer not to say'],
          questions: [
            {
              id: 1,
              question: 'Do you currently have stable housing?',
              selectedAnswer: null,
            },
            {
              id: 2,
              question: 'Do you feel safe in your current living situation?',
              selectedAnswer: null,
            },
            {
              id: 3,
              question:
                'Have you had any times recently when you didn’t have anywhere to stay?',
              selectedAnswer: null,
            },
            {
              id: 4,
              question:
                'Do you have family, friends, or others you can rely on for housing?',
              selectedAnswer: null,
            },
            {
              id: 5,
              question:
                'Does where you are staying make it easy to take care of your health needs (medications, equipment, appointments)?',
              selectedAnswer: null,
            },
            {
              id: 6,
              question:
                'Do you have a safe place to sleep, cook meals, and take care of daily activities?',
              selectedAnswer: null,
            },
            {
              id: 7,
              question:
                'Have you applied for housing or benefits programs before?',
              selectedAnswer: null,
            },
            {
              id: 8,
              question:
                'Do you have enough food, clothing, or supplies where you’re staying now?',
              selectedAnswer: null,
            },
            {
              id: 9,
              question:
                'Do you have access to a phone or a way to be contacted if a housing program has an opening?',
              selectedAnswer: null,
            },
            {
              id: 10,
              question:
                'Would you like help connecting to housing or support services today?',
              selectedAnswer: null,
            },
          ],
        },
        textInputQuestions: [
          {
            id: 1,
            question:
              'Who do you usually turn to when your housing feels uncertain?',
            value: '',
            placeholder: 'Write here',
          },
          {
            id: 2,
            question:
              'If you could picture the kind of housing support that would help most, what would that look like?',
            value: '',
            placeholder: 'Write here',
          },
        ],
      },
    },
    {
      id: 4,
      name: 'Caregiver Support',
      description: 'Ensuring supportive care',
      questionsGroup: {
        radioSelectionQuestion: {
          options: ['Yes', 'No'],
          questions: [
            {
              id: 1,
              question: 'Do you feel socially connected and supported?',
              selectedAnswer: null,
            },
            {
              id: 2,
              question:
                'Do you have people you talk to regularly or spend time with?',
              selectedAnswer: null,
            },
            {
              id: 3,
              question:
                'Do you ever feel overwhelmed by your caregiving responsibilities?',
              selectedAnswer: null,
            },
            {
              id: 4,
              question:
                'Do you have anyone who helps you with caregiving tasks?',
              selectedAnswer: null,
            },
            {
              id: 5,
              question:
                'When you need a break, is there someone you can turn to?',
              selectedAnswer: null,
            },
            {
              id: 6,
              question:
                'Do you have what you need to provide care safely (equipment, supplies, training)?',
              selectedAnswer: null,
            },
            {
              id: 7,
              question:
                'Would you like information about caregiver programs, financial supports, or respite options?',
              selectedAnswer: null,
            },
            {
              id: 8,
              question:
                'Do you want help finding a group of other caregivers to connect with?',
              selectedAnswer: null,
            },
            {
              id: 9,
              question:
                'Do you need immediate help today with your caregiving responsibilities?',
              selectedAnswer: null,
            },
            {
              id: 10,
              question: 'Is the person you care for safe right now?',
              selectedAnswer: null,
            },
            {
              id: 11,
              question: 'Do you provide care for a dependent adult or child?',
              selectedAnswer: null,
            },
            {
              id: 12,
              question: 'Do you provide care for a dependent adult or child?',
              selectedAnswer: null,
            },
          ],
        },
        multipleChoiceQuestions: [
          {
            questionId: 1,
            question:
              'What makes it harder for you to connect with others (transportation, health, mobility, other)?',
            options: [
              {
                id: 1,
                label: 'Transportation',
              },
              {
                id: 2,
                label: 'Health',
              },
              {
                id: 3,
                label: 'Mobility',
              },
              {
                id: 4,
                label: 'Other',
              },
            ],
          },
        ],
      },
      script:
        'It can feel tough to be alone, but there are programs and people who want to connect with you. I’ll help get you started.',
    },
  ],
}

export const frailtyPathwayListData = [
  {
    label: 'Goal: Member will have zero falls',
    key: 1,
    dueDate: '12/31/2024',
    checked: false,
    children: {
      headerData: [
        {
          name: 'Intervention/ Owner',
        },
        { name: 'Due Date' },
      ],
      rowData: [
        {
          description: {
            value: 'Schedule in-home visit',
            owner: 'Dana Grubbs',
          },
          dueDate: '12/28/2024',
          checked: false,
        },
        {
          description: {
            value: 'Complete home safety assessment',
            owner: 'Dana Grubbs',
          },
          dueDate: '12/28/2024',
        },
      ],
    },
  },
  {
    label: 'Goal: Member will gain less than 2 points on Get up and Go test',
    key: 3,
    dueDate: '12/31/2024',
    checked: false,
  },
]

export const personCenteredDiscoveryData = {
  script:
    'Great! Now I want to talk about you. We’ll keep this brief, but it’s important that I learn more about you so we can make sure the support we offer is what you want and actually fits your life.',
  questions: [
    {
      label:
        'When it comes to your health or well-being, what are the things that matter most to you?',
      key: 1,
      checked: false,
      children: [],
    },
    {
      label:
        'Have there been any recent changes that are making things harder right now?',
      key: 2,
      checked: false,
      children: [],
    },
    {
      label:
        'Are you currently getting the help you need from your doctors, caregivers or anyone else?',
      key: 3,
      checked: false,
      children: [],
    },
    {
      label:
        'Sometimes, small things can be big barriers. Has that happened to you?',
      key: 4,
      checked: false,
      children: [],
    },
  ],
  todoText: 'Re-check the concerns mentioned so far',
  additionalPrompt:
    'Tell me more, there may be some additional things I can help you with.',
}

export const aiSuggestionsData = [
  {
    id: 1,
    allowClose: true,
    title: {
      value: 'Ask member if she has transportation to her appointment',
    },
    description: {
      value:
        'Based on the score obtained at the PHQ-2, the PHQ-9 assessment should be completed as well',
    },
  },
  {
    id: 2,
    allowClose: true,
    title: {
      value: 'Ask member if she has transportation to her appointment',
    },
  },
]

export const consentOptions = [
  { key: 'communication', label: 'Communication' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'text', label: 'Text' },
]

export const informationOptions = [
  { key: 'exchangeInfo', label: 'Exchange Information' },
  { key: 'hiv', label: 'HIV/AIDs' },
  { key: 'drug', label: 'Drug & Alcohol' },
]

export const consentScriptData = {
  script:
    "Hi Stephanie Newman, I’m Dana, with Neighborhood Networks, San Diego, I’m a new part of your care team. I work with folks in the community to help make things easier, whether it’s navigating services, staying on top of your health, or just having someone in your corner. Before we get started, I just need to review some forms with you, this ensures that you're educated and aware of the program, and helps us understand any guidelines about who we can request and receive information from in order to support your care.",
}

export const consentTermsData = {
  programParticipation: {
    title: 'I agree to participate in the program',
    subtitle: 'I understand that:',
    points: [
      'My participation in this program will give me a care team to help me better understand and manage my health.',
      'Program participation will not affect my other medical benefits.',
      'Program does not require me to change my doctor(s).',
      'Program services end if I no longer meet Program eligibility requirements, no longer receive Program services, or if the care team says I no longer need Program services.',
      'This is a voluntary program and I can withdraw from the program at any time.',
      'Program is included in my health plan benefits and there is no additional fee for Program services.',
    ],
  },
  releaseInformation: {
    title: 'Release Information To and Obtain Information From',
    organizations: [
      'Neighborhood Networks, administered by the San Diego Healthcare Quality Collaborative',
      'California Department of Health Care Services, as well as any of my past, present, or future Medi-Cal or other managed care health plans',
      'Any current health care providers',
      {
        title:
          'Any community social service provider who is or may be involved in my care and maintenance (including, but not limited to:',
        list: [
          '2-1-1 San Diego',
          'County of San Diego Health & Human Services Agency',
          'Legal Aid Society',
          'Mental Health Systems',
          'Nueva Vista Family Services',
          'San Diego Center for Children',
          'San Diego Housing Commission',
          'San Diego Workforce Partnership',
          'YMCA Childcare Resource Service',
        ],
      },
    ],
  },
  informationToBeReleased: {
    title: 'Information to be Released',
    subtitle:
      'As necessary to coordinate my care, the following information may be released to the parties listed above:',
    points: [
      'Personal information (i.e., name, date of birth, address, phone number) for the purposes of connecting to a community resource',
      'Medical insurance information',
      'Current treatment plan',
      'Medical record information pertinent to my participation in Neighborhood Networks',
    ],
  },
}

export const eligibilityOptions = [
  { key: 'eligible', label: 'Is Member Eligible for CHW Program?' },
]

export const eligibilityReasonOptions = [
  {
    key: 'chronicDisease',
    label:
      'Chronic disease risk that indicate risk but do not yet warrant chronic disease diagnosis',
  },
  {
    key: 'adverseChildhood',
    label: 'Positive Adverse Childhood Events (ACEs) screening',
  },
  {
    key: 'riskFactors',
    label:
      'Presence of known risk factors including domestic or intimate Partner violence',
    subItems: [
      'Partner violence',
      'Tobacco use',
      'Excessive alcohol',
      'Drug misuse',
    ],
  },
  {
    key: 'screeningResults',
    label: 'Results of screening indicating unmet health-related social needs',
  },
  {
    key: 'healthSystemNavigation',
    label:
      'Need for support in health system navigation or resource coordination',
  },
  {
    key: 'preventativeServices',
    label: 'Need for preventative services',
  },
  {
    key: 'parentCaretaker',
    label: 'Parent or caretaker of an eligible child',
  },
  {
    key: 'emergencyVisits',
    label:
      'One or more visits to a hospital emergency department in the past 6 months',
  },
  {
    key: 'hospitalStays',
    label:
      'One or more hospital inpatient stays, including stays at a psychiatric facility, with the last 6 months, or at risk of institutionalization',
  },
  {
    key: 'missedAppointments',
    label: 'Two or more missed medical appointments within the past 6 months',
  },
  {
    key: 'detoxFacility',
    label: 'One or more stays at a detox facility within the past 12 months',
  },
]

export const timeToWrapSectionData = {
  wrapUpQuestionsData: [
    {
      id: 1,
      question:
        "Is there anything affecting your day-to-day life that we haven't covered?",
      placeholder: 'Write here',
    },
    {
      id: 2,
      question: 'Would you like help in navigating that situation? How?',
      placeholder: 'Write here',
    },
  ],

  followUpPreferencesData: [
    {
      id: 1,
      label: 'Preferred follow-up method',
      options: ['Phone', 'Text', 'Email', 'In-Person'],
    },
    {
      id: 2,
      label: 'Best days to reach you',
      options: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    {
      id: 3,
      label: 'Best times to reach you?',
      options: ['8-10a', '10-12p', '12-2p', '2-4p', '4-6p', '6-8p'],
    },
  ],

  wrapUpScript1Data:
    "I know money stress can feel overwhelming, but we'll take this one step at a time",

  wrapUpScript2Data:
    'Thank you for sharing this information with me today. Based on what we discussed, the top priority you’d like to work on is Housing. I’ll provide you with resources for that, and we’ll set a time to check in on your progress.',
  aiSuggestionOptions: [
    { id: 1, label: 'Housing', checked: false },
    { id: 2, label: 'Utilities', checked: false },
    { id: 3, label: 'Employment/Income', checked: false },
    { id: 4, label: 'Legal Needs', checked: false },
    { id: 5, label: 'Caregiver support', checked: false },
    { id: 6, label: 'Food', checked: false },
    { id: 7, label: 'Transportation', checked: false },
    { id: 8, label: 'Public benefits', checked: false },
    { id: 9, label: 'Social Connection', checked: false },
  ],
}
