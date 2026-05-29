import { create } from 'zustand'

import { AllFormValues } from 'src/interfaces/memberFormInterface'

interface FormRegistration<T = unknown> {
  formId: string
  validate: () => boolean
  getValues: () => T
  reset: () => void
  isDirty: () => boolean
}

interface MemberFormStore {
  // Form registry
  forms: Map<string, FormRegistration>

  // State
  isEditing: boolean
  addingNewMember: boolean
  isSaving: boolean

  // Actions
  registerForm: (formId: string, form: FormRegistration) => void
  unregisterForm: (formId: string) => void
  setIsEditing: (value: boolean) => void
  setAddingNewMember: (value: boolean) => void
  setIsSaving: (value: boolean) => void

  // Form operations
  validateAllForms: () => boolean
  getAllFormValues: () => AllFormValues
  resetAllForms: () => void
  hasUnsavedChanges: () => boolean
}

export const useMemberFormStore = create<MemberFormStore>((set, get) => ({
  forms: new Map(),
  isEditing: false,
  isSaving: false,
  addingNewMember: false,

  registerForm: (formId, form) => {
    const forms = new Map(get().forms)
    forms.set(formId, form)
    set({ forms })
  },

  unregisterForm: (formId) => {
    const forms = new Map(get().forms)
    forms.delete(formId)
    set({ forms })
  },

  setIsEditing: (value) => set({ isEditing: value }),
  setIsSaving: (value) => set({ isSaving: value }),
  setAddingNewMember: (value) => set({ addingNewMember: value }),

  validateAllForms: () => {
    const { forms } = get()
    let allValid = true

    forms.forEach((form) => {
      if (!form.validate()) {
        allValid = false
      }
    })

    return allValid
  },

  getAllFormValues: (): AllFormValues => {
    const { forms } = get()
    const allValues: Record<string, AllFormValues> = {}

    forms.forEach((form, formId) => {
      allValues[formId] = form.getValues()
      console.log(form.getValues())
    })

    return allValues
  },

  resetAllForms: () => {
    const { forms } = get()
    forms.forEach((form) => form.reset())
  },

  hasUnsavedChanges: () => {
    const { forms } = get()
    let hasChanges = false

    forms.forEach((form) => {
      if (form.isDirty()) {
        hasChanges = true
      }
    })

    return hasChanges
  },
}))
