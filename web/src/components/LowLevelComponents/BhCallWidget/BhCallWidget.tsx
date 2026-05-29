import { useState } from 'react'

import BhDropdown from '@lowLevelComp/BhDropdown/BhDropdown'
import {
  Button,
  Card,
  Divider,
  Flex,
  Text,
  Box,
  Title,
  Modal,
  ActionIcon,
} from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import {
  IconBadgeCc,
  IconMicrophone,
  IconMicrophoneOff,
  IconPhone,
  IconPhoneOff,
  IconTextSize,
  IconVideo,
  IconVideoOff,
  IconX,
  IconAlertCircle,
} from '@tabler/icons-react'
import './index.css'
import '@mantine/tiptap/styles.css'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import usePunchlistStore from 'src/store/punchlistStore'

import { FontSize } from './FontSize'

const BhCallWidget = ({ hasJoinedCall, handleCallActions }) => {
  const { drawer } = usePunchlistStore()
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isNotesOn, setIsNotesOn] = useState(false)
  const [isCaptions, setIsCaptions] = useState(false)
  const [modal, setModal] = useState(false)
  const [note, setNote] = useState('')

  const toggleMicrophone = () => {
    setIsMicrophoneOn((prevState) => !prevState)
  }

  const toggleVideo = () => {
    setIsVideoOn((prevState) => !prevState)
  }

  const toggleNotes = () => {
    setIsNotesOn((prevState) => !prevState)
  }
  const toggleCaptions = () => {
    setIsCaptions((prevState) => !prevState)
  }
  const toggleCall = () => {
    handleCallActions(true)
  }
  const modelOpen = () => {
    setModal(true)
  }
  const modelClose = () => {
    if (hasJoinedCall === true) {
      setModal(false)
      handleCallActions(false)
    }
  }
  const modelExit = () => {
    setModal(false)
  }

  const fontList = [
    { id: 1, value: 12, label: 'Small' },
    { id: 2, value: 'normal', label: 'Normal' },
    { id: 3, value: 18, label: 'Large' },
    { id: 4, value: 24, label: 'Huge' },
  ]
  const editor = useEditor({
    extensions: [StarterKit, Underline, FontSize, TextStyle],
    onUpdate: ({ editor }) => {
      setNote(editor.getText())
    },
  })
  return (
    <div
      className="sticky-widget-wrap"
      style={{
        position: 'absolute',
        bottom: 4,
        right: drawer ? 800 : 14,
      }}
    >
      <Box pos="relative">
        <Card className="sticky-call-widget">
          <Button
            bg={isNotesOn ? 'var(--selected-green)' : ''}
            className="widget-icon-btn"
            size="sm"
            onClick={toggleNotes}
          >
            {note && <span className="notes-indicator"></span>}
            <span className="bh-icon-Notes"></span>
          </Button>
          <Divider orientation="vertical" mx={12} opacity={0.4} />
          {hasJoinedCall ? (
            <Flex gap={8}>
              <Button
                className="widget-icon-btn"
                size="sm"
                onClick={toggleMicrophone}
                bg={isMicrophoneOn ? '' : 'var(--high-impact-bg)'}
              >
                {isMicrophoneOn ? (
                  <IconMicrophone size={16} />
                ) : (
                  <IconMicrophoneOff
                    size={16}
                    color="var(--high-impact-color)"
                  />
                )}
              </Button>
              <Button
                className="widget-icon-btn"
                size="sm"
                onClick={toggleVideo}
                bg={isVideoOn ? '' : 'var(--high-impact-bg)'}
              >
                {isVideoOn ? (
                  <IconVideo size={16} />
                ) : (
                  <IconVideoOff size={16} color="var(--high-impact-color)" />
                )}
              </Button>
              <Button
                className="widget-icon-btn"
                size="sm"
                bg={isCaptions ? 'var(--selected-green)' : ''}
                onClick={toggleCaptions}
              >
                <IconBadgeCc size={16} />
              </Button>
              <Button
                bg="var(--high-impact-color)"
                size="sm"
                px={12}
                onClick={modelOpen}
              >
                <Flex gap={8} align="center">
                  <IconPhoneOff size={16} />
                  <Text component="span" c="#fff" size="xs">
                    22:03 min
                  </Text>
                </Flex>
              </Button>
            </Flex>
          ) : (
            <Flex gap={8} align="center">
              <Box>
                <Text size="xs" c="var(--primary-sea-green)">
                  Frailty Pathway Review
                </Text>
                <Text size="xs" c="#fff">
                  10:30 - 11:00 AM
                </Text>
              </Box>
              <Button
                bg="var(--selected-green)"
                size="sm"
                px={12}
                onClick={toggleCall}
              >
                <Flex gap={8} align="center">
                  <IconPhone size={16} />
                  <Text component="span" c="#fff" size="xs">
                    Join
                  </Text>
                </Flex>
              </Button>
            </Flex>
          )}
        </Card>
        {isNotesOn && (
          <Card
            pos="absolute"
            w={360}
            withBorder
            radius={10}
            pt={10}
            pb={6}
            px={16}
            shadow="0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)"
            className="notes-editor"
          >
            <Flex justify="space-between" mb={8}>
              <Title order={5} fw={600}>
                Add Note
              </Title>
              <IconX
                size={16}
                onClick={() => setIsNotesOn(false)}
                className="cursor-pointer"
              />
            </Flex>
            <RichTextEditor
              editor={editor}
              variant="subtle"
              style={{ border: 'none' }}
            >
              <RichTextEditor.Content />
              <RichTextEditor.Toolbar
                sticky
                style={{ borderBottom: 'none', gap: 4 }}
              >
                <RichTextEditor.ControlsGroup>
                  <Box pt={8} pr={4}>
                    <BhDropdown
                      listItems={fontList}
                      onOptionChange={(fontSize) => {
                        if (fontSize === 'normal') {
                          editor.chain().focus().unsetFontSize().run()
                        } else {
                          editor
                            .chain()
                            .focus()
                            .setFontSize(parseInt(fontSize, 10))
                            .run()
                        }
                      }}
                    >
                      <IconTextSize color="var(--text-grey)" size={16} />
                    </BhDropdown>
                  </Box>
                </RichTextEditor.ControlsGroup>
                <Divider orientation="vertical" />
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
            </RichTextEditor>
          </Card>
        )}
        {isCaptions && (
          <Card
            pos="absolute"
            w={300}
            withBorder
            radius={10}
            p={16}
            shadow="0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)"
            className="captions-popover"
          >
            <Flex justify="space-between" mb={8}>
              <Title order={5} fw={600}>
                Live Transcript
              </Title>
              <IconX
                size={16}
                onClick={() => setIsCaptions(false)}
                className="cursor-pointer"
              />
            </Flex>
            <Flex
              direction="column"
              gap={16}
              className="chat-transcript-wrapper"
              mih={140}
            >
              <Flex direction="column" gap={4} className="caption-item">
                <Text size="xs" c="var(--text-grey)">
                  Dana Grubbs
                </Text>
                <Card shadow="none" bg="var(--light-green)" p={8} radius={8}>
                  <Text size="xs" fw={600}>
                    Hi, this is Dana calling from Braided Health, may I speak to
                    Ms. Newman, please?
                  </Text>
                </Card>
              </Flex>
              <Flex direction="column" gap={4} className="caption-item">
                <Text size="xs" c="var(--text-grey)">
                  Stephaine Newman
                </Text>
                <Card shadow="none" bg="var(--light-green)" p={8} radius={8}>
                  <Text size="xs" fw={600}>
                    This is Stephaine Newman
                  </Text>
                </Card>
              </Flex>
            </Flex>
          </Card>
        )}
        <Modal
          opened={modal}
          onClose={modelExit}
          centered
          className="callWidget-model"
          withCloseButton={false}
        >
          <Modal.Header mih="auto">
            <ActionIcon
              size={35}
              bg="#FAB0051F"
              style={{ borderRadius: '50%', cursor: 'default' }}
            >
              <IconAlertCircle size={20} color="var(--medium-impact-color)" />
            </ActionIcon>
            <Modal.CloseButton />
          </Modal.Header>
          <Text size="lg" fw={600}>
            Would you like to save your notes before ending the call?
          </Text>
          <Text size="xs" mt={8}>
            Ensure your notes are added to the summary, as they won`t be
            accessible afterward.
          </Text>
          <Box mt={16} p={16} bg="var(--light-green)">
            <Text size="sm" fw={500}>
              Notes Preview
            </Text>
            <Text
              size="sm"
              fw={400}
              mt={8}
              mah={63}
              style={{ overflow: 'auto' }}
            >
              {note || 'No notes available'}
            </Text>
          </Box>
          <Flex mt={24} justify={'right'} gap={8}>
            <Button
              onClick={modelClose}
              bg="#fff"
              c="#000"
              size="sm"
              radius={4}
              bd="1px solid var(--platinum-color)"
            >
              Skip Saving & End Call
            </Button>
            <Button onClick={modelClose} size="sm">
              Save & End Call
            </Button>
          </Flex>
        </Modal>
      </Box>
    </div>
  )
}

export default BhCallWidget
