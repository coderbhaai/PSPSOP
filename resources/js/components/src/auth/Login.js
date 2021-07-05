import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class Login extends Component {
    constructor(props){
        super(props)        
        this.state = {
            // email:              '',
            // password:           '',
            email:              'amit.khare588@gmail.com',
            password:           '123456789',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    submitHandler = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email,
            password:                   this.state.password,
        }               
        axios.post('/api/login', data)
            .then(res=> {
                console.log(`res.data`, res.data)
                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
                    localStorage.setItem('logo', JSON.stringify(res.data.logo))
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
                <section className="login py-5">
                    <div className="container my-5">
                        <h1 className="heading">Login</h1>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <form onSubmit={this.submitHandler}>
                                    <label>E-Mail Address</label>
                                    <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange} value={this.state.email}/>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange} value={this.state.password}/>
                                    <div className="my-div"><button className="amitBtn" type="submit">Login</button></div>
                                    <div className="my-div"><a href="/forgot-password" className="amitBtnInverse">Forgot Password</a></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default Login