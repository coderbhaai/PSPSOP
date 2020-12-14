import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class ResetPassword extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            token:                  '',
            email:                  '',
            password:               '',
            confirm_password:       ''
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    submitHandler = (e) =>{
        e.preventDefault()
        const data={
            token:                      window.location.href.split("/").pop(),
            email:                      this.state.email,
            password:                   this.state.password,
            confirm_password:           this.state.confirm_password
        }               
        axios.post('/auth/resetPassword', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/login'
                }else{
                    this.callSwal(res.data.message)
                }
            })
            .catch(err=>console.log('err', err))
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    <h1 className="heading"><span>Reset </span>Password </h1>
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <form onSubmit={this.submitHandler} className="auth">
                                <div>
                                    <label>E-Mail Address</label>
                                    <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={this.state.email} onChange={this.onChange} placeholder="Email Please"/>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={this.state.password} onChange={this.onChange} placeholder="Password Please"/>
                                </div>
                                <div>
                                    <label>Confirm Password</label>
                                    <input id="password-confirm" type="password" className="form-control" name="confirm_password" required autoComplete="new-password" value={this.state.confirm_password} onChange={this.onChange} placeholder="Confirm Password"/>
                                </div>
                                <div className="my-div">
                                    <button type="submit" className="amitBtn">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ResetPassword