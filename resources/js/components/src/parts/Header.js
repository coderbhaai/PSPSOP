import React, { Component } from 'react'

export class Header extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user:              []
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){ 
            swal({ title:     localStorage.getItem('message'), 
            timer:     4000 
        })
            setTimeout(function() { localStorage.removeItem('message') }, 5000)
        }
    }

    logout = e =>{
        e.preventDefault()
        this.callApi()        
    }
    
    callApi(){
        const id = parseInt(this.state.user.id)
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/logout').then( res=> {
            localStorage.setItem('message', res.data.message)
            localStorage.clear();
            this.setState({ user: [] })
            window.location.href = '/login'
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }



    render() {
        return (
            <nav className="navbar navbar-expand-lg">
                <a href="/"><img src="/images/logo.svg" className="logo" alt="Logo"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="nav-link" href="/">Home </a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.user.role? <span>{this.toSentenceCase(this.state.user.name)}</span> : <img src="/images/icons/user.svg" className="userLogo"/> }</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.state.user.role?
                                    <>
                                        {this.state.user.role==="Admin"? <a className="dropdown-item" href="/admin-users">Admin Panel</a> : null }
                                        {this.state.user.role==="Org"? <a className="dropdown-item" href="/org-users">Admin Panel</a> : null }
                                        <a className="dropdown-item" onClick={this.logout}>Log Out</a>
                                    </>
                                    :
                                    <>
                                        <a className="dropdown-item" href="/register">Register</a>
                                        <a className="dropdown-item" href="/login">Login</a>
                                    </>
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header