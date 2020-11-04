import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import UserSidebar from '../parts/UserSidebar'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
import swal from 'sweetalert'

export class UserCosting extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            procedure:                  '',
            methodology:                '',
            assignment:                 '',
            period:                     '',
            reports:                    '',
            loading:                    true,
            edit:                       false,
            user:                       [],
            exists:                     false,
            action:                     'addCosting'
             
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
        this.handleChange3 = this.handleChange3.bind( this )
        this.handleChange4 = this.handleChange4.bind( this )
        this.handleChange5 = this.handleChange5.bind( this )
        this.onEditorChange1 = this.onEditorChange1.bind( this )
        this.onEditorChange2 = this.onEditorChange2.bind( this )
        this.onEditorChange3 = this.onEditorChange3.bind( this )
        this.onEditorChange4 = this.onEditorChange4.bind( this )
        this.onEditorChange5 = this.onEditorChange5.bind( this )
    }

    onEditorChange1( evt1 ) { this.setState( { procedure: evt1.editor.getData() } ) }
    onEditorChange2( evt2 ) { this.setState( { methodology: evt2.editor.getData() } ) }
    onEditorChange3( evt3 ) { this.setState( { assignment: evt3.editor.getData() } ) }
    onEditorChange4( evt4 ) { this.setState( { period: evt4.editor.getData() } ) }
    onEditorChange5( evt5 ) { this.setState( { reports: evt5.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { procedure: changeEvent1.target.value } ) }
    handleChange2( changeEvent2 ) { this.setState( { methodology: changeEvent2.target.value } ) }
    handleChange3( changeEvent3 ) { this.setState( { assignment: changeEvent3.target.value } ) }
    handleChange4( changeEvent4 ) { this.setState( { period: changeEvent4.target.value } ) }
    handleChange5( changeEvent5 ) { this.setState( { reports: changeEvent5.target.value } ) }
    editOption=()=>{ this.setState({ edit: true }) }
    closeEditOption=()=>{ this.setState({ edit: false }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    componentDidMount(){ 
        if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
        this.callApi(JSON.parse(localStorage.getItem('user')).id)
    }

    callApi = async (id) => {
        const response = await fetch( '/user/userCosting/'+id ); 
        const body = await response.json();
        body.data.map((i)=>(
            i.subsection == 'procedure' ? this.setState({procedure: i.sopdetails}) :
            i.subsection == 'methodology' ? this.setState({methodology: i.sopdetails}) :
            i.subsection == 'assignment' ? this.setState({assignment: i.sopdetails}) :
            i.subsection == 'period' ? this.setState({period: i.sopdetails}) :
            i.subsection == 'reports' ? this.setState({reports: i.sopdetails})
            :null
        ))
        if (response.status !== 200) throw Error(body.message)
        if(body.data.length){ this.setState({ exists: true }) }else{ this.setState({ exists: false }) }
        this.setState({ loading: false })
    }

    submitHandler= (e)=>{
        e.preventDefault()
        this.setState({ loading: true })
        const data={
            userId:                     this.state.user.id,
            procedure:                  this.state.procedure,
            methodology:                this.state.methodology,
            assignment:                 this.state.assignment,
            period:                     this.state.period,
            reports:                    this.state.reports
        }
        {this.state.exists?
            axios.post('/user/updateCosting', data)
            .catch(err=>console.log('err', err))
            .then(res=>{ 
                console.log("Update Costing", res)
                if(res.data.success){ this.postSubmit(res.data.message) }
            })
        :
            axios.post('/user/addCosting', data)
            .catch(err=>console.log('err', err))
            .then(res=>{ 
                console.log("Add Costing", res)
                if(res.data.success){ this.postSubmit(res.data.message) }
            })
        }
    }

    postSubmit=(message)=>{
        this.setState({ 
            edit:                       false,
            exists:                     true,
            procedure:                  this.state.procedure,
            methodology:                this.state.methodology,
            assignment:                 this.state.assignment,
            period:                     this.state.period,
            reports:                    this.state.reports,
            loading:                    false
        })
        this.callSwal(message)
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container user">
                    <h1 className="heading">SOP for Costing</h1>
                    <div className="row mb-5">
                        <div className="col-sm-12">

                        </div>
                        <UserSidebar active="Costing"/>
                        <div className="col-sm-9">
                            {this.state.loading? <div className="text-center"><img src="/images/icons/loading.gif" alt="" className="logo"/></div> :
                                <>
                                    { this.state.edit? 
                                        <>
                                        { this.state.exists?
                                            <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                                                <h3>Establish Cost Accounting Procedures</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.procedure} content= {this.state.procedure} onChange={this.onEditorChange1} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Develop Costing Methodology</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.methodology} content= {this.state.methodology} onChange={this.onEditorChange2} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Perform Cost Assignment</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.assignment} content= {this.state.assignment} onChange={this.onEditorChange3} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Perform Period End Close</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.period} content= {this.state.period} onChange={this.onEditorChange4} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Develop Cost Reports</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.reports} content= {this.state.reports} onChange={this.onEditorChange5} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <div className="my-div">
                                                    <button className="amitBtn">Update Costing SOP</button>
                                                    <button className="amitBtnInverse mt-5" onClick={this.closeEditOption}>Close</button>
                                                </div>
                                            </form>
                                        :
                                            <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                                                <h3>Establish Cost Accounting Procedures</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.procedure} onChange={this.onEditorChange1} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Develop Costing Methodology</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.methodology} onChange={this.onEditorChange2} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Perform Cost Assignment</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.assignment} onChange={this.onEditorChange3} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Perform Period End Close</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.period} onChange={this.onEditorChange4} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <h3>Develop Cost Reports</h3>
                                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.reports} onChange={this.onEditorChange5} config={ { allowedContent : true, extraAllowedContent: "span; *(*)", forcePasteAsPlainText: true}}/>
                                                <div className="my-div">
                                                    <button className="amitBtn">Add Costing SOP</button>
                                                    <button className="amitBtnInverse mt-5" onClick={this.closeEditOption}>Close</button>
                                                </div>
                                            </form>
                                        }
                                        </>
                                        : 
                                        <>
                                            <h3>Establish Cost Accounting Procedures</h3>
                                            {this.state.procedure ?<section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.procedure }} /> : <p>You are yet to add data</p> }
                                            <h3>Develop Costing Methodology</h3>
                                            {this.state.methodology ?<section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.methodology }} /> : <p>You are yet to add data</p> }
                                            <h3>Perform Cost Assignment</h3>
                                            {this.state.assignment ?<section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.assignment }} /> : <p>You are yet to add data</p> }
                                            <h3>Perform Period End Close</h3>
                                            {this.state.period ?<section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.period }} /> : <p>You are yet to add data</p> }
                                            <h3>Develop Cost Reports</h3>
                                            {this.state.reports ?<section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.reports }} /> : <p>You are yet to add data</p> }
                                            <div className="my-div"><button className="amitBtn" onClick={this.editOption}>Edit</button></div>
                                        </>
                                    }
                                </>
                            }

                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default UserCosting
