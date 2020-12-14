import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:             '',
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    
    ResetPassword = e =>{
        e.preventDefault()
        const data={
            email:                      this.state.email
        }
        axios.post('/auth/forgotPassword', data)
            .then(res=> {
                if(res.data.success){
                    localStorage.setItem('message', res.data.message)
                    window.location.href = '/'
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
                    <h1 className="heading">Forgot Password</h1>
                    <div className="row blogs">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <form onSubmit={this.ResetPassword}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>E-Mail Address</label>
                                        <input id="emailRegister" type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange}/>
                                    </div>
                                    <button className="amitBtn" type="submit">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ForgotPassword