// Member Profile Form
export interface MemberProfileFormValues {
  memberName: string
  bio: string
  gender: string
  dob: Date | null
  primaryContact: string
  secondaryContact: string
  ethnicity: string
  address: string
}

// Overview Form - Key-Value pair type
export interface OverviewKeyValue {
  key: string
  value: string | Date | null
}

// Overview Form
export interface OverviewFormValues {
  careManagement: OverviewKeyValue[]
  operationalMetrics: OverviewKeyValue[]
  overview: OverviewKeyValue[]
}

// Combined form values type
export interface AllFormValues {
  memberProfile?: MemberProfileFormValues
  overview?: OverviewFormValues
}
