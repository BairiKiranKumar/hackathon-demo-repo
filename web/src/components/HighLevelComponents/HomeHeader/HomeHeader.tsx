import { useEffect, useRef, useState } from 'react'

import BhCalendar from '@lowLevelComp/BhCalendar/BhCalendar'
import { Flex, Title, Divider, Text, Pill } from '@mantine/core'

import './index.css'
import BhDropdown from 'src/components/LowLevelComponents/BhDropdown/BhDropdown'
import { useHomeStore } from 'src/store/HomeStore'

interface HomeHeaderProps {
  page?: string
}

const HomeHeader = ({ page }: HomeHeaderProps) => {
  const [time, setTime] = useState('')
  const timeRef = useRef(time)
  const userName = useHomeStore((state) => state.userName)
  const tasksCount = useHomeStore((state) => state.tasksCount)
  const date = useHomeStore((state) => state.date)

  const onChangeDate = (value: Date | null) => {
    if (value) {
      useHomeStore.getState().onDateChange(value)
    }
  }

  const getCurrentTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return now.toLocaleTimeString([], options)
  }

  useEffect(() => {
    setTime(getCurrentTime())
    timeRef.current = getCurrentTime()

    const intervalId = setInterval(() => {
      const currentTime = getCurrentTime()

      if (currentTime !== timeRef.current) {
        setTime(currentTime)
        timeRef.current = currentTime
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const isMembersPanel = page === 'MembersPanel'

  const pageOptions = [
    { id: 1, value: 'Calendar', label: 'Calendar' },
    { id: 2, value: 'Call Logs', label: 'Call Logs' },
  ]

  const [selectedPage, setSelectedPage] = useState('Calendar')

  const setPageOption = (value: string) => {
    setSelectedPage(value)
    console.log('Selected:', value)
  }

  return (
    <Flex
      className="home-header-wrap"
      justify="space-between"
      align="center"
      px={24}
      py={16}
      h={60}
      style={{
        background: '#F9FAFC',
        boxShadow:
          '0 1px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <Flex className="greetings-header" gap={20} align="center">
        <Title size={20} c="var(--text-color)" lh="24px">
          {isMembersPanel ? 'Members Panel' : `Hello, ${userName}`}
        </Title>

        {!isMembersPanel && (
          <>
            <Divider orientation="vertical" className="v-divider" />
            <button className="bh-btn-transparent d-flex align-center">
              <BhCalendar
                date={date}
                onChangeDate={onChangeDate}
                valueFormat="MM/DD/YYYY"
                className="hompage-calendar"
                clearable={false}
                showDay={true}
              />
            </button>
            <Divider orientation="vertical" className="v-divider" />
            <BhDropdown listItems={pageOptions} onOptionChange={setPageOption}>
              {selectedPage}
            </BhDropdown>
          </>
        )}
      </Flex>
      <Flex gap={6} align="center">
        <Text fw={600}>Todays Pending Tasks</Text>
        <Pill bg="#E0F0FF" size="md" miw={26} h={24}>
          <Text
            fw={600}
            component="span"
            size="16"
            style={{ display: 'flex', alignItems: 'center' }}
            className="h-full"
          >
            {tasksCount}
          </Text>
        </Pill>
      </Flex>
    </Flex>
  )
}

export default HomeHeader
