import { Divider, Flex, Progress, Text } from '@mantine/core'
import {
  IconBrandMessenger,
  IconInfoCircle,
  IconTrendingDown,
  IconTrendingUp,
  IconUserPlus,
} from '@tabler/icons-react'

import BhTooltip from 'src/components/LowLevelComponents/BhTooltip/BhTooltip'

const KpiBar = () => {
  const progressValue = 70
  const newMemberCount = 3
  const isUp = true
  const rescheduledEvent = true

  return (
    <Flex
      px={24}
      py={6}
      bg="#3A8569"
      style={{
        boxShadow:
          '0 7px 7px -5px rgba(0, 0, 0, 0.04), 0 10px 15px -5px rgba(0, 0, 0, 0.10), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      }}
      align={'center'}
      justify={'space-between'}
    >
      <Text size="sm" fw={600} c="white">
        Weekly Stats →
      </Text>
      <Flex gap={'sm'} align={'center'}>
        <Flex gap={'4'} align={'start'} c={'white'}>
          <IconBrandMessenger size={16} />
          <Text size="sm" fw={400} c="white">
            Engagements: 15
          </Text>
        </Flex>
        <Flex align={'start'} c={'white'}>
          <Flex
            gap={4}
            px={6}
            py={2}
            align="center"
            bg={isUp ? '#00B57B' : '#F66C1A'}
            style={{ borderRadius: 4 }}
          >
            {isUp ? (
              <IconTrendingUp size={16} color="#FFF" />
            ) : (
              <IconTrendingDown size={16} color="#FFF" />
            )}
            <Text size="sm" fw={400} c="#FFF">
              40% than last week
            </Text>
          </Flex>
          <BhTooltip
            label="Engagements taken place with Members"
            bg="#212529"
            c="#FFFFFF"
          >
            <IconInfoCircle
              color="white"
              style={{ cursor: 'pointer', marginLeft: 8 }}
            />
          </BhTooltip>
        </Flex>
      </Flex>
      <Divider orientation="vertical" className="v-divider" />
      <Flex align="center" gap="sm">
        <Text c="white">Task Progress:</Text>

        <Flex align="center" gap={8}>
          <Progress
            radius="md"
            value={progressValue}
            color="#1a3f32ff"
            w={150}
          />
          <Text size="sm" fw={500} c="white">
            {progressValue}%
          </Text>
        </Flex>
      </Flex>
      <Divider orientation="vertical" className="v-divider" />
      <Flex gap={'4'} align={'center'} c={'white'}>
        <IconUserPlus size={16} />
        <Text c={'white'}>New Member: {newMemberCount}</Text>
      </Flex>
      {rescheduledEvent && (
        <>
          <Divider orientation="vertical" className="v-divider" />
          <Text c={'white'}>No reschedules this week! 🎉</Text>
        </>
      )}
    </Flex>
  )
}

export default KpiBar
