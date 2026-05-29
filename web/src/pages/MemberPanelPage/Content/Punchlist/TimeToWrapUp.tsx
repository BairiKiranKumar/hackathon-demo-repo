import { useCallback, useEffect, useState } from 'react'

import BhButton from '@lowLevelComp/BhButton/BhButton'
import {
  Box,
  Flex,
  Title,
  Card,
  TextInput,
  Text,
  Checkbox,
  Grid,
  ActionIcon,
  Stack,
  Radio,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconGripHorizontal } from '@tabler/icons-react'

import AiPill from 'src/components/LowLevelComponents/AiPill/AiPill'
import DashedContainer from 'src/components/LowLevelComponents/DashedContainer/DashedContainer'
import usePunchlistStore from 'src/store/punchlistStore'

interface WrapUpQuestion {
  id: number
  question: string
  placeholder: string
  type: string
}

interface FollowUpPreference {
  id: number
  label: string
  options: string[]
}

interface AiSuggestionOption {
  id: number
  label: string
  checked: boolean
}

interface TimeToWrapProps {
  wrapUpQuestions: WrapUpQuestion[]
  followUpPreferences: FollowUpPreference[]
  wrapUpScript1: string
  wrapUpScript2: string
  aiSuggestionOptions: AiSuggestionOption[]
}

