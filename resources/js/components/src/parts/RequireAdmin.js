import React, { Component } from 'react'

export default function(ComposedComponent){
    class RequireAdmin extends Component {        
        componentDidMount(){
            if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){ 
                if( JSON.parse(localStorage.getItem('user')).role === "Admin" ){
                    console.log("Welcome")
                }else{
                    this.props.history.push('/login')
                }
            }else{
                this.props.history.push('/login')
            }
        }
        render() { return ( <ComposedComponent {...this.props}/> ) }
    }
    return RequireAdmin
}