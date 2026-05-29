import type { ReactNode } from 'react'

import { MantineProvider } from '@mantine/core'
import theme from 'web/config/mantine.config'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import {AuthProvider, useAuth} from './auth'

import './index.css'
import './scaffold.css'

interface AppProps {
  children?: ReactNode
}

const App = ({ children }: AppProps) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <MantineProvider theme={theme}>
          <RedwoodApolloProvider useAuth={useAuth}>{children}</RedwoodApolloProvider>
        </MantineProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
