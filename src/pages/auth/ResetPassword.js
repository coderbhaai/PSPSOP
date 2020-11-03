import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import window from 'global'
import axios from 'axios'
import swal from 'sweetalert'
// import BlogCarousel from '../blog/BlogCarousel'
// import Agenda from '../parts/Agenda'

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
        const agendaLinks=[
            { id: 1, url: 'teaching-experience', cover_img:'teaching-in-a-fast-and-furious-world.jpg', heading: 'Teaching in a fast and furious world', para: ''},
            { id: 2, url: 'student-qualities', cover_img:'qualities-of-a-student-for-a-bright-future.jpg', heading: 'Qualities of a student for a bright future', para: ''},
            { id: 3, url: 'misconceptions-in-education', cover_img:'misconceptions-in-education.jpg', heading: 'Misconceptions in education', para: ''},
            { id: 4, url: 'free-educational-videos', cover_img:'video-tutorials-in-education.jpg', heading: 'Video tutorials in education', para: ''},
            { id: 5, url: 'indian-education', cover_img:'meaning-of-Indian-education-in-different-periods.jpg', heading: 'Indian education System', para: ''},
            { id: 6, url: 'traditional-learning-vs-learning', cover_img:'traditional-learning-vs-online-learning.jpg', heading: 'Traditional learning vs online learning', para: ''},
        ]
        return (
            <>
                <Header/>
                <div className="container my-5">
                    <h1 className="heading"><span>Reset </span>Password </h1>
                    <div className="row">
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
                                <button type="submit" className="btn-0" style={{margin: '3em auto 0'}}>Reset Password<span></span></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="my-5"><BlogCarousel/></div>
                <div className="agenda specialSlider home my-5" id="agenda">
                    <Agenda links={agendaLinks} heading="Some Interesting Reads"/>
                </div>
                <Footer/>
            </>
        )
    }
}
export default ResetPassword