import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import swal from 'sweetalert'

class Login extends Component {
    constructor(props){
        super(props)        
        this.state = {
            email:              '',
            password:           '',
            // email:              'amit.khare588@gmail.com',
            // password:           '123456789',
            auth:               false,
            // blogs:              this.props.blogs,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
        }
        const url = window.location.href.split("e=");
        if(url[1]){
            localStorage.removeItem('user')
            this.setState({ auth: false })
            window.location.href = '/login'
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    submitHandler = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email,
            password:                   this.state.password,
        }               
        axios.post('/auth/login', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/'
                }else{ this.callSwal(res.data.message) }
            })
            .catch(err=>console.log('err', err))
    }
   
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    render() {
        if(this.state.auth){ window.location.href = '/' }
        return (
            <>
                <Header/>
                <section className="login py-5">
                    <div className="container my-5">
                        <h1 className="heading">Login</h1>
                        <div className="row">
                            <div className="col-sm-4">
                                <img src="images/icons/family-7.svg" alt=""/>
                            </div>
                            <div className="col-sm-8">
                                <h2 className="heading">login</h2>
                                <form onSubmit={this.submitHandler}>
                                    <label>E-Mail Address</label>
                                    <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange} value={this.state.email}/>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange} value={this.state.password}/>
                                    <button className="amitBtn" type="submit">Login</button>
                                    <a href="/forgot-password" className="amitBtnInverse">Forgot Password</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        )
    }
}
export default Login