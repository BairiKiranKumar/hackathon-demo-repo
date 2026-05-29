import React, { createContext, useContext, useEffect, useState } from 'react'

import { PHQ9Questionaire, punchList } from 'src/pages/MemberPanelPage/data'

// Create the context
export const PunchListContext = createContext(null)

export const PunchListProvider = ({ children }) => {
  const [punchListData, setPunchListData] = useState(punchList)
  const [phq9Data] = useState(PHQ9Questionaire)
  const [activePunchList, setActivePunchList] = useState({})
  const [drawer, setDrawer] = useState(false)

  useEffect(() => {
    const lastCompletedIndex = punchListData
      .map((item) => item.stageInfo.stage)
      .lastIndexOf('started')
    setActivePunchList(
      lastCompletedIndex !== -1 ? punchListData[lastCompletedIndex] : {}
    )
  }, [])

  // Function: handleDoneClick
  const handleDoneClick = () => {
    const updatedData = punchListData.map((item, index) => {
      const lastCompletedIndex = punchListData
        .map((item) => item.stageInfo.stage)
        .lastIndexOf('started')

      if (index === lastCompletedIndex) {
        // Mark current item as 'completed'
        return {
          ...item,
          stageInfo: { ...item.stageInfo, stage: 'completed' },
          state: '',
        }
      } else if (index === lastCompletedIndex + 1) {
        // Mark next item as 'started' and 'active'
        return {
          ...item,
          stageInfo: { ...item.stageInfo, stage: 'started' },
          state: 'active',
        }
      }
      return item
    })

    // Handle special cases for items with id 2 or 8
    const lastCompletedIndex = punchListData
      .map((item) => item.stageInfo.stage)
      .lastIndexOf('started')

    if (
      punchListData[lastCompletedIndex]?.id === 2 ||
      punchListData[lastCompletedIndex]?.id === 8
    ) {
      if (punchListData[lastCompletedIndex + 1]) {
        updatedData[lastCompletedIndex + 1] = {
          ...updatedData[lastCompletedIndex + 1],
          view: true,
        }
      }
    }

    // Update active punch list
    if (updatedData[lastCompletedIndex + 1] !== undefined) {
      setActivePunchList(updatedData[lastCompletedIndex + 1])
    } else {
      setActivePunchList({})
    }

    setPunchListData([...updatedData])
  }

  // Function: addPHQFormToPunchlist
  const addPHQFormToPunchlist = (form) => {
    const updatedData = [...punchListData]
    const lastCompletedIndex = updatedData
      .map((item) => item.name)
      .lastIndexOf('PHQ2 Assessment')

    const newList = {
      id: 8,
      checked: false,
      name: form === 2 ? 'PHQ2 Assessment' : 'PHQ9 Assessment',
      description: 'Evaluate depression severity.',
      state: '',
      aiEnabled: false,
      priority: 'Urgent',
      stageInfo: { stage: 'ongoing' },
      category: 'interaction',
      view: true,
      key: form === 2 ? 'phq2' : 'phq9',
      aiSuggestion: true,
      questionnaire:
        form === 2
          ? [
              {
                problem: 'Little interest or pleasure in doing things',
                answer: '',
                id: 'pr0',
              },
              {
                problem: 'Feeling down, depressed or hopeless',
                answer: '',
                id: 'pr1',
              },
            ]
          : phq9Data,
    }

    updatedData.splice(lastCompletedIndex + 1, 0, newList)
    setPunchListData(updatedData)
  }

  // Function: open right panel
  const handleOpenPanel = () => {
    setDrawer(true)
  }

  return (
    <PunchListContext.Provider
      value={{
        punchListData,
        activePunchList,
        drawer,
        setDrawer,
        setPunchListData,
        handleDoneClick,
        addPHQFormToPunchlist,
        handleOpenPanel,
      }}
    >
      {children}
    </PunchListContext.Provider>
  )
}

// Hook to use the context
export const usePunchListContext = () => {
  const context = useContext(PunchListContext)
  if (!context) {
    throw new Error(
      'usePunchListContext must be used within a PunchListProvider'
    )
  }
  return context
}
