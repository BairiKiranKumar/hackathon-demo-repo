import React, { useState } from 'react'

import { Text } from '@mantine/core'
import moment from 'moment'

const DateTime = ({
  allowToggle = true,
  dateRange = new Date(),
  format = 'MM/DD/YY',
  relativeTime = false,
  cursor = true,
  styleClass = '',
}) => {
  const [showFullDate, setShowFullDate] = useState(false)

  // Ensure dateRange is a valid Date object
  const date = typeof dateRange === 'string' ? new Date(dateRange) : dateRange

  const getRelativeDate = (date: moment.MomentInput) => {
    return moment(date).fromNow()
  }

  const getFormattedDate = (date: moment.MomentInput) => {
    return moment(date).format(format)
  }

  const handleClick = () => {
    setShowFullDate((prev) => !prev)
  }

  return (
    <Text
      className={styleClass}
      onClick={allowToggle ? handleClick : undefined}
      style={{ cursor: cursor ? 'pointer' : 'default' }}
    >
      {showFullDate || relativeTime
        ? getRelativeDate(date)
        : getFormattedDate(date)}
    </Text>
  )
}

export default DateTime
