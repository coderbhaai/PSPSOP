import React, { Component } from 'react'
import swal from 'sweetalert'
import axios from 'axios'

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:          []
        }
    }

    componentDidMount(){
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){
            swal({ title: localStorage.getItem('message'), timer: 4000  })
            setTimeout(function() { localStorage.removeItem('message') }, 4000)
        }
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
    }

    toSentenceCase=(str)=>{ return str.replace( /\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() } ) }

    logout = (e) =>{
        e.preventDefault()
        axios.post('/auth/logOut')
            .then(res=> {
                if(res.data.success){
                    localStorage.clear();
                    this.setState({ user: [] })
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/login'
                }
            })
            .catch(err=>console.log('err', err))
    }
    
    render() {
        return (
            <header className="sticky-top"> 
                <nav className="navbar">
                    <a href="/"><img src="/images/logo.svg" alt="" className="logo"/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                            {/* <li className="nav-item"><a className="nav-link" href="/home-loans">Home Loans</a></li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/balance-transfer-of-existing-loan">Balance Transfer of Existing Loan</a>
                                    <a className="dropdown-item" href="/home-construction-loan">Home Construction Loan</a>
                                    <a className="dropdown-item" href="/new-home-loan">New Home Loan</a>
                                    <a className="dropdown-item" href="/home-improvement-loan">Home Improvement Loan</a>
                                    <a className="dropdown-item" href="/loan-against-property">Loan Against Property</a>
                                    <a className="dropdown-item" href="/plot-loan">Plot Loan</a>
                                </div>
                            </li>
                            <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                            {!this.state.user.role? <li className="nav-item"><a className="nav-link" href="/register">Be a Partner</a></li> : null }
                            <li className="nav-item"><a className="nav-link" href="/contact-us">Contact Us</a></li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.state.user.role? <span>{this.toSentenceCase(this.state.user.name)}</span> : <img src="/images/icons/user.svg" className="userLogo"/> }
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {this.state.user.role?
                                    <>
                                        {this.state.user.role==="Admin"? <a className="dropdown-item" href="/admin/users">Admin Panel</a> : null }
                                        {this.state.user.role=="User"? <a className="dropdown-item" href="/user/admin">Admin Panel</a> : null}
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
            </header>
        )
    }
}
export default Header