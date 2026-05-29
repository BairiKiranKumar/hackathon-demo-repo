import { useEffect, useRef, useState } from 'react'

import {
  Box,
  CloseButton,
  Flex,
  Grid,
  Modal,
  Select,
  TextInput,
  Text,
  Button,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { IconCalendarEvent, IconUpload } from '@tabler/icons-react'

import BhButton from 'src/components/LowLevelComponents/BhButton/BhButton'
import { useMemberFormRegistration } from 'src/hooks/MemberFormRegistration'
import { useMemberFormStore } from 'src/store/MemberFormStore'

interface MemberFormProps {
  memberProfile?
  isEditing?: boolean
}

const MemberDetailsForm = ({ memberProfile, isEditing }: MemberFormProps) => {
  const [modalOpened, setModalOpened] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [profilePhotoBase64, setProfilePhotoBase64] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setAddingNewMember } = useMemberFormStore()

  // Use base64 image if available, otherwise use the stored image or placeholder
  const memberProfileImg =
    profilePhotoBase64 || memberProfile?.image || '/images/user-placeholder.png'

  const form = useForm({
    initialValues: {
      memberName: memberProfile?.name || '',
      bio: memberProfile?.bio || '',
      gender: memberProfile?.gender || '',
      dob: memberProfile?.dob ? new Date(memberProfile?.dob) : null,
      primaryContact: memberProfile?.phone || '',
      secondaryContact: memberProfile?.secondaryPhone || '',
      ethnicity: memberProfile?.ethnicity || '',
      address: memberProfile?.address || '',
      languageSkills: memberProfile?.languageSkills || [],
      image: memberProfile?.image || '', // Store base64 image in form
    },
    validate: {
      memberName: (value) => (!value ? 'Member name is required' : null),
      dob: (value) => (!value ? 'Date of birth is required' : null),
      gender: (value) => (!value ? 'Gender is required' : null),
      primaryContact: (value) =>
        !value ? 'Primary contact is required' : null,
      ethnicity: (value) => (!value ? 'Ethnicity is required' : null),
      address: (value) => (!value ? 'Address is required' : null),
    },
  })

  // Register this form with the store
  useMemberFormRegistration('memberProfile', form)

  // Convert File to Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert file to base64'))
        }
      }
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })
  }

  // Handle file selection from input
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (
        file.size <= 5 * 1024 * 1024 &&
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg')
      ) {
        setProfilePhoto(file)

        // Convert to base64
        try {
          const base64 = await convertFileToBase64(file)
          setProfilePhotoBase64(base64)
          console.log('Photo selected and converted to base64')
        } catch (error) {
          console.error('Error converting file to base64:', error)
          alert('Failed to process the image')
        }
      } else {
        alert('Please select a JPG or PNG file under 5MB')
      }
    }
  }

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (
        file.size <= 5 * 1024 * 1024 &&
        (file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg')
      ) {
        setProfilePhoto(file)

        // Convert to base64
        try {
          const base64 = await convertFileToBase64(file)
          setProfilePhotoBase64(base64)
          console.log('Photo dropped and converted to base64')
        } catch (error) {
          console.error('Error converting file to base64:', error)
          alert('Failed to process the image')
        }
      } else {
        alert('Please select a JPG or PNG file under 5MB')
      }
    }
  }

  const handleClickBrowse = () => {
    fileInputRef.current?.click()
  }

  const handleModalClose = () => {
    setModalOpened(false)
    setProfilePhoto(null)
    // setProfilePhotoBase64('')
    setIsDragging(false)
  }

  const handleUpload = () => {
    if (profilePhotoBase64) {
      // Store the base64 image in the form for later DB storage
      form.setFieldValue('image', profilePhotoBase64)
      console.log('Base64 image saved to form. Ready for DB storage.')
      console.log(
        'Image size:',
        (profilePhotoBase64.length / 1024).toFixed(2),
        'KB'
      )

      handleModalClose()
    }
  }

  const addNewMember = () => {
    setModalOpened(true)
  }

  // Reset form when member changes or editing starts
  useEffect(() => {
    if (isEditing) {
      form.setValues({
        memberName: memberProfile?.name || '',
        gender: memberProfile?.gender || '',
        bio: memberProfile?.bio || '',
        dob: memberProfile?.dob ? new Date(memberProfile?.dob) : null,
        primaryContact: memberProfile?.phone || '',
        secondaryContact: memberProfile?.secondaryPhone || '',
        ethnicity: memberProfile?.ethnicity || '',
        address: memberProfile?.address || '',
        image: memberProfile?.image || '',
      })

      // If there's a base64 image, set it for display
      if (memberProfile?.image) {
        setProfilePhotoBase64(memberProfile.image)
      }

      form.resetDirty()
    }
  }, [memberProfile?.id, isEditing])

  useEffect(() => {
    return () => {
      setAddingNewMember(false)
    }
  }, [])

  return (
    <Box py={16} px={24}>
      <form>
        <Flex ml={8} className="h-full" gap={12} align="center">
          <Box pos="relative" className="h-full">
            <img
              height="84"
              width="84"
              className="member-image"
              src={memberProfileImg}
              style={{ borderRadius: 10 }}
              alt={memberProfile?.name ?? 'member image'}
            />
            <Box
              bg="linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%)"
              pos="absolute"
              top={0}
              h={84}
              className="w-full"
              onClick={addNewMember}
              style={{
                borderRadius: 10,
              }}
            ></Box>
            <IconUpload
              size={16}
              color="var(--mantine-color-white)"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>
          <Box flex={1}>
            <Grid>
              <Grid.Col py={2} span={3}>
                <TextInput
                  withAsterisk
                  label="Member Name"
                  placeholder="Enter member name"
                  {...form.getInputProps('memberName')}
                />
              </Grid.Col>
              <Grid.Col py={2} span={2}>
                <Select
                  withAsterisk
                  label="Gender"
                  placeholder="Select"
                  data={['F', 'M', 'Others']}
                  {...form.getInputProps('gender')}
                />
              </Grid.Col>
              <Grid.Col py={2} span={7}>
                <TextInput
                  label="Bio"
                  placeholder="Enter bio"
                  {...form.getInputProps('bio')}
                />
              </Grid.Col>
              <Grid.Col py={2} span={2}>
                <Box>
                  <DateInput
                    withAsterisk
                    valueFormat="DD/MM/YYYY"
                    label="Date of Birth"
                    placeholder="DD/MM/YYYY"
                    rightSection={<IconCalendarEvent size={16} />}
                    {...form.getInputProps('dob')}
                  />
                </Box>
              </Grid.Col>
              <Grid.Col py={2} span={2}>
                <TextInput
                  withAsterisk
                  label="Primary Contact No."
                  placeholder=""
                  {...form.getInputProps('primaryContact')}
                />
              </Grid.Col>
              <Grid.Col py={2} span={2}>
                <TextInput
                  label="Secondary Contact No."
                  placeholder="Enter here"
                  {...form.getInputProps('secondaryContact')}
                />
              </Grid.Col>
              <Grid.Col py={0} span={2}>
                <Select
                  withAsterisk
                  label="Ethnicity"
                  placeholder="Select"
                  data={['Black or African American', 'Asian', 'Caucasian']}
                  {...form.getInputProps('ethnicity')}
                />
              </Grid.Col>
              <Grid.Col py={2} span={4}>
                <TextInput
                  withAsterisk
                  label="Address"
                  placeholder=""
                  {...form.getInputProps('address')}
                />
              </Grid.Col>
            </Grid>
          </Box>
        </Flex>
        {/* Member Profile Photo Modal */}
        <Modal
          opened={modalOpened}
          onClose={handleModalClose}
          withCloseButton={false}
          centered
          size={600}
          padding={0}
          radius="md"
          styles={{
            content: {
              overflow: 'visible',
            },
            body: {
              padding: 0,
            },
          }}
        >
          <Box
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E9ECEF',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text size="lg" fw={600}>
              Member Profile Photo
            </Text>
            <CloseButton onClick={handleModalClose} size="lg" />
          </Box>

          <Box p={24}>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <Box
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickBrowse}
              style={{
                border: `1.5px dashed ${isDragging ? '#ADB5BD' : '#DEE2E6'}`,
                borderRadius: '8px',
                padding: '80px 40px',
                backgroundColor: isDragging ? '#F8F9FA' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'center',
              }}
            >
              <Flex direction="column" align="center" gap="lg">
                <IconUpload size={48} stroke={1.5} color="#868E96" />

                <Flex direction="column" align="center" gap={8}>
                  <Text size="md" c="#495057" fw={400}>
                    Choose a file or drag & drop it here
                  </Text>
                  <Text size="sm" c="#ADB5BD" fw={400}>
                    JPG, PNG formats, upto 5MB
                  </Text>
                </Flex>
              </Flex>
            </Box>
            {profilePhoto && (
              <Box bg="#F9FAFC" style={{ borderRadius: '8px' }} p={6} mt={12}>
                <Flex gap={8}>
                  <img
                    src={profilePhotoBase64}
                    alt=""
                    style={{ height: 36, width: 36, borderRadius: '4px' }}
                  />
                  <Text size="sm" c="blue" fw={500} mt="xs">
                    {profilePhoto.name}
                  </Text>
                </Flex>
              </Box>
            )}
          </Box>
          <Box
            style={{
              padding: '16px 24px',
              borderTop: '1px solid #E9ECEF',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <BhButton
              size="md"
              radius="md"
              onClick={handleUpload}
              disabled={!profilePhoto}
              variant={'light'}
            >
              Upload
            </BhButton>
          </Box>
        </Modal>
      </form>
    </Box>
  )
}

export default MemberDetailsForm