const TimeToWrap = ({
  wrapUpQuestions,
  followUpPreferences,
  wrapUpScript1,
  wrapUpScript2,
  aiSuggestionOptions,
}: TimeToWrapProps) => {
  const [showAiSuggestions, setShowAiSuggestions] = useState(false)

  const wrapUpFormValues = usePunchlistStore((state) => state.wrapUpFormValues)
  const setWrapUpFormData = usePunchlistStore(
    (state) => state.setWrapUpFormData
  )
  const setFormInProgress = usePunchlistStore(
    (state) => state.setFormInProgress
  )

  const [aiOptions, setAiOptions] = useState(aiSuggestionOptions)
  const [selectedAiOptionsList, setSelectedAiOptionsList] = useState<string[]>(
    []
  )
  const [customInput, setCustomInput] = useState('')

  const wrapUpForm = useForm({
    initialValues: {
      ...wrapUpFormValues,
      hasFinalThoughts: wrapUpFormValues.hasFinalThoughts || '',
      finalThoughts: wrapUpFormValues.finalThoughts || '',
      missedInfo: wrapUpFormValues.missedInfo || '',
      ...wrapUpQuestions.reduce(
        (acc, q) => ({
          ...acc,
          [`question_${q.id}`]: wrapUpFormValues[`question_${q.id}`] || '',
        }),
        {}
      ),
      ...followUpPreferences.reduce(
        (acc, pref) => ({
          ...acc,
          [`preference_${pref.id}`]:
            wrapUpFormValues[`preference_${pref.id}`] || [],
        }),
        {}
      ),
    },
    validate: {
      hasFinalThoughts: (value) => (!value ? 'Please select Yes or No' : null),
      finalThoughts: (value, values) =>
        values.hasFinalThoughts === 'yes' && !value
          ? 'Please share your thoughts'
          : null,
      ...wrapUpQuestions.reduce(
        (acc, question) => {
          acc[`question_${question.id}`] = (
            value: string | string[] | undefined
          ) =>
            !value || value === '' ? `${question.question} is required` : null
          return acc
        },
        {} as Record<
          string,
          (value: string | string[] | undefined) => string | null
        >
      ),
      ...followUpPreferences.reduce(
        (acc, pref) => {
          acc[`preference_${pref.id}`] = (value: string[] | undefined) =>
            !value || value.length === 0
              ? `Please select at least one option for ${pref.label}`
              : null
          return acc
        },
        {} as Record<string, (value: string[] | undefined) => string | null>
      ),
    },
  })

  const isAnyFieldTouched = wrapUpForm.isTouched()

  const handleDoneClick = usePunchlistStore((state) => state.handleDoneClick)

  const handleCheckboxChange = useCallback(
    (sectionId: number, option: string) => {
      const fieldName = `preference_${sectionId}`
      const current = (wrapUpForm.values[fieldName] as string[]) || []
      const updated = current.includes(option)
        ? current.filter((item: string) => item !== option)
        : [...current, option]
      wrapUpForm.setFieldValue(fieldName, updated)
    },
    [wrapUpForm]
  )

  const handleChange = (label: string) => {
    setAiOptions((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, checked: !item.checked } : item
      )
    )

    // Add from selectedAiOptionsList
    setSelectedAiOptionsList((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label)
      } else {
        return [...prev, label]
      }
    })
  }

  const handleAddCustomOption = () => {
    if (customInput.trim()) {
      setSelectedAiOptionsList((prev) => {
        if (!prev.includes(customInput.trim())) {
          return [...prev, customInput.trim()]
        }
        return prev
      })
      setCustomInput('')
    }
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))

    if (dragIndex === dropIndex) return

    const newList = [...selectedAiOptionsList]
    const [draggedItem] = newList.splice(dragIndex, 1)
    newList.splice(dropIndex, 0, draggedItem)

    setSelectedAiOptionsList(newList)
  }

  useEffect(() => {
    if (isAnyFieldTouched) {
      setFormInProgress('timeToWrapUp')
      setWrapUpFormData(wrapUpForm.values)
    }
  }, [
    isAnyFieldTouched,
    setFormInProgress,
    setWrapUpFormData,
    wrapUpForm.values,
  ])

  return (
    <Box
      style={{
        height: 'calc(100vh - var(--memberProfileHeight))',
        overflowY: 'auto',
      }}
    >
      <Flex p="lg" direction="column" gap={12}>
        <Flex justify="space-between" align="center">
          <Title order={4} fw={600}>
            Wrap Up
          </Title>
          <BhButton
            variant={'filled'}
            onClick={() => handleDoneClick('timeToWrapUp')}
            // disabled={!wrapUpForm.isValid()}
          >
            Done
          </BhButton>
        </Flex>

        <Card radius={10} p={24} shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)">
          <Flex gap={24} direction="column">
            {wrapUpQuestions.map((item) => (
              <Box key={item.id}>
                {item.type === 'yesNoWithText' ? (
                  <>
                    <Text fz="sm" fw={500} mb={8}>
                      {item.question}
                    </Text>
                    <Radio.Group
                      value={
                        wrapUpForm.values[`question_${item.id}_yesNo`] as string
                      }
                      onChange={(value) =>
                        wrapUpForm.setFieldValue(
                          `question_${item.id}_yesNo`,
                          value
                        )
                      }
                      required
                    >
                      <Flex gap={16}>
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                      </Flex>
                    </Radio.Group>
                    {wrapUpForm.values[`question_${item.id}_yesNo`] ===
                      'yes' && (
                      <TextInput
                        mt={12}
                        placeholder={item.placeholder}
                        {...wrapUpForm.getInputProps(`question_${item.id}`)}
                      />
                    )}
                  </>
                ) : (
                  <TextInput
                    label={item.question}
                    placeholder={item.placeholder}
                    required
                    {...wrapUpForm.getInputProps(`question_${item.id}`)}
                  />
                )}
              </Box>
            ))}
          </Flex>
        </Card>

        <Card radius={10} p={24} shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)">
          <Flex justify="space-between" align="start" direction="column">
            {showAiSuggestions ? (
              <>
                <Text fw={600} mb={8} fz="sm">
                  Here are the things we`ve identified you`d like help with:
                </Text>
                <DashedContainer
                  content={
                    'Review with member, and check those boxes that the individual is interested in or willing to address at this time.'
                  }
                  label={''}
                />

                <Grid gutter={12} mt={16}>
                  {Array.from(
                    { length: Math.ceil(aiOptions.length / 4) },
                    (_, colIndex) => (
                      <Grid.Col span={6} key={colIndex} pt={0}>
                        <Flex direction="column" gap={8}>
                          {aiOptions
                            .slice(colIndex * 4, colIndex * 4 + 4)
                            .map((option) => (
                              <Checkbox
                                key={option.id}
                                label={option.label}
                                checked={option.checked}
                                onChange={() => handleChange(option.label)}
                              />
                            ))}
                        </Flex>
                      </Grid.Col>
                    )
                  )}
                </Grid>
                <TextInput
                  w="100%"
                  size="xs"
                  mt={8}
                  placeholder="Write here to add"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCustomOption()
                    }
                  }}
                  rightSection={
                    <ActionIcon
                      size="xs"
                      variant="filled"
                      aria-label="add"
                      onClick={handleAddCustomOption}
                      disabled={!customInput.trim()}
                    >
                      <IconCheck />
                    </ActionIcon>
                  }
                ></TextInput>

                {selectedAiOptionsList.length > 0 && (
                  <Stack mt={16} w="100%" gap={4}>
                    <Text fz="sm" fw={600} mb={8}>
                      Drag and drop identified priorities to match member’s
                      preference/urgency in addressing each issue.
                    </Text>
                    <Stack gap={8}>
                      {selectedAiOptionsList.map((option, index) => (
                        <Flex
                          key={index}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          px={12}
                          py={6}
                          gap={8}
                          align="center"
                          style={{
                            cursor: 'grab',
                            border: '1px solid var(--mantine-color-gray-3)',
                            borderRadius: '4px',
                          }}
                        >
                          <IconGripHorizontal size={16} color="#999" />
                          <Text fz="xs">{option}</Text>
                        </Flex>
                      ))}
                    </Stack>
                  </Stack>
                )}
              </>
            ) : (
              <>
                <Text fw={600} mb={8}>
                  Things identified during conversation
                </Text>
                <AiPill
                  cursor
                  size="md"
                  handleClick={() => setShowAiSuggestions(true)}
                >
                  Generate
                </AiPill>
              </>
            )}
          </Flex>
        </Card>

        <DashedContainer label="Script" content={wrapUpScript1} />

        <Card radius={10} p={24} shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)">
          <Flex gap={24} direction="column">
            {followUpPreferences.map((section, index) => (
              <Box key={section.id}>
                <Text fz="sm" fw={400} mb={8}>
                  {index + 1}. {section.label}
                </Text>
                <Grid gutter={12}>
                  {Array.from(
                    { length: Math.ceil(section.options.length / 4) },
                    (_, colIndex) => (
                      <Grid.Col span={3} key={colIndex} pt={0}>
                        <Flex direction="column" gap={8}>
                          {section.options
                            .slice(colIndex * 4, colIndex * 4 + 4)
                            .map((option) => (
                              <Checkbox
                                key={option}
                                label={option}
                                checked={
                                  wrapUpForm.values[
                                    `preference_${section.id}`
                                  ]?.includes(option) || false
                                }
                                onChange={() =>
                                  handleCheckboxChange(section.id, option)
                                }
                              />
                            ))}
                        </Flex>
                      </Grid.Col>
                    )
                  )}
                </Grid>
              </Box>
            ))}
          </Flex>
        </Card>

        <DashedContainer label="Script" content={wrapUpScript2} />

        <Card radius={10} p={24} shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)">
          <Text fz="sm" fw={600}>
            Did we miss anything big or top of mind?
          </Text>
          <TextInput
            mt={8}
            mb={8}
            size="sm"
            required
            {...wrapUpForm.getInputProps('missedInfo')}
            placeholder="Write here"
          />

          <Text fz="sm" fw={600} mb={8}>
            Before we finish, is there anything else on your mind that we havent
            talked about yet?
          </Text>
          <Radio.Group
            value={wrapUpForm.values.hasFinalThoughts as string}
            onChange={(value) =>
              wrapUpForm.setFieldValue('hasFinalThoughts', value)
            }
            required
          >
            <Flex gap={16}>
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Flex>
          </Radio.Group>

          {wrapUpForm.values.hasFinalThoughts === 'yes' && (
            <TextInput
              mt={12}
              size="sm"
              required
              {...wrapUpForm.getInputProps('finalThoughts')}
              placeholder="Write here"
            />
          )}
        </Card>
      </Flex>
    </Box>
  )
}

export default TimeToWrap
