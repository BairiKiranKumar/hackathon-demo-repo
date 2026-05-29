import { useState } from 'react'

import BhButton from '@lowLevelComp/BhButton/BhButton'
import BhInterventionTable from '@lowLevelComp/BhInterventionTable/BhInterventionTable'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import PriorityBadge from '@lowLevelComp/PriorityBadge/PriorityBadge'
import { Box, Flex, Title, Card, Checkbox } from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'

import { FrailtyPathwayList } from '../../types'

const FrailtyPathwayPunchlist = ({
  frailtyPathwayList,
  header,
  markAsDone,
}: {
  frailtyPathwayList: FrailtyPathwayList[]
  header: { label: string; priority: string }
  markAsDone: () => void
}) => {
  const [frailtyListState, setFrailtyListState] = useState(frailtyPathwayList)
  const [isAgreed, setIsAgreed] = useState(false)

  const isAnyCheckboxChecked = () => {
    return frailtyListState.some(
      (parent) =>
        parent.checked || parent.children?.rowData.some((row) => row.checked)
    )
  }

  const isDoneButtonEnabled = isAnyCheckboxChecked() && isAgreed

  const handleParentCheckboxChange = (index: number, checked: boolean) => {
    const updatedState = [...frailtyListState]
    updatedState[index].checked = checked
    updatedState[index].indeterminate = false

    // If the parent checkbox changes, update all children
    if (updatedState[index].children) {
      updatedState[index].children.rowData.forEach(
        (row) => (row.checked = checked)
      )
    }

    setFrailtyListState(updatedState)
  }

  const handleChildCheckboxChange = (
    parentIndex: number,
    rowIndex: number,
    checked: boolean
  ) => {
    const updatedState = [...frailtyListState]
    updatedState[parentIndex].children.rowData[rowIndex].checked = checked

    // Update parent checkbox state based on children
    const allChecked = updatedState[parentIndex].children.rowData.every(
      (row) => row.checked
    )
    const noneChecked = updatedState[parentIndex].children.rowData.every(
      (row) => !row.checked
    )

    updatedState[parentIndex].checked = allChecked
    updatedState[parentIndex].indeterminate = !allChecked && !noneChecked

    setFrailtyListState(updatedState)
  }
  return (
    <>
      <Box p="lg">
        <Flex justify="space-between" align="center">
          <Flex gap={4} align="center">
            <Title order={5} fw={600}>
              {header.label}
            </Title>
            <PriorityBadge priority={header.priority} size="xs">
              {header.priority}
            </PriorityBadge>
          </Flex>
          <Flex align="center" gap={16}>
            <Checkbox
              label="Agreed upon by member"
              checked={isAgreed}
              onChange={(event) => setIsAgreed(event.target.checked)}
            />
            <BhButton
              variant="filled"
              onClick={markAsDone}
              disabled={!isDoneButtonEnabled}
            >
              Done
            </BhButton>
          </Flex>
        </Flex>
        <Card
          className="conversation-starters-list-wrap overflow-y-auto"
          radius={10}
          mt={12}
          p={24}
          shadow="0px 4px 10px -5px rgba(0, 0, 0, 0.05)"
          style={{
            maxHeight: 'calc(100vh - var(--memberProfileHeight) - 68px',
          }}
        >
          <Flex gap={24} direction="column">
            {frailtyListState.map((item, parentIndex) => (
              <div key={item.key} className="parent-check-list">
                <Flex justify="space-between" align="flex-start" gap={8}>
                  <Checkbox
                    mb={12}
                    fw={600}
                    fs="16px"
                    label={item.label}
                    checked={item.checked}
                    indeterminate={item.indeterminate || false}
                    onChange={(event) =>
                      handleParentCheckboxChange(
                        parentIndex,
                        event.target.checked
                      )
                    }
                  />
                  <IconLabel
                    label={item.dueDate}
                    icon={<IconCalendarTime size={16} />}
                  ></IconLabel>
                </Flex>
                {item.children && (
                  <Box ml={28} className="frailty-table">
                    <BhInterventionTable
                      highlightThead={true}
                      rowData={item.children.rowData}
                      headerData={item.children.headerData}
                      withCheckbox={true}
                      onCheckboxChange={(rowIndex, checked) =>
                        handleChildCheckboxChange(
                          parentIndex,
                          rowIndex,
                          checked
                        )
                      }
                    />
                  </Box>
                )}
              </div>
            ))}
          </Flex>
        </Card>
      </Box>
    </>
  )
}

export default FrailtyPathwayPunchlist
