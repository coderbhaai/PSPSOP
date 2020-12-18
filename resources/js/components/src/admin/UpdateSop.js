import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import CKEditor from 'ckeditor4-react'

export class UpdateSop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sopfor:                         '',
            sop:                            '',
            loading:                        true,
            order:                          [],
            sopForName:                     ''
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){ window.scrollTo(0, 0)  }
    getSop=()=>{
        if(this.state.loading){
            const url = window.location.href.split("/").pop();
            const token = JSON.parse(localStorage.getItem('access_token'))
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            axios.get('/api/getSop/'+url).then(res =>{
                console.log('res.data.data', res.data.data)
                this.setState({ 
                    sopfor:                         parseInt( url ),
                    sop:                            res.data.data.sop,
                    order:                          res.data.data.order,
                    sopForName:                     res.data.data.sopForName,
                    loading:                        false 
                }) 
            })
        }
    }

    ckEditorReady=()=>{ this.getSop() }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    onEditorChange1( evt1 ) { this.setState( { sop: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { sop: changeEvent1.target.value } ) }

    submitHandler = e => {
        e.preventDefault()
        const data={
            sopfor:                         this.state.sopfor,
            sop:                            this.state.sop,
        }               
        axios.post('/api/updateSop', data)
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
                <h1 className="heading">Admin Panel (Update SOP)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-sm-12 my-5">
                                    {this.state.order.length ? <span>Update SOP for </span> : null}
                                    {this.state.order.map((i,index)=>( <span key={index}>{index!== this.state.order.length-1 ? i+' => ' : <strong>{i}</strong> }</span>))}
                                </div>
                                <div className={"col-sm-12"}>
                                    <label>Update SOP</label>
                                    <CKEditor onInstanceReady={this.ckEditorReady()} onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.sop} content= {this.state.sop} onChange={this.onEditorChange1}/>
                                </div>
                                <div className="my-div"><button className="amitBtn" type="submit">Update SOP</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateSop