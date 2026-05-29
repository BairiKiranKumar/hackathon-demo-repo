import { PropsWithChildren } from 'react'

import { Text } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

import './index.css'

type StageProps = PropsWithChildren<{
  stage: 'inProgress' | 'started' | 'completed' | 'notStarted'
}>

const stageContent = {
  inProgress: () => (
    <Text size="xs" fs="italic" fw={700} c={'green'}>
      In Progress
    </Text>
  ),
  notStarted: (children: React.ReactNode) => (
    <Text size="xs" fs="italic" c="var(--text-grey)">
      {children}
    </Text>
  ),
  started: () => (
    <Text size="xs" c={'green'} fw={700} fs="italic">
      Started
    </Text>
  ),
  completed: () => (
    <>
      <IconCircleCheck color="#93C59E" />
      <Text size="sm" c="dimmed">
        Done
      </Text>
    </>
  ),
}

const PathwayStages = ({
  children = '10 min',
  stage = 'started',
}: StageProps) => {
  const content = stageContent[stage]

  return (
    <div className={`pathway-stage pathway-stage-${stage}`}>
      {content ? content(children) : null}
    </div>
  )
}

export default PathwayStages
