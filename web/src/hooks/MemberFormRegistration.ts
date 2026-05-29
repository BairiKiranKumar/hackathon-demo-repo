// hooks/MemberFormRegistration.ts
import { useEffect, useRef } from 'react'

import { UseFormReturnType } from '@mantine/form'

import { useMemberFormStore } from 'src/store/MemberFormStore'

export const useMemberFormRegistration = <T>(
  formId: string,
  form: UseFormReturnType<T>
) => {
  const registerForm = useMemberFormStore((state) => state.registerForm)
  const unregisterForm = useMemberFormStore((state) => state.unregisterForm)

  // Store form in ref to avoid re-registering on every render
  const formRef = useRef(form)
  formRef.current = form

  useEffect(() => {
    // Register form with store using ref
    registerForm(formId, {
      formId,
      validate: () => {
        const result = formRef.current.validate()
        return !result.hasErrors
      },
      getValues: () => formRef.current.values,
      reset: () => formRef.current.reset(),
      isDirty: () => formRef.current.isDirty(),
    })

    // Cleanup on unmount only
    return () => {
      unregisterForm(formId)
    }
  }, [formId]) // Only re-register if formId changes
}
