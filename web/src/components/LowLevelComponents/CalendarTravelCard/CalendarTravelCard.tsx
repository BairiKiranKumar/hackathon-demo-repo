import { useState } from 'react'

import BhDropdown from '@lowLevelComp/BhDropdown/BhDropdown'
import IconLabel from '@lowLevelComp/IconLabel/IconLabel'
import { Flex, Text, Box } from '@mantine/core'
import {
  IconAlertTriangle,
  IconCar,
  IconClockHour9,
  IconDotsVertical,
  IconLocation,
  IconSoup,
} from '@tabler/icons-react'
import moment from 'moment'

import { EventBreakProps } from 'src/interfaces/commonInterfaces'

import './index.css'

const travelOptions = [
  { id: 1, value: 'Walk', label: 'Walk' },
  { id: 2, value: 'Drive', label: 'Drive' },
  { id: 3, value: 'Public Transport', label: 'Public Transport' },
]

const CalendarTravelCard = ({
  startTime,
  endTime,
  description,
  breakType,
  title,
  haveLocation,
  children,
  onTravelChange,
}: EventBreakProps) => {
  const [travelOption, setTravelOption] = useState('Drive')

  const start = moment(startTime, 'HH:mm').format('h:mm A')
  const end = moment(endTime, 'HH:mm').format('h:mm A')
  const duration = moment(endTime, 'HH:mm').diff(
    moment(startTime, 'HH:mm'),
    'minutes'
  )

  const handleTravelChange = (value: string) => {
    setTravelOption(value)
    if (value === 'Public Transport' && onTravelChange) {
      onTravelChange(value)
    }
  }

  return (
    <>
      <Flex gap={24} pl={30} pr={48} className={`in-event-${breakType} h-full`}>
        <Flex className="icon-connector" align="center">
          {breakType === 'LUNCH' ? (
            <span className="icon-wrapper">
              <IconSoup size={20} color="var(--text-light-grey)" />
            </span>
          ) : (
            <span className="icon-wrapper">
              <IconCar size={20} color="var(--text-light-grey)" />
            </span>
          )}
        </Flex>

        <Flex
          className="inter-event-info"
          flex={1}
          gap={breakType == 'TRAVEL' ? 4 : 8}
          direction="column"
          style={{ alignSelf: 'center' }}
        >
          <Flex align="center" gap={8}>
            <Flex
              justify="space-between"
              align="center"
              w={breakType == 'LUNCH' ? '100%' : ''}
            >
              <Text
                fw={breakType == 'TRAVEL' ? 600 : 500}
                lh={breakType == 'LUNCH' ? '26px' : '20px'}
                size={breakType == 'LUNCH' ? 'lg' : 'sm'}
              >
                {breakType == 'LUNCH' ? 'Lunch Break' : title}
              </Text>
              {duration && breakType !== 'TRAVEL' && (
                <Flex className="event-duration-action" align="start" gap={10}>
                  <Text size="sm">{duration} min</Text>
                  <button className="bh-btn-transparent d-flex">
                    <IconDotsVertical
                      color="var(--text-light-grey)"
                      size={20}
                    />
                  </button>
                </Flex>
              )}
            </Flex>

            {breakType == 'TRAVEL' && !haveLocation && (
              <BhDropdown
                listItems={travelOptions}
                onOptionChange={handleTravelChange}
                getItemColor={undefined}
              >
                {travelOption}
              </BhDropdown>
            )}

            {haveLocation && breakType == 'TRAVEL' && (
              <Box
                c="var(--primary-color)"
                className="get-location-action cursor-pointer"
              >
                <IconLabel
                  lineHeight="20px"
                  fontWeight={500}
                  label="Get location on phone"
                  icon={<IconLocation size={16} />}
                />
              </Box>
            )}
          </Flex>

          {description && breakType == 'TRAVEL' && (
            <IconLabel
              lineHeight="16px"
              label={description}
              color="var(--text-color)"
              fontSize="xs"
              icon={
                <IconAlertTriangle size={16} color="var(--text-light-grey)" />
              }
            />
          )}

          {breakType == 'LUNCH' && (
            <IconLabel
              color="var(--text-color)"
              label={`${start} - ${end}`}
              icon={<IconClockHour9 size={16} color="var(--text-light-grey)" />}
            />
          )}
        </Flex>
        {children}
      </Flex>
    </>
  )
}

export default CalendarTravelCard
