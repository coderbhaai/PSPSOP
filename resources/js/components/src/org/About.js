import React, { Component } from 'react'
import axios from 'axios'
import AdminSidebar from '../parts/AdminSidebar'
const func = require('../parts/functions')
import api from '../parts/api'
import CKEditor from 'ckeditor4-react'

export class About extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            edit:                   false,
            aboutExists:            false,
            loading:                true,
            id:                     '',
            about:                  '',
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }
    ckEditorReady=()=>{ this.getAbout() }
    onEditorChange1( evt1 ) { this.setState( { about: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { about: changeEvent1.target.value } ) }
    changeEdit=()=>{ this.setState({ edit: !this.state.edit }) }

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    getAbout=()=>{
        if(this.state.loading){
            const token = JSON.parse(localStorage.getItem('access_token'))
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            axios.get(api.orgAbout).then(res =>{
                console.log(`res.data`, res.data)
                if(res.data.data[0]){
                    this.setState({
                        aboutExists:            true,
                        id:                     res.data.data[0].id,
                        about:                  res.data.data[0].about,
                    })
                }
                this.setState({ loading: false }) 
            })
        }
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
    
    render() {
        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (About)</h1>
                <div className="row">
                    <AdminSidebar/>
                        <div className="col-sm-10">
                            {this.state.loading? <img src="/images/icons/loading.gif" className="loading"/> : null }
                            {this.state.aboutExists?
                                <>
                                    {!this.state.edit?
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: this.state.about }}></div>
                                            <button className="amitBtn" onClick={this.changeEdit}>Edit About Us</button>
                                        </>
                                    : null}
                                </>
                            : 
                                <form onSubmit={this.createAbout}>
                                    <div className="row">
                                        <div className={"col-sm-12"}>
                                            <label>Create About the company</label>
                                            <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.about} onChange={this.onEditorChange1}/>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Add About the company</button></div>
                                    </div>
                                </form>
                            }
                            {this.state.edit?
                                <>
                                    <form onSubmit={this.updateAbout}>
                                        <div className="row">
                                            <div className={"col-sm-12"}>
                                                <label>Update About the company</label>
                                                <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.about} content={this.state.about} onChange={this.onEditorChange1}/>
                                            </div>
                                            <div className="my-div"><button className="amitBtn" type="submit">Update About the company</button></div>
                                        </div>
                                    </form>
                                    <div className="my-div"><button className="amitBtn" onClick={this.changeEdit}>Cancel</button></div>
                                </>
                            : null }
                        </div>
                </div>
            </div>
        )
    }
}

export default About
