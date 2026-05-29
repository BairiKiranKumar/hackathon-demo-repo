// import { Link, routes } from '@redwoodjs/router'
import {Container, Divider, Loader, Space} from '@mantine/core'

import { Metadata } from '@redwoodjs/web'

import {useAuth} from 'src/auth'

const ProfilePage = () => {
  const {isAuthenticated, currentUser, logOut} = useAuth()
  return (
    <>
      <Metadata title="Profile" description="Profile page" />
      <Container style={{marginInlineStart: '16px'}}>
        <h1>ProfilePage</h1>
        <button onClick={logOut}>Log out</button>
      </Container>
    </>
  )
}

export default ProfilePage
