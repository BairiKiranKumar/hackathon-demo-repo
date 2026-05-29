// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import LogoutPage from 'src/pages/LogoutPage/LogoutPage'

import { useAuth } from './auth'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Overviews" titleTo="overviews" buttonLabel="New Overview" buttonTo="newOverview">
        <Route path="/overviews/new" page={OverviewNewOverviewPage} name="newOverview" />
        <Route path="/overviews/{id:Int}/edit" page={OverviewEditOverviewPage} name="editOverview" />
        <Route path="/overviews/{id:Int}" page={OverviewOverviewPage} name="overview" />
        <Route path="/overviews" page={OverviewOverviewsPage} name="overviews" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <PrivateSet unauthenticated="login" wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/care-hub" page={CareHubPage} name="careHub" />
        <Route path="/member-panel" page={MemberPanelPage} name="memberPanel" />
        <Route path="/member-panel/new-member" page={MemberDetailsPage} name="newMember" />
        <Route path="/member-panel/{memberId}" page={MemberDetailsPage} name="memberDetail" />
        <Route path="/member-panel/{memberId}/{tabValue?}" page={MemberDetailsPage} name="memberPanelTabs" />
        <Route path="/settings" page={SettingsPage} name="settings" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/logout" page={LogoutPage} name="logout" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
