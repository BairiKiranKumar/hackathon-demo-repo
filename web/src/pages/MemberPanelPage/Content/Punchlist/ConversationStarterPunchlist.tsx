import { useCallback, useEffect } from 'react'

import BhButton from '@lowLevelComp/BhButton/BhButton'
import {
  Box,
  Flex,
  Title,
  Card,
  Checkbox,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

import DashedContainer from 'src/components/LowLevelComponents/DashedContainer/DashedContainer'
import usePunchlistStore from 'src/store/punchlistStore'

const ConversationStarterPunchlist = ({
  conversationStarterQuestions,
  conversationStarterScript,
  conversationStarterTodoText,
  conversationStarterAdditionalPrompt,
}) => {
  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)
  const conversationStarterFormValues = usePunchlistStore(
    (state) => state.conversationStarterFormValues
  )
  const setConversationStarterFormData = usePunchlistStore(
    (state) => state.setConversationStarterFormData
  )

  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )

  const conversationStarterForm = useForm({
    initialValues: {
      questions:
        conversationStarterFormValues.questions.length > 0
          ? conversationStarterFormValues.questions
          : conversationStarterQuestions.map((q) => ({
              label: q.label,
              checked: q.checked || false,
            })),
      additionalInput: conversationStarterFormValues.additionalInput || '',
    },
    validate: {
      questions: (value) => {
        const allChecked = value.every(
          (q: { checked: boolean }) => q.checked === true
        )
        return allChecked ? null : 'Please select all conversation starters'
      },
      additionalInput: (value) => {
        return value.trim() ? null : 'This field is required'
      },
    },
  })
  const isAnyFieldTouched = conversationStarterForm.isTouched()

  const handleCheckboxChange = useCallback((index: number) => {
    conversationStarterForm.setFieldValue(
      `questions.${index}.checked`,
      (currentValue: boolean) => !currentValue
    )
  }, [])

  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('conversationStarter')
      setConversationStarterFormData(conversationStarterForm.values)
    }
  }, [
    isAnyFieldTouched,
    setFormInProgress,
    setConversationStarterFormData,
    conversationStarterForm.values,
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
              Conversation Starter
            </Title>
            <BhButton
              variant={'filled'}
              disabled={!conversationStarterForm.isValid()}
              onClick={() => {
                handleDoneClick('conversationStarter')
              }}
            >
              Done
            </BhButton>
          </Flex>
          <DashedContainer
            label={'Script'}
            content={conversationStarterScript}
          />
          <Text c="dimmed" fz="sm">
            Note: Select checkbox once a question is asked
          </Text>
          <Card
            className="conversation-starters-list-wrap"
            radius={10}
            p={24}
            shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)"
          >
            <Flex gap={24} direction="column">
              {conversationStarterForm.values.questions.map((item, index) => {
                return (
                  <Checkbox
                    key={item.label}
                    label={item.label}
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                )
              })}
            </Flex>
          </Card>
          <DashedContainer
            label={'To-do'}
            content={conversationStarterTodoText}
          />
          <Card
            className="conversation-starters-list-wrap"
            radius={10}
            p={24}
            shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)"
          >
            <Text fz="sm" fw={600} mb={8}>
              {conversationStarterAdditionalPrompt}
            </Text>
            <TextInput
              size="xs"
              placeholder="Write here"
              rightSectionPointerEvents="none"
              {...conversationStarterForm.getInputProps('additionalInput')}
            />
          </Card>
        </Flex>
      </Box>
    </>
  )
}

export default ConversationStarterPunchlist
