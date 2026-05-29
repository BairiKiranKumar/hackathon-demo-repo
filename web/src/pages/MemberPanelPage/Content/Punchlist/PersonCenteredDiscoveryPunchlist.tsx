import { useCallback, useEffect } from 'react'

import { Flex, Title, Text, Card, Checkbox, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import usePunchlistStore from 'src/store/punchlistStore'

export const PersonCenteredDiscoveryPunchlist = ({
  personCenteredDiscoveryQuestions,
}) => {
  const personCenteredFormValues = usePunchlistStore(
    (state) => state.personCenteredDiscoveryFormValues
  )
  const setPersonCenteredDiscoveryFormData = usePunchlistStore(
    (state) => state.setPersonCenteredDiscoveryFormData
  )

  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)
  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )

  const personCenteredForm = useForm({
    initialValues: {
      questions:
        personCenteredFormValues.questions.length > 0
          ? personCenteredFormValues.questions
          : personCenteredDiscoveryQuestions.map((q) => ({
              label: q.label,
              checked: q.checked || false,
              key: q.key,
            })),
    },
    validate: {
      questions: (value) => {
        // Check if ALL questions are checked
        const allChecked = value.every((q) => q.checked === true)
        return allChecked ? null : 'Please select all questions'
      },
    },
  })

  const isAnyFieldTouched = personCenteredForm.isTouched()

  const handleCheckboxChange = useCallback(
    (index: number) => {
      personCenteredForm.setFieldValue(
        `questions.${index}.checked`,
        (currentValue: boolean) => !currentValue
      )
    },
    [personCenteredForm]
  )

  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('personCenteredDiscovery')
      setPersonCenteredDiscoveryFormData(personCenteredForm.values)
    }
  }, [
    personCenteredForm.values,
    isAnyFieldTouched,
    setFormInProgress,
    setPersonCenteredDiscoveryFormData,
  ])

  return (
    <>
      <Box
        style={{
          height: 'calc(100vh - var(--memberProfileHeight))',
          overflowY: 'auto',
        }}
      >
        <Flex p="lg" direction="column" gap={12}>
          <Flex justify="space-between" align="center">
            <Title order={4} fw={600}>
              Person Centered Discovery
            </Title>
            <BhButton
              variant={'filled'}
              disabled={!personCenteredForm.isValid()}
              onClick={() => {
                handleDoneClick('personCenteredDiscovery')
              }}
            >
              Done
            </BhButton>
          </Flex>
          <Text c="dimmed" fz="sm">
            Note: Select checkbox once a question is asked
          </Text>
          <Card
            className="conversation-starters-list-wrap overflow-y-auto"
            radius={10}
            p={24}
            shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)"
            style={{
              maxHeight: 'calc(100vh - var(--memberProfileHeight) - 68px)',
            }}
          >
            <Flex gap={24} direction="column">
              {personCenteredForm.values.questions.map((item, index) => {
                return (
                  <Box className="child-list-container" mt={12} key={item.key}>
                    <Checkbox
                      label={item.label}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </Box>
                )
              })}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  )
}
