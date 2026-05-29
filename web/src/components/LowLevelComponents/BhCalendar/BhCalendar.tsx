import React, { useRef, useState } from 'react'

import { Flex, Text } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'

import './index.css'
export interface BhCalendarProps {
  date: Date | null
  onChangeDate: (value: Date | null) => void
  label?: string
  placeholder?: string
  valueFormat?: string
  clearable?: boolean
  showDay?: boolean
  minDate?: Date
  maxDate?: Date
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  opened?: boolean
}

const BhCalendar: React.FC<BhCalendarProps> = ({
  date = new Date(),
  onChangeDate,
  label = '',
  placeholder = 'Pick a date',
  valueFormat = 'DD/MM/YYYY',
  clearable = false,
  showDay = false,
  minDate,
  maxDate,
  size = 'md',
  radius = 'md',
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dateInputRef = useRef<HTMLInputElement>(null)
  const [opened, setOpened] = useState(false)

  const getDateText = (date: Date | null): string => {
    if (!date) return ''
    const today = new Date()
    const yesterday = new Date(today)
    const tomorrow = new Date(today)

    yesterday.setDate(today.getDate() - 1)
    tomorrow.setDate(today.getDate() + 1)

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()

    if (isSameDay(date, yesterday)) return `${formatDate(date)}, Yesterday`
    if (isSameDay(date, today)) return `${formatDate(date)}, Today`
    if (isSameDay(date, tomorrow)) return `${formatDate(date)}, Tomorrow`

    // Return formatted as "DD/MM/YYYY, Day"
    return `${formatDate(date)}, ${new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date)}`
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date)
  }

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click()
    }
  }

  const handleDateInputChange = (value: Date | null) => {
    onChangeDate(value)
    setOpened((prev) => !prev)
  }

  return (
    <Flex
      gap={8}
      className={`calendar-main-comp ${className}`}
      style={{ placeItems: 'center' }}
    >
      <div className={`calendar-wrapper ${className}`}>
        <DateInput
          value={date}
          onChange={handleDateInputChange}
          label={label}
          placeholder={placeholder}
          valueFormat={valueFormat}
          clearable={clearable}
          minDate={minDate}
          maxDate={maxDate}
          size={size}
          radius={radius}
          className={`bh-calendar ${className}`}
          style={{ display: showDay ? 'none' : 'block' }}
          ref={dateInputRef}
          onClick={() => setOpened(!opened)}
        />
        {showDay && (
          <Text
            c="var(--mantine-color-black)"
            component="span"
            ref={buttonRef}
            fw={600}
            size="lg"
            className={`calendar-text ${className}`}
            style={{
              alignSelf: label ? 'end' : '',
            }}
            onClick={handleIconClick}
          >
            {getDateText(date)}
            {opened ? (
              <IconChevronUp size={16} />
            ) : (
              <IconChevronDown size={16} />
            )}
          </Text>
        )}
      </div>
    </Flex>
  )
}

export default BhCalendar
