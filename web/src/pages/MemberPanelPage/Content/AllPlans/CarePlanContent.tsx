import React, { useState, useEffect } from 'react'

import BhInterventionTable from '@lowLevelComp/BhInterventionTable/BhInterventionTable'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Card, Text } from '@mantine/core'
import { IconCalendarClock } from '@tabler/icons-react'

interface CarePlanEntry {
  task: string
  assigned: string
  department: string
  date: string
  status: 'Completed' | 'Pending'
}
interface CarePlanItem {
  id: string
  name: string
  description: string
  description2: string
  dueDate: string
  state: string
  stageInfo: {} | null
  entries: CarePlanEntry[]
}
export interface CarePlanContentProps {
  CarePlanData: CarePlanItem[]
}

const CarePlanContent: React.FC<CarePlanContentProps> = ({ CarePlanData }) => {
  const [loading, setLoading] = useState(true)
  const taskHeaderData = [
    { name: 'Intervention/ Owner' },
    { name: 'Due Date' },
    { name: 'Status' },
  ]

  const transformRowData = (taskData) => {
    return taskData.map((data) => ({
      description: {
        value: data.task,
        owner: data.assigned,
        department: data.department,
      },
      dueDate: data.date,
      status: data.status,
    }))
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }, [])

  return (
    <>
      {CarePlanData.filter((careplan) => careplan.state === 'active').map(
        (care) => (
          <React.Fragment key={care.id}>
            <Flex justify="space-between" pt={20} pb={12}>
              <div>
                <Text fw={600} size="xs" c="green">
                  {care.name}
                </Text>
                <Text fw={600} size="lg">
                  Goal A: {care.description}
                </Text>
              </div>
              <Text size="sm" style={{ alignContent: 'end' }}>
                <IconCalendarClock size={16} /> {care.dueDate}
              </Text>
            </Flex>
            <Card
              shadow="0px 4px 10px 0px rgba(0, 0, 0, 0.05)"
              radius={10}
              p="lg"
              className="h-full overflow-y-auto"
              style={{
                height: 'calc(100vh - var(--memberProfileHeight) - 88px)', // 88px is height of plan tabs + padding
              }}
            >
              <Flex direction="column" gap={20} className="h-full">
                {loading ? (
                  <SkeletonLoader height={30} width={'100%'} mb={8} />
                ) : (
                  <Text
                    style={{ fontStyle: 'italic' }}
                    color="#C92A2A"
                    size="sm"
                  >
                    {care.description2}
                  </Text>
                )}
                <BhInterventionTable
                  rowData={transformRowData(care.entries)}
                  headerData={taskHeaderData}
                  highlightTRows={true}
                />
              </Flex>
            </Card>
          </React.Fragment>
        )
      )}
    </>
  )
}

export default CarePlanContent
