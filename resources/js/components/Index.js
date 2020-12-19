import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './src/parts/Header'
import Footer from './src/parts/Footer'

import Home from './src/pages/Home'
import AwaitingApproval from './src/pages/AwaitingApproval'

import Register from './src/auth/Register'
import Login from './src/auth/Login'
import ForgotPassword from './src/auth/ForgotPassword'
import ResetPassword from './src/auth/ResetPassword'

import AdminUser from './src/admin/User'
import Basics from './src/admin/Basics'

import OrgUser from './src/org/User'

import CreateSop from './src/admin/CreateSop'
import UpdateSop from './src/admin/UpdateSop'
import SopList from './src/admin/Sop'

import RequireAdmin from './src/parts/RequireAdmin'
import RequireOrg from './src/parts/RequireOrg'
import RequireAdminOrOrg from './src/parts/RequireAdminOrOrg'

function Index() {
    return (
        <Router>
            <Header/> 
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/awaiting-approval" component={AwaitingApproval}/>           
                
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/forgotPassword" component={ForgotPassword}/>
                <Route exact path="/resetPassword/:id" component={ResetPassword}/>
                
                <Route exact path="/admin-users" component={RequireAdmin( AdminUser ) }/>

                <Route exact path="/org-users" component={RequireOrg( OrgUser ) }/>

                <Route exact path="/basics" component={RequireAdminOrOrg( Basics ) }/>
                <Route exact path="/sopList" component={RequireAdminOrOrg( SopList ) }/>
                <Route exact path="/createSop" component={RequireAdminOrOrg( CreateSop ) }/>
                <Route exact path="/updateSop/:id" component={RequireAdminOrOrg( UpdateSop ) }/>

            </Switch>
            <Footer/>
        </Router>
    )
}

export default Index

if (document.getElementById('root')) { ReactDOM.render(<Index />, document.getElementById('root')) }