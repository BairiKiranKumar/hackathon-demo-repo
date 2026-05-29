import React from 'react'

import {
  Popover,
  Text,
  Textarea,
  Flex,
  Button,
  Chip,
  Group,
  FloatingPosition,
} from '@mantine/core'

const FeedbackPopover = ({
  children,
  withArrow = true,
  width = 290,
  offset = 2,
  position = 'bottom' as FloatingPosition,
  closeOnClickOutside = false,
  disabled = false,
  popoverTitle,
  opened,
  reasons,
  selectedReason,
  onReasonChange,
  otherReason,
  onOtherReasonChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Popover
      disabled={disabled}
      opened={opened}
      withArrow={withArrow}
      width={width}
      closeOnClickOutside={closeOnClickOutside}
      position={position}
      offset={offset}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown className="feedback-reasons">
        <Text size="sm" fw={600} mb={4}>
          {popoverTitle}
        </Text>
        <Chip.Group>
          <Group gap={8}>
            {reasons &&
              reasons.map((reason) => (
                <Chip
                  key={reason}
                  radius={4}
                  checked={selectedReason === reason}
                  onClick={() => onReasonChange(reason)}
                  className="feedback-chips"
                >
                  {reason}
                </Chip>
              ))}
          </Group>
        </Chip.Group>
        {selectedReason === 'Others' && (
          <Textarea
            mt={8}
            placeholder="Type reason here..."
            value={otherReason}
            onChange={(e) => onOtherReasonChange(e.target.value)}
          />
        )}
        <Flex justify={'flex-end'} mt={12} gap={10}>
          <Button variant="outline" size="xs" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            size="xs"
            className="feedback-popover-submit"
            disabled={
              !selectedReason || (selectedReason === 'Others' && !otherReason)
            }
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  )
}

export default FeedbackPopover
