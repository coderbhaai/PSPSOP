import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUser, exitUser } from './actions/userActions'

export default function(ComposedComponent){
    class RequireAdmin extends Component {
        constructor(props) {
            super(props)        
            this.state = {
                isAdmin:   []
            }
        }
        
        componentDidMount(){
            if(this.props.isAdmin){
                if(this.props.isAdmin.role !== "Admin"){ this.props.history.push('/login') }
            }
        }

        UNSAFE_componentWillUpdate(nextProps){
            if(nextProps.isAdmin){
                if(nextProps.isAdmin.role !== "Admin"){ this.props.history.push('/login') }
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = state =>({ 
        isAdmin:    state.admin.user
    })

    return connect(mapStateToProps, { fetchUser, exitUser })(RequireAdmin)
}