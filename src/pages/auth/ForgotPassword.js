import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import swal from 'sweetalert'
// import BlogCarousel from '../blog/BlogCarousel'
// import Agenda from '../parts/Agenda'

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:             '',
             blogs:             this.props.blogs,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi = async () => {
        const response = await fetch('/suggest')
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message)
        this.setState({ blogs: body.blogs })
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
                <Header/>
                <div className="container my-5">
                    <h1 className="heading">Forgot Password</h1>
                    <div className="row blogs">
                        <div className="col-sm-4">
                            <form onSubmit={this.ResetPassword}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>E-Mail Address</label>
                                        <input id="emailRegister" type="email" className="form-control" name="email" required placeholder="Email Please"/>
                                    </div>
                                    <button className="amitBtn" type="submit">Reset Password</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-8">
                            <h2 className="heading">login</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aliquam facilis suscipit eligendi cum, sequi vero culpa et ut, ad excepturi, doloribus blanditiis quidem impedit amet. Repudiandae voluptate ullam vero molestias sequi ad dolores fugiat ipsa accusantium aliquid temporibus consequatur praesentium itaque aspernatur labore tempora, quas eum similique impedit quam.</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}
export default ForgotPassword