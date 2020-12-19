import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import CKEditor from 'ckeditor4-react'
import { Dropdown } from 'semantic-ui-react'

export class CreateSop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                           [],
            basicOptions:                   [],
            order:                          [],
            sopfor:                         '',
            sop:                            '',
            sopName:                        '',
            sopList:                        [],
            loading:                        true
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)   
        this.callApi()
    }

    callApi(){
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get('/api/sopBasic').then(res =>{
            console.log('res.data', res.data)
            this.setState({ 
                basicOptions:                   res.data.data,
                loading:                        false
            })
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    onEditorChange1( evt1 ) { this.setState( { sop: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { sop: changeEvent1.target.value } ) }

    processSelected = (e, {value}) => { 
        console.log('value', value)
        this.setState({ sopfor: value })
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get('/api/fetchOrder/'+value).then(res =>{
            console.log('res.data', res.data)
            this.setState({ order: res.data.data }) 
        })
    }
    
    submitHandler = e => {
        e.preventDefault()
        const data={
            sopfor:                         this.state.sopfor,
            sop:                            this.state.sop,
        }        
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`       
        axios.post('/api/createSop', data)
        .then( res=>{
            console.log('res.data', res.data)
            if(res.data.success){
                localStorage.setItem( 'message', res.data.message )
                window.location.href = '/sopList'
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }
    
    render() {
        console.log('this.state', this.state)
        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Create SOP {this.state.sopName? 'for '+this.state.sopName : null} </h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className={"col-sm-12"}>
                                    <label>Create Sop For</label>
                                    <Dropdown placeholder='Create SOP for' single="true" fluid search selection onChange={this.processSelected} options={this.state.basicOptions}/>
                                    {this.state.order.length ? <span>Create SOP for </span> : null}
                                    {this.state.order.map((i,index)=>( <span key={index}>{index!== this.state.order.length-1 ? i+' => ' : <strong>{i}</strong> }</span>))}
                                </div>
                                <div className="col-sm-12">
                                    <label>Create SOP</label>
                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.sop} onChange={this.onEditorChange1} />
                                </div>
                                <div className="my-div"><button className="amitBtn" type="submit">Create SOP</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateSop
