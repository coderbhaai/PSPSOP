import React, { Component } from 'react'

export default function(ComposedComponent){
    class RequireOrg extends Component {        
        componentDidMount(){
            if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){ 
                if( JSON.parse(localStorage.getItem('user')).role === "Org" ){
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
    return RequireOrg
}