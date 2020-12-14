import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import CKEditor from 'ckeditor4-react'

export class UpdateSop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            basics:                         [],
            userId:                         '',
            dept:                           '',
            process:                        '',
            subprocess:                     '',
            subsubprocess:                  '',
            sop:                            '',
            loading:                        true
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)   
        this.callApi()
        if(typeof(Storage) !== "undefined"){ this.setState({ userId: JSON.parse(localStorage.getItem('user')).id || '' }) }
    }

    callApi(){
        axios.get('/api/adminBasic').then(res =>{ 
            this.setState({ basics: res.data.data })  
        })
    }

    getSop=()=>{
        if(this.state.loading){
            const url = window.location.href.split("/").pop();
            axios.get('/api/getSop/'+url).then(res =>{
                console.log('res.data.data', res.data.data)
                this.setState({ 
                    id:                             url,
                    dept:                           res.data.data.dept,
                    process:                        res.data.data.process,
                    subprocess:                     res.data.data.subprocess,
                    subsubprocess:                  res.data.data.subsubprocess,
                    sop:                            res.data.data.sop,
                    loading:                        false 
                }) 
            })
        }
    }

    ckEditorReady=()=>{
        this.getSop()
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    onEditorChange1( evt1 ) { this.setState( { sop: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { sop: changeEvent1.target.value } ) }

    submitHandler = e => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            dept:                           this.state.dept,
            process:                        this.state.process,
            subprocess:                     this.state.subprocess,
            subsubprocess:                  this.state.subsubprocess,
            sop:                            this.state.sop,
        }               
        axios.post('/api/updateSop', data)
        .then( res=>{
            console.log('res.data', res.data)
            if(res.data.success){
                localStorage.setItem( 'message', res.data.message )
                window.location.href = '/admin-sop'
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    render() {
        console.log('this.state', this.state)
        if( this.state.dept && this.state.basics.filter((i)=>{ if( i.type === 'process' && i.tab1 === this.state.dept){ return i }}).length>0 ){ var deptExists = 1 } else{var deptExists = 0 }
        if(this.state.process && this.state.basics.filter((i)=>{ if( i.type === 'subprocess' && i.tab1 === this.state.dept && i.tab2 === this.state.process ){ return i }})> 0){ var processExists = 1 } else{var processExists = 0 }
        if(this.state.subprocess){ var subprocessExists = 1 } else{var subprocessExists = 0 }
        const columns = 12 / ( 1+ deptExists + processExists + subprocessExists)
        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Create SOP)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                            <form onSubmit={this.submitHandler}>
                                <div className="row">
                                    <div className={"col-sm-"+columns}>
                                        <label>Select Department</label>
                                        <select className="form-control" required name="dept" onChange={this.onChange} value={this.state.dept}>
                                            <option value=''>Select Deparment</option>
                                            {this.state.basics.filter((i)=>{ if( i.type === 'dept' ){ return i }}).map((i,index)=>( <option key={index} value={i.tab1}>{i.tab1}</option>))}
                                        </select>
                                    </div>
                                    { this.state.dept && this.state.basics.filter((i)=>{ if( i.type === 'process' && i.tab1 === this.state.dept){ return i }}).length>0?
                                        <>
                                            <div className={"col-sm-"+columns}>
                                                <label>Select Process</label>
                                                <select className="form-control" required name="process" onChange={this.onChange} value={this.state.process}>
                                                    <option value=''>Select Process</option>
                                                    {this.state.basics.filter((i)=>{ if( i.type === 'process' && i.tab1 === this.state.dept ){ return i }}).map((i,index)=>( <option key={index} value={i.tab2}>{i.tab2}</option>))}
                                                </select>
                                            </div>
                                            {this.state.process && this.state.basics.filter((i)=>{ if( i.type === 'subprocess' && i.tab1 === this.state.dept && i.tab2 === this.state.process ){ return i }})> 0?
                                            <>
                                                <div className={"col-sm-"+columns}>
                                                    <label>Select SubProcess</label>
                                                    <select className="form-control" required name="subprocess" onChange={this.onChange} value={this.state.subprocess}>
                                                        <option value=''>Select SubProcess</option>
                                                        {this.state.basics.filter((i)=>{ if( i.type === 'subprocess' && i.tab1 === this.state.dept && i.tab2 === this.state.process ){ return i }}).map((i,index)=>( <option key={index} value={i.tab2}>{i.tab2}</option>))}
                                                    </select>
                                                </div>
                                                {this.state.subprocess && this.state.basics.filter((i)=>{ if( i.type === 'subsubprocess' && i.tab1 === this.state.dept && i.tab2 === this.state.process && i.tab3 === this.state.subprocess ){ return i }})>0?
                                                    <div className={"col-sm-"+columns}>
                                                        <label>Select Sub SubProcess</label>
                                                        <select className="form-control" required name="subsubprocess" onChange={this.onChange} value={this.state.subsubprocess}>
                                                            <option value=''>Select Sub SubProcess</option>
                                                            {this.state.basics.filter((i)=>{ if( i.type === 'subsubprocess' && i.tab1 === this.state.dept && i.tab2 === this.state.process && i.tab3 === this.state.subprocess ){ return i }}).map((i,index)=>( <option key={index} value={i.tab2}>{i.tab2}</option>))}
                                                        </select>
                                                    </div>
                                                : null}
                                            </>
                                            : null}
                                        </>
                                    : null}
                                    <div className={"col-sm-12"}>
                                        <label>Create SOP</label>
                                        <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.sop} content= {this.state.sop} onChange={this.onEditorChange1}/>
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

export default UpdateSop