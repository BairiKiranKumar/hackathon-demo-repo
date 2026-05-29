// import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

import BhTimeline from '@highLevelComp/BhTimeline/BhTimeline'
import HomeHeader from '@highLevelComp/HomeHeader/HomeHeader'
import ScheduleTabPanel from '@highLevelComp/ScheduleTabPanel/ScheduleTabPanel'
import SkeletonLoader from '@lowLevelComp/SkeletonLoader/SkeletonLoader'
import { Flex, Box } from '@mantine/core'

import { Metadata } from '@redwoodjs/web'

import './index.css'
import CallWidget from 'src/components/HighLevelComponents/AiCallWidget/CallWidget'
import KpiBar from 'src/components/HighLevelComponents/KpiBar/KpiBar'

const HomePage = () => {
  const [eventToMoveId, setEventToMoveId] = useState()
  const [autoSchedule, setAutoSchedule] = useState(false)
  // ========== CALL WIDGET DEMO CONTROL ==========
  // Set this to true to show the call widget
  const SHOW_CALL_WIDGET = true

  // Demo call data
  const demoCallData = {
    name: 'Stephanie Newman',
    age: 56,
    gender: 'F',
    image: 'images/user-placeholder.png',
  }
  // ===============================================

  const [callOpened, setCallOpened] = useState(SHOW_CALL_WIDGET)
  const [currentCall, setCurrentCall] = useState(
    SHOW_CALL_WIDGET ? demoCallData : null
  )

  const handleAutoScheduleWithAi = () => {
    setAutoSchedule(true)
    const timerId = setTimeout(() => {
      setAutoSchedule(false)
    }, 3000)
    return () => clearTimeout(timerId)
  }

  const onDragStart = (event) => {
    setEventToMoveId(event.target.getAttribute('data-id'))
  }

  const handleAcceptCall = () => {
    console.log('Call accepted:', currentCall)
    // Add your call acceptance logic here
    setCallOpened(false)
  }

  const handleRejectCall = () => {
    console.log('Call rejected:', currentCall)
    // Add your call rejection logic here
    setCallOpened(false)
  }

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <Box className="bh-home-container w-full" bg="var(--bg-primary-grey)">
        <HomeHeader />
        <KpiBar />
        {autoSchedule && <SkeletonLoader isAiGradient={true} height={2} />}
        <Flex gap={56} ml="auto" w="92%">
          <Box className="timeline-wrapper w-full" h="calc(100vh - 96px)">
            <BhTimeline movedTaskId={eventToMoveId} />
          </Box>

          <ScheduleTabPanel
            onDragEvent={onDragStart}
            handleAutoSchedule={handleAutoScheduleWithAi}
          />
        </Flex>
      </Box>

      {currentCall && (
        <CallWidget
          opened={callOpened}
          onClose={() => setCallOpened(false)}
          callerName={currentCall.name}
          callerAge={currentCall.age}
          callerGender={currentCall.gender}
          callerImage={currentCall.image}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
        />
      )}
    </>
  )
}

export default HomePage
