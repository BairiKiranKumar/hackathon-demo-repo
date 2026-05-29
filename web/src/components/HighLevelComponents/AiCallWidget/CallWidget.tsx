import BhButton from '@lowLevelComp/BhButton/BhButton'
import {
  Avatar,
  Text,
  Group,
  Stack,
  Paper,
  ActionIcon,
  Box,
} from '@mantine/core'
import {
  IconArrowUpRight,
  IconPhone,
  IconPhoneOff,
  IconUser,
  IconX,
} from '@tabler/icons-react'

interface CallWidgetProps {
  opened: boolean
  onClose: () => void
  callerName: string
  callerAge?: number
  callerGender?: string
  callerImage?: string
  onAccept: () => void
  onReject: () => void
  isRegistered?: boolean
}

const CallWidget = ({
  opened,
  onClose,
  callerName,
  callerAge,
  callerGender,
  callerImage,
  onAccept,
  onReject,
  isRegistered = true,
}: CallWidgetProps) => {
  if (!opened) return null

  // Conditional display logic based on registration status
  const displayName = isRegistered ? callerName : '+91 98765 43210'
  const displayImage = isRegistered ? callerImage : undefined
  const showAgeGender = isRegistered && callerAge && callerGender
  const showOpenProfile = isRegistered

  return (
    <Box
      pos="fixed"
      top={20}
      right={20}
      style={{
        zIndex: 9999,
      }}
    >
      <Paper
        shadow="xl"
        radius="md"
        p={16}
        bg="#101C1C"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          minWidth: 320,
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <ActionIcon
          variant="subtle"
          color="gray"
          size="sm"
          onClick={onClose}
          pos="absolute"
          top={12}
          right={12}
          style={{
            color: 'white',
          }}
        >
          <IconX size={18} />
        </ActionIcon>

        <Stack align="center" gap={16} w="100%">
          {/* Avatar - Shows image for registered, icon for unregistered */}
          {isRegistered && (
            <Avatar src={displayImage} size={80} radius="40" alt={displayName}>
              <IconUser size={36} color="white" />
            </Avatar>
          )}

          {/* Caller Info */}
          <Stack gap={4} align="center">
            <Group gap={8} wrap="nowrap">
              <Text size="lg" fw={600} c="white">
                {displayName}
              </Text>
              {/* Age and Gender - Only show for registered users */}
              {showAgeGender && (
                <Text size="md" c="white" opacity={0.7}>
                  ({callerAge}Y, {callerGender})
                </Text>
              )}
            </Group>
            <Text size="sm" c="white" opacity={0.7}>
              is calling you
            </Text>
          </Stack>

          {/* Action Buttons */}
          <Group gap={16} mt={8}>
            <BhButton bg="red" onClick={onReject} size="md" variant="filled">
              <Group gap={6}>
                <IconPhoneOff size={18} color="white" />
                <Text size="sm" c="white">
                  Reject
                </Text>
              </Group>
            </BhButton>

            <BhButton
              bg="#00B57B"
              onClick={onAccept}
              size="md"
              variant="filled"
            >
              <Group gap={6}>
                <IconPhone size={18} color="white" />
                <Text size="sm" c="white">
                  Accept
                </Text>
              </Group>
            </BhButton>
          </Group>

          {/* Open Profile Link - Only show for registered users */}
          {showOpenProfile && (
            <BhButton
              variant="transparent"
              onClick={() => {
                console.log('Open profile')
              }}
            >
              <Group gap={4}>
                <Text
                  size="sm"
                  c="#F9FAFC"
                  fw={500}
                  lh="20px"
                  td="underline"
                  ff="Nunito, sans-serif"
                >
                  Open Profile
                </Text>
                <IconArrowUpRight size={18} color="white" />
              </Group>
            </BhButton>
          )}
        </Stack>
      </Paper>
    </Box>
  )
}

export default CallWidget
