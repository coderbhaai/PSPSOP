import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './src/parts/Header'
import Footer from './src/parts/Footer'

import Home from './src/pages/Home'
import About from './src/pages/About'

import Register from './src/auth/Register'
import Login from './src/auth/Login'
import ForgotPassword from './src/auth/ForgotPassword'
import ResetPassword from './src/auth/ResetPassword'

import User from './src/admin/User'
import Basics from './src/admin/Basics'
import Usermodel from './src/admin/Usermodel'
import CreateUsermodel from './src/admin/CreateUsermodel'
import Sop from './src/admin/Sop'
import CreateSop from './src/admin/CreateSop'
import UpdateSop from './src/admin/UpdateSop'

function Index() {
    return (
        <Router>
            <Header/> 
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>                
                
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/forgotPassword" component={ForgotPassword}/>
                <Route exact path="/resetPassword/:id" component={ResetPassword}/>
                
                <Route exact path="/admin-users" component={User}/>
                <Route exact path="/admin-basics" component={Basics}/>
                <Route exact path="/admin-usermodel" component={Usermodel}/>
                <Route exact path="/admin-createUsermodel" component={CreateUsermodel}/>
                <Route exact path="/admin-sop" component={Sop}/>
                <Route exact path="/admin-createSop" component={CreateSop}/>
                <Route exact path="/admin-createSop/:id" component={CreateSop}/>
                <Route exact path="/admin-updateSop/:id" component={UpdateSop}/>

            </Switch>
            <Footer/>
        </Router>
    )
}

export default Index

if (document.getElementById('root')) { ReactDOM.render(<Index />, document.getElementById('root')) }