import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            org:                        '',
            name:                       '',
            email:                      '',
            role:                       'User',
            password:                   '',
            password_confirmation:      '',
            status:                     0,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){
            if(JSON.parse(localStorage.getItem('user')).role){ window.location.href = '/' }
        }
    }

    submitHandler = e => {
        e.preventDefault()
        if(this.state.password !== this.state.password_confirmation){
            this.callSwal('Passwords Do Not Match')
        }else{
            const data={
                org:                        this.state.org, 
                name:                       this.state.name, 
                email:                      this.state.email,
                role:                       'Org',
                status:                     this.state.status,
                password:                   this.state.password,
                password_confirmation:      this.state.password_confirmation,
            }               
            axios.post('/api/register', data)
            .then( res=>{
                if(res.data.success){
                    localStorage.setItem( 'message', res.data.message )
                    window.location.href = '/awaiting-approval'
                }else{
                    this.callSwal(res.data.message)
                }
            })
            .catch(err=>console.log('err', err))
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    
    render() {
        return (
            <>
                <section className="register py-5">
                    <div className="container my-5">
                        <h1 className="heading">Register</h1>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <form onSubmit={this.submitHandler}>
                                    <label>Organisation Name</label>
                                    <input type="text" className="form-control" name="org" required placeholder="Name of Organisation Please" onChange={this.onChange}/>
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" required placeholder="Name Please" onChange={this.onChange}/>
                                    <label>E-Mail</label>
                                    <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange}/>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange}/>
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" name="password_confirmation" required placeholder="Confirm Password" onChange={this.onChange}/>
                                    <div className="my-div"><button className="amitBtn" type="submit">Register</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
export default Register