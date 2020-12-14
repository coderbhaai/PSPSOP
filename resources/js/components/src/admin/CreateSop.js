import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import CKEditor from 'ckeditor4-react'

export class CreateSop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dept:                           [],
            process:                        [],
            subprocess:                     [],
            superprocess:                   [],
            userId:                         '',
            type:                           '',
            sopfor:                         '',
            sop:                            '',
            sopName:                        '',
            sopList:                        [],
            selectedDept:                   '',
            selectedProcess:                  '',
            selectedSubProcess:             '',
            column:                         1,
            loading:                        true
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        window.scrollTo(0, 0)   
        this.callApi()
        if(typeof(Storage) !== "undefined" && JSON.parse(localStorage.getItem('user'))){ this.setState({ userId: JSON.parse(localStorage.getItem('user')).id || '' }) }
        if(window.location.pathname.split('/')[2]){ 
            this.setState({ 
                sopName:             window.location.pathname.split('/')[2].replace(/%20/g, ' '),
                dept:               window.location.pathname.split('/')[2].replace(/%20/g, ' ')
            })
        }
    }

    callApi(){
        axios.get('/api/adminBasic').then(res =>{
            // console.log('res.data', res.data)
            this.setState({ 
                dept:                           res.data.dept,
                process:                        res.data.process,
                subprocess:                     res.data.subprocess,
                superprocess:                   res.data.superprocess,
                loading:                        false
            }) 
        })

        axios.get('/api/sopList'+this.state.userId).then(res =>{
            console.log('res.data', res.data)
            this.setState({ sopList: res.data.sopList}) 
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    onEditorChange1( evt1 ) { this.setState( { sop: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { sop: changeEvent1.target.value } ) }

    submitHandler = e => {
        e.preventDefault()
        const data={
            userId:                         this.state.userId,
            sopfor:                         this.state.sopfor,
            // sop:                            this.state.sop,
        }               
        axios.post('/api/createSop', data)
        .then( res=>{
            console.log('res.data', res.data)
            if(res.data.success){
                localStorage.setItem( 'message', res.data.message )
                // window.location.href = '/admin-sop'
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    changeType=(e)=>{
        this.setState({
            type:                               e.target.value,
            selectedDept:                       '',
            selectedProcess:                    '',
            selectedSubProcess:                 '',
            sopfor:                             '',
            column:                             1

        })
        if(e.target.value =='dept'){ this.setState({ column : 2 }) }
        if(e.target.value =='process'){ this.setState({ column : 3 }) }
        if(e.target.value =='subprocess' || e.target.value =='superprocess'){ this.setState({ column : 4 }) }
    }

    changeDept=(e)=>{
        this.setState({
            selectedDept:             e.target.value,
            selectedProcess:          ''
        })
    }

    changeProcess=(e)=>{
        this.setState({
            selectedProcess:                    e.target.value,
            selectedSubProcess:                 ''
        })
    }

    changeSubProcess=(e)=>{
        this.setState({
            selectedSubProcess:             e.target.value
        })
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
                                <div className={"col-sm-"+12/this.state.column}>
                                    <label>Create Sop For</label>
                                    <select className="form-control" required name="type" onChange={this.changeType} value={this.state.type}>
                                        <option value=''>Select Type</option>
                                        <option value="dept">Department</option>
                                        <option value="process">Process</option>
                                        <option value="subprocess">Sub Process</option>
                                        <option value="superprocess">Super Process</option>
                                    </select>
                                </div>
                                { this.state.type == 'dept'?
                                    <div className={"col-sm-"+12/this.state.column}>
                                        <label>Department Name</label>
                                        <select className="form-control" required name="sopfor" onChange={this.onChange} value={this.state.sopfor}>
                                            <option value=''>Select Department</option>
                                            {this.state.dept.filter((i)=>{ if(!this.state.sopList.some(el => el === i.deptId)){ return i }}).map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                        </select>
                                    </div>
                                : this.state.type == 'process'?
                                    <>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Department Name</label>
                                            <select className="form-control" required name="selectedDept" onChange={this.changeDept} value={this.state.selectedDept}>
                                                <option value=''>Select Department</option>
                                                {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                            </select>
                                        </div>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Process Name</label>
                                            <select className="form-control" required name="sopfor" onChange={this.onChange} value={this.state.sopfor}>
                                                <option value=''>Select Process</option>
                                                {this.state.process.filter((i)=>{ if(i.deptId === this.state.selectedDept && !this.state.sopList.some(el => el === i.processId)){ return i }}).map((i,index)=>( <option key={index} value={i.processId}>{i.process}</option> ))}
                                            </select>
                                        </div>
                                    </>
                                : this.state.type == 'subprocess'? 
                                    <>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Department Name</label>
                                            <select className="form-control" required name="selectedDept" onChange={this.changeDept} value={this.state.selectedDept}>
                                                <option value=''>Select Department</option>
                                                {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                            </select>
                                        </div>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Process Name</label>
                                            <select className="form-control" required name="selectedProcess" onChange={this.changeProcess} value={this.state.selectedProcess}>
                                                <option value=''>Select Process</option>
                                                {this.state.process.filter((i)=>{ if(i.deptId === this.state.selectedDept){ return i }}).map((i,index)=>( <option key={index} value={i.processId}>{i.process}</option> ))}
                                            </select>
                                        </div>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Sub Process Name</label>
                                            <select className="form-control" required name="sopfor" onChange={this.onChange} value={this.state.sopfor}>
                                                <option value=''>Select Process</option>
                                                {this.state.subprocess.filter((i)=>{ if(i.processId === this.state.selectedProcess && !this.state.sopList.some(el => el === i.subprocessId)){ return i }}).map((i,index)=>( <option key={index} value={i.subprocessId}>{i.subprocess}</option> ))}
                                            </select>
                                        </div>
                                    </>
                                : this.state.type == 'superprocess'? 
                                    <>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Department Name</label>
                                            <select className="form-control" required name="selectedDept" onChange={this.changeDept} value={this.state.selectedDept}>
                                                <option value=''>Select Department</option>
                                                {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                            </select>
                                        </div>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Process Name</label>
                                            <select className="form-control" required name="selectedProcess" onChange={this.changeProcess} value={this.state.selectedProcess}>
                                                <option value=''>Select Process</option>
                                                {this.state.process.filter((i)=>{ if(i.deptId === this.state.selectedDept){ return i }}).map((i,index)=>( <option key={index} value={i.processId}>{i.process}</option> ))}
                                            </select>
                                        </div>
                                        <div className={"col-sm-"+12/this.state.column}>
                                            <label>Sub Process Name</label>
                                            <select className="form-control" required name="selectedSubProcess" onChange={this.changeSubProcess} value={this.state.selectedSubProcess}>
                                                <option value=''>Select Process</option>
                                                {this.state.subprocess.filter((i)=>{ if(i.processId === this.state.selectedProcess){ return i }}).map((i,index)=>( <option key={index} value={i.subprocessId}>{i.subprocess}</option> ))}
                                            </select>
                                        </div>
                                        <div className="col-sm-12">
                                            <label>Super Process Name</label>
                                            <select className="form-control" required name="sopfor" onChange={this.onChange} value={this.state.sopfor}>
                                                <option value=''>Select Process</option>
                                                {this.state.superprocess.filter((i)=>{ if(i.subprocessId === this.state.selectedProcess && !this.state.sopList.some(el => el === i.superprocessId)){ return i }}).map((i,index)=>( <option key={index} value={i.superprocessId}>{i.superprocess}</option> ))}
                                            </select>
                                        </div>
                                    </>
                                : null}
                                {/* <div className="col-sm-12">
                                    <label>Create SOP</label>
                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.sop} onChange={this.onEditorChange1} />
                                </div> */}
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
