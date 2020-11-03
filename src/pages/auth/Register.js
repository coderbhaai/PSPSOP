import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import swal from 'sweetalert'

class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            name:                       '',
            email:                      '',
            phone:                      '',
            role:                       '',
            password:                   '',
            password_confirmation:      '',
            auth:                       false,
            blogs:                      this.props.blogs,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ 
            this.setState({ auth: JSON.parse(localStorage.getItem('user')).auth || false })
            if(JSON.parse(localStorage.getItem('user')).auth){
                window.location.href = '/'
            }
        }
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    submitHandler = e => {
        e.preventDefault()
        const data={
            name:                       this.state.name, 
            email:                      this.state.email,
            role:                       this.state.role,
            phone:                       this.state.phone,
            password:                   this.state.password,
            password_confirmation:      this.state.password_confirmation
        }               
        axios.post('/auth/register', data)
        .then( res=>{
            if(res.data.success){
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem( 'message', res.data.message )
                window.location.href = '/'
            }else{
                this.callSwal(res.data.message)
            }
        })
        .catch(err=>console.log('err', err))
    }

    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    
    render() {
        return (
            <>
                <Header/>
                <section className="register py-5">
                    <div className="container my-5">
                        <h1 className="heading">Regsiter</h1>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src="images/icons/family-5.svg" alt=""/>
                            </div>
                            <div className="col-sm-6">
                                <h2 className="heading">Register With us</h2>
                                <form onSubmit={this.submitHandler}>
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" required placeholder="Name Please" onChange={this.onChange}/>
                                    <label>E-Mail Address</label>
                                    <input type="email" className="form-control" name="email" required placeholder="Email Please" onChange={this.onChange}/>
                                    <label>Phone</label>
                                    <input type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0" className="form-control" name="phone" required placeholder="Contact Number" onChange={this.onChange}/>
                                    <label>I am a </label>
                                    <select className="form-control" required name="role" onChange={this.onChange}>
                                        <option>Iam a </option>
                                        <option value="User">User</option>
                                        <option value="Agent">Referral Agent</option> 
                                        <option value="Bank">Bank Representative</option>
                                    </select>
                                    <label>Password</label>
                                    <input type="password" className="form-control" name="password" required placeholder="Password Please" onChange={this.onChange}/>
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" name="password_confirmation" required placeholder="Confirm Password" onChange={this.onChange}/>
                                    <button className="amitBtn" type="submit">Register</button>
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
export default Register