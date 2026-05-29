import {useEffect} from 'react'
import {navigate} from '@redwoodjs/router'
import {useAuth} from 'src/auth'

const LogoutPage = () => {
  const {logOut} = useAuth()

  useEffect(() => {
    // Log out the user on component mount
    logOut().then(() => {
      // Navigate to the root after logout
      navigate('/')
    })
  }, [logOut])

  // Optionally, you can show a loading spinner or message during logout
  return <p>Logging out...</p>
}

export default LogoutPage
