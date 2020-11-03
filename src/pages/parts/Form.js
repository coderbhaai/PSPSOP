import React, { Component } from 'react'
import axios from 'axios'
import window from 'global'
// import ReCAPTCHA from "react-google-recaptcha"

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',               
            email:              '',
            phone:              '',
            message:            '',
            // name:               'Amit',               
            // email:              'amit@amit.com',
            // phone:              '987654321',
            // message:            'Testing',
            humanKey:           '',
            siteKey:            '6LcwbNYZAAAAAHn8mimBnD1YEX8-BBvM02xgrijL',
            secret:             '6LcwbNYZAAAAAHdz6s_PCCfKlpbEhvbd9NjVn7db',
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    // recaptchaChange=(value)=>{
    //     console.log("Captcha value:", value)
    //     this.setState({ humanKey: value })
    // }
    
    submitAddHandler = async(e) =>{
        e.preventDefault()
        // console.log('this.state.secret', this.state.secret)
        // console.log('this.state.humanKey', this.state.humanKey)
        // // const isHuman = await fetch(`https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify`, {
        // //     method: "post",
        // //     headers: {
        // //         Accept: "application/json",
        // //         "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        // //     },
        // //     body: `secret=${this.state.secret}&response=${this.state.humanKey}`
        // // })
        // // .then(res => {
        // //     res.json()
        // //     console.log('res', res)
        // // })
        // // // .then(json => json.success)
        // // .catch(err => {
        // //     throw new Error(`Error in Google Siteverify API. ${err.message}`)
        // // })
        // // console.log('isHuman', isHuman)
        // // const data={
        // //     secret:              this.state.secret,
        // //     response:            this.state.humanKey
        // // } 
        // // console.log('data', data)              
        // // axios.post('https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify', data)
        // axios.post('https://cors-anywhere.herokuapp.com/https://www.google.com/recaptcha/api/siteverify', {
        //     headers: {
        //                 Accept: "application/json",
        //                 "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        //             },
        //     body: `secret=${this.state.secret}&response=${this.state.humanKey}`
        // })
        // .then(res => {
        //     // res.json()
        //     console.log('res', res)
        // })
        // .then(json => json.success)
        // .catch(err => {
        //     throw new Error(`Error in Google Siteverify API. ${err.message}`)
        //   })
        //     .then( res=> {
        //         // if(res.data.success){
        //         //     localStorage.setItem('message', 'Form submitted succesfully')
        //         //     window.location.href = '/thank-you'
        //         // }
        //     })
        //     .catch(err=>console.log('err', err)) 

        const data={
            name:               this.state.name, 
            email:              this.state.email,
            phone:              this.state.phone,
            message:            this.state.message
        }               
        axios.post('/contactForm', data)
            .then( res=> {
                if(res.data.success){
                    localStorage.setItem('message', 'Form submitted succesfully')
                    window.location.href = '/thank-you'
                }
            })
            .catch(err=>console.log('err', err)) 
    }

    phoneValidate =(e)=>{
        if(e.target.value.length<11){
            this.setState({ phone:  e.target.value })
        }
    }
    
    render() {
        return (
            <>
                <form encType="multipart/form-data" onSubmit={this.submitAddHandler}>
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" required placeholder="Name Please *" value={this.state.name} onChange={this.onChange}/>
                    <label>Email</label>
                    <input className="form-control" type="email" name="email" required placeholder="Email Please *" value={this.state.email} onChange={this.onChange}/> 
                    <label>Phone</label>
                    <input className="form-control" type="number" onKeyDown={ (e) => e.key === 'e' && e.preventDefault() } min="0"  name="phone" required placeholder="Phone Please *" value={this.state.phone} onChange={this.phoneValidate}/>
                    <label>Message</label>
                    <textarea name="message" className="form-control" placeholder="Message" value={this.state.message} onChange={this.onChange}></textarea>
                    {/* <ReCAPTCHA sitekey={this.state.siteKey} onChange={this.recaptchaChange} /> */}
                    <div className="my-div">
                        <button className="amitBtn">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}
export default Form