import { useEffect, useMemo, useState, useCallback } from 'react'

import { routes, useLocation } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { QUERY } from 'src/components/Member/MembersCell'

export const useCommandPaletteSearch = (onClose, inputRef, isVisible) => {
  const [searchValue, setSearchValue] = useState('')
  const location = useLocation()
  const { data } = useQuery(QUERY)
  const members = data?.members || []

  const tabRoutes = useMemo(
    () => [
      {
        name: 'Member Panel Tabs - Overview',
        path: '/member-panel?tabValue=overview',
        category: 'Member Panel Tabs',
      },
      {
        name: 'Member Panel Tabs - All Plans',
        path: '/member-panel?tabValue=all-plans',
        category: 'Member Panel Tabs',
      },
      {
        name: 'Member Panel Tabs - Timeline',
        path: '/member-panel?tabValue=timeline',
        category: 'Member Panel Tabs',
      },
      {
        name: 'Member Panel Tabs - Punchlist',
        path: '/member-panel?tabValue=punchlist',
        category: 'Member Panel Tabs',
      },
    ],
    []
  )

  const allPlanTabRoutes = useMemo(
    () => [
      {
        name: 'All Plan - Service Plan',
        path: '/member-panel?tabValue=all-plans&subTabValue=service-plan',
        category: 'Member Panel Tabs',
      },
      {
        name: 'All Plan - Care Plan',
        path: '/member-panel?tabValue=all-plans&subTabValue=care-plan',
        category: 'Member Panel Tabs',
      },
    ],
    []
  )

  const allRoutes = useMemo(() => {
    return Object.keys(routes)
      .map((key) => {
        try {
          const path = routes[key]()
          return { name: key, path, category: 'Pages' }
        } catch {
          return null
        }
      })
      .filter((route) => route && !route.path.includes('/admin'))
  }, [])

  const finalRoutes = useMemo(
    () => [...allRoutes, ...tabRoutes, ...allPlanTabRoutes],
    [allRoutes, tabRoutes, allPlanTabRoutes]
  )

  const filteredRoutes = useMemo(() => {
    const lowerSearch = searchValue.toLowerCase()
    return finalRoutes.filter((route) =>
      route.name.toLowerCase().includes(lowerSearch)
    )
  }, [searchValue, finalRoutes])

  const filteredMembers = useMemo(() => {
    const lowerSearch = searchValue.toLowerCase()
    return members.filter((member) =>
      member.name.toLowerCase().includes(lowerSearch)
    )
  }, [searchValue, members])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      inputRef.current?.focus()
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return {
    searchValue,
    setSearchValue,
    filteredRoutes,
    filteredMembers,
    location,
  }
}
