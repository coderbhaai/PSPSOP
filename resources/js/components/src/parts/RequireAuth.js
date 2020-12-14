import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchUser, exitUser } from './actions/userActions'

export default function(ComposedComponent){
    class RequireAuth extends Component {
        constructor(props) {
            super(props)        
            this.state = {
                isAuthenticated:        '' 
            }
        }

        componentDidMount(){
            if(this.props.isAuthenticated){
                if(!this.props.isAuthenticated.id){ this.props.history.push('/login') }
            }
        }

        UNSAFE_componentWillUpdate(nextProps){
            if(nextProps.isAuthenticated){
                if(!nextProps.isAuthenticated.id){ this.props.history.push('/login') }
            }
        }
        
        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }

    // RequireAuth.propTypes = {
    //     isAuthenticated     : PropTypes.string.isRequired,
    // }

    const mapStateToProps = state =>({
        isAuthenticated:    state.admin.user,
    })
    
    return connect(mapStateToProps, { fetchUser, exitUser })(RequireAuth)

}
