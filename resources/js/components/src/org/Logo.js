import React, { Component } from 'react'
import axios from 'axios'
import AdminSidebar from '../parts/AdminSidebar'
const func = require('../parts/functions') 
import api from '../parts/api'

export class About extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            loading:                true,
            id:                     '',
            oldLogo:                '',
            image:                  '',
            showUpdateLogo:         false
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get(api.orgLogo)
        .then(res =>{
            console.log(`res.data`, res.data.data)
                this.setState({
                    id:                 res.data.data.id,
                    oldLogo:            res.data.data.logo
                })
            this.setState({ loading: false }) 
        })
    }


    createAbout = e => {
        e.preventDefault()
        const data={
            about:                         this.state.about
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`          
        axios.post(api.createAbout, data)
        .then( res=>{
            if(res.data.success){
                this.setState({
                    aboutExists:            true,
                    id:                     res.data.data.id,
                    about:                  res.data.data.about,
                })
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    updateAbout = e => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            about:                          this.state.about
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`          
        axios.post(api.updateAbout, data)
        .then( res=>{
            if(res.data.success){
                this.setState({
                    aboutExists:            true,
                    edit:                   false,
                    about:                  res.data.data.about,
                })
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }
    
    uploadImage = (e) =>{ this.setState({ image: e.target.files[0] }) }

    submitHandler=(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.image)
        data.append('oldLogo', this.state.oldLogo)
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateLogo, data)
        .then( res=> {
            console.log('res', res)
            if(res.data.success){
                this.setState({ 
                    oldLogo:                res.data.data.logo,
                    image:                  '',
                })
            }
            func.callSwal(res.data.message)
        })
    }

    updateLogoOn=()=>{
        this.setState({
            showUpdateLogo : true
        })
    }

    render() {
        console.log(`this.state`, this.state)
        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Logo)</h1>
                <div className="row">
                    <AdminSidebar/>
                        <div className="col-sm-10">
                            { this.state.loading ? <img src="/images/icons/loading.gif" className="loading"/> : null }
                            {this.state.oldLogo?
                                <div className="orgLogo">
                                    <img src={func.imgPath+'logo/'+this.state.oldLogo}/>
                                    <button className="amitBtn" onClick={this.updateLogoOn}>Update Company Logo</button>
                                </div>
                            :
                                <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Add Logo</label>
                                            <input className="form-control" type="file" onChange={this.uploadImage}/>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                    </div>
                                </form>
                            }
                            {this.state.showUpdateLogo?
                                <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Upload Logo</label>
                                            <input className="form-control" type="file" onChange={this.uploadImage}/>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                    </div>
                                </form>
                            : null}
                        </div>
                </div>
            </div>
        )
    }
}

export default About
