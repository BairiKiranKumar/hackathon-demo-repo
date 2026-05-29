import { Divider, Flex } from '@mantine/core'
import './index.css'

import { Link, useLocation } from '@redwoodjs/router'

import { Routes } from './Sidebar.routes'
const Sidebar = () => {
  const { pathname } = useLocation()
  const navItems = Routes
  return (
    <aside className="bh-user-sidebar">
      <div className="brand-img text-center">
        <img src="/images/bh-logo.svg" alt="Brand Logo" />
      </div>
      <Divider my="sm" />
      <Flex
        className="sidebar-nav"
        direction="column"
        gap="10px"
        align="center"
      >
        {navItems.map((item, index) => (
          <Link to={item.path} key={item.id || index} className={item.class}>
            <Flex
              direction="column"
              className={`sidebar-nav-item ${pathname === item.path ? 'active' : ''}`}
              align="center"
              gap={2}
            >
              <div className="md-btn-icon">{item.icon}</div>
              {item.label && <span className="menu-label">{item.label}</span>}
            </Flex>
          </Link>
        ))}
      </Flex>
    </aside>
  )
}

export default Sidebar
