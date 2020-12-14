import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'
import moment from "moment"


export class Basics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dept:                           [],
            process:                        [],
            subprocess:                     [],
            superprocess:                   [],
            addmodalIsOpen:                 false,
            editmodalIsOpen:                false,
            userId:                         '',
            type:                           '',
            tab1:                           '',
            tab2:                           '',
            tab3:                           '',
            tab4:                           '',
            id:                             '',
            loading:                        true
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){
            this.setState({
                userId: JSON.parse(localStorage.getItem('user')).id || ''
            })
        }
        this.callApi()
    }

    callApi(){
        axios.get('/api/adminBasic').then(res =>{
            this.setState({ 
                dept:                           res.data.dept,
                process:                        res.data.process,
                subprocess:                     res.data.subprocess,
                superprocess:                   res.data.superprocess,
                loading: false 
            }) 
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:                 false,
            editmodalIsOpen:                false,
            type:                           '',
            id:                             '',
            type:                           '',
            tab1:                           '',
            tab2:                           '',
            tab3:                           '',
            tab4:                           '',
        })
    }

    addModal = (e) => {
        e.preventDefault()
        const data={
            userId:             this.state.userId,
            type:               this.state.type,
            tab1:               this.state.tab1,
            tab2:               this.state.tab2,
            tab3:               this.state.tab3,
            tab4:               this.state.tab4,
        }
        axios.post('/api/createBasic', data)
        .then( res=> {
            if(res.data.success){
                if(this.state.type=='dept'){ this.setState({ dept: [...this.state.dept, res.data.data ] }) }
                if(this.state.type=='process'){ this.setState({ process: [...this.state.process, res.data.data ] }) }
                if(this.state.type=='subprocess'){ this.setState({ subprocess: [...this.state.subprocess, res.data.data ] }) }
                if(this.state.type=='superprocess'){ this.setState({ superprocess: [...this.state.superprocess, res.data.data ] }) }
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }
    
    editModalOn = (i)=>{
        this.setState({ type: i.type })
        if(i.type=='dept'){
            this.setState({
                editmodalIsOpen:                true,
                id:                             parseInt( i.deptId ),
                typeName:                       'Department',
                tab1:                           i.department
            })
        }
        if(i.type=='process'){
            this.setState({
                editmodalIsOpen:                true,
                id:                             parseInt( i.processId ),
                typeName:                       'Process',
                tab1:                           parseInt( i.deptId ),
                tab2:                           i.process
            })
        }
        if(i.type=='subprocess'){
            this.setState({
                editmodalIsOpen:                true,
                id:                             parseInt( i.subprocessId ),
                typeName:                       'Sub Process',
                tab1:                           parseInt( i.deptId ),
                tab2:                           parseInt( i.processId ),
                tab3:                           i.subprocess
            })
        }
        if(i.type=='superprocess'){
            this.setState({
                editmodalIsOpen:                true,
                id:                             parseInt( i.superprocessId ),
                typeName:                       'Super Process',
                tab1:                           parseInt( i.deptId ),
                tab2:                           parseInt( i.processId ),
                tab3:                           parseInt( i.subOrSuperId ),
                tab4:                           i.superprocess
            })
        }
    }

    updateModal = (e) => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            type:                           this.state.type,
            tab1:                           this.state.tab1,
            tab2:                           this.state.tab2,
            tab3:                           this.state.tab3,
            tab4:                           this.state.tab4
        }
        axios.post('/api/updateBasic', data)
        .then( res=> {
            if(res.data.success){
                if(this.state.type =='dept'){ this.setState({ dept: this.state.dept.map(x => x.deptId === res.data.data.deptId ? x= res.data.data : x ) }) }
                if(this.state.type==='process'){ this.setState({ process: this.state.process.map(x => x.processId === res.data.data.processId ? x= res.data.data : x ) }) }
                if(this.state.type==='subprocess'){ this.setState({ subprocess: this.state.subprocess.map(x => x.subprocessId === res.data.data.subprocessId ? x= res.data.data : x ) }) }
                if(this.state.type==='superprocess'){ this.setState({ superprocess: this.state.superprocess.map(x => x.superprocessId === res.data.data.superprocessId ? x= res.data.data : x ) }) }
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    changeType=(e)=>{
        this.setState({
            type:                           e.target.value,
            tab1:                           '',
            tab2:                           '',
            tab3:                           '',
            tab4:                           '',
        })
    }

    changeDept=(e)=>{
        this.setState({
            tab1:                           e.target.value,
            tab2:                           '',
            tab3:                           '',
            tab4:                           '',
        })
    }

    changeProcess=(e)=>{
        this.setState({
            tab2:                           e.target.value,
            tab3:                           '',
            tab4:                           '',
        })
    }

    changeSubProcess=(e)=>{
        this.setState({
            tab3:                           e.target.value,
            tab4:                           '',
        })
    }

    changeActive=(id)=>{
        console.log('id', id)
    }

    render() {
        return (
            <>
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Basics)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                    {this.state.loading? <div className="loading"><img src="/images/icons/loading.gif"/></div> :<>
                        <div className="btn-pag">  
                            <button className="amitBtn" onClick={this.addModalOn}>Add Basics</button>
                        </div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" onClick={()=>this.changeActive('dept')}><a className="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true"><h3>Department</h3></a></li>
                            <li className="nav-item" onClick={()=>this.changeActive('process')}><a className="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false"><h3>Process</h3></a></li>
                            <li className="nav-item" onClick={()=>this.changeActive('subprocess')}><a className="nav-link" id="tab3-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false"><h3>Sub Process</h3></a></li>
                            <li className="nav-item" onClick={()=>this.changeActive('superprocess')}><a className="nav-link" id="tab4-tab" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false"><h3>Super Process</h3></a></li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                                <table className="table table-hover table-responsive">
                                    <thead><tr><td>Sl No.</td><td>Type</td><td>Department Name</td><td>Date</td><td>Action</td></tr></thead>
                                    <tbody>
                                        {this.state.dept.map((i,index)=>(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>Department</td>
                                                <td>{i.department}</td>
                                                <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                                                <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editModalOn(i)}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                                <table className="table table-hover table-responsive">
                                    <thead><tr><td>Sl No.</td><td>Type</td><td>Department</td><td>Process Name</td><td>Date</td><td>Action</td></tr></thead>
                                    <tbody>
                                        {this.state.process.map((i,index)=>(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>Process</td>
                                                <td>{i.dept? i.dept.department : null}</td>
                                                <td>{i.process}</td>
                                                <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                                                <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editModalOn(i)}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                                <table className="table table-hover table-responsive">
                                    <thead><tr><td>Sl No.</td><td>Type</td><td>Department</td><td>Process Name</td><td>Sub Process Name</td><td>Date</td><td>Action</td></tr></thead>
                                    <tbody>
                                        {this.state.subprocess.map((i,index)=>(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>Sub Process</td>
                                                <td>{i.dept? i.dept.department : null}</td>
                                                <td>{i.process? i.process.process : null}</td>
                                                <td>{i.subprocess}</td>
                                                <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                                                <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editModalOn(i)}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
                                <table className="table table-hover table-responsive">
                                    <thead><tr><td>Sl No.</td><td>Type</td><td>Department</td><td>Process Name</td><td>Sub Process</td><td>Super Process</td><td>Date</td><td>Action</td></tr></thead>
                                    <tbody>
                                        {this.state.superprocess.map((i,index)=>(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>Super Process</td>
                                                <td>{i.department}</td>
                                                <td>{i.processName}</td>
                                                <td>
                                                    {i.subOrSuper? 
                                                        <>
                                                            {i.subOrSuper.finalSuper?
                                                            <>
                                                                { i.subOrSuper.finalSuper.type=='subprocess'? <>{'Sub Process - '+ i.subOrSuper.finalSuper.subOrSuper}</> :<>{'Super Process - '+i.subOrSuper.finalSuper.superprocess}</>}
                                                            </>
                                                            : null}
                                                        </>
                                                    :null}
                                                </td>
                                                <td>{i.superprocess}</td>
                                                <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                                                <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editModalOn(i)}/></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>}
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                <div className="modal-header"><h2>Add Basics Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.addModal}>
                    <div className="row">
                        <div className=
                            {
                                this.state.type=='dept' || this.state.type=='process' || this.state.type=='subprocess'? "col-sm-4" : 
                                this.state.type=='superprocess' ? "col-sm-3" :
                                "col-sm-12"
                            }>
                            <label>Type of Basic</label>
                            <select className="form-control" required name="type" onChange={this.changeType} value={this.state.type}>
                                <option value=''>Select Type</option>
                                <option value="dept">Department</option>
                                <option value="process">Process</option>
                                <option value="subprocess">Sub Process</option>
                                <option value="superprocess">Super Process</option>
                            </select>
                        </div>
                        {this.state.type?
                            <>
                                {this.state.type == 'dept'?
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        <input name="tab1" type="text" className="form-control" placeholder="Department Name" value={this.state.tab1} required onChange={this.onChange}/>
                                    </div>
                                : this.state.type == 'process'?
                                <>
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        <select className="form-control" required name="tab1" onChange={this.changeDept} value={this.state.tab1}>
                                            <option value=''>Select Department</option>
                                            {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Process Name</label>
                                        <input name="tab2" type="text" className="form-control" placeholder="Process Name" value={this.state.tab2} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : this.state.type == 'subprocess'?
                                <>
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        <select className="form-control" required name="tab1" onChange={this.changeDept} value={this.state.tab1}>
                                            <option value=''>Select Department</option>
                                            {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Process Name</label>
                                        <select className="form-control" required name="tab2" onChange={this.changeProcess} value={this.state.tab2}>
                                            <option value=''>Select Process</option>
                                            {this.state.process.filter((i)=>{ if(i.deptId === this.state.tab1){ return i }}).map((i,index)=>( <option key={index} value={i.processId}>{i.process}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Sub Process Name</label>
                                        <input name="tab3" type="text" className="form-control" placeholder="Sub Process Name" value={this.state.tab3} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : this.state.type == 'superprocess'?
                                <>
                                    <div className="col-sm-3">
                                        <label>Department Name</label>
                                        <select className="form-control" required name="tab1" onChange={this.changeDept} value={this.state.tab1}>
                                            <option value=''>Select Department</option>
                                            {this.state.dept.map((i,index)=>( <option key={index} value={i.deptId}>{i.department}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Process Name</label>
                                        <select className="form-control" required name="tab2" onChange={this.changeProcess} value={this.state.tab2}>
                                            <option value=''>Select Process</option>
                                            {this.state.process.filter((i)=>{ if(i.deptId === this.state.tab1){ return i }}).map((i,index)=>( <option key={index} value={i.processId}>{i.process}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Sub Process Name</label>
                                        <select className="form-control" required name="tab3" onChange={this.changeSubProcess} value={this.state.tab3}>
                                            <option value=''>Select Sub Process</option>
                                            {this.state.subprocess.map((i,index)=>( <option key={index} value={i.subprocessId}>{i.subprocess}</option> ))}
                                            {this.state.superprocess.map((i,index)=>( <option key={index} value={i.superprocessId}>{i.superprocess}</option> ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Super Process Name</label>
                                        <input name="tab4" type="text" className="form-control" placeholder="Super Process Name" value={this.state.tab4} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : null }
                            </>
                        : null}
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                <div className="modal-header"><h2>Update Basics Here</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.updateModal}>
                    <div className="row">
                        <div className=
                            {
                                this.state.type=='dept' || this.state.type=='process' || this.state.type=='subprocess'? "col-sm-4" : 
                                this.state.type=='superprocess' ? "col-sm-3" :
                                "col-sm-12"
                            }>
                            <label>Type of Basic</label>
                            <input className="form-control" value={this.state.typeName} readOnly/>
                        </div>
                        {this.state.type?
                            <>
                                {this.state.type == 'dept'?
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        <input name="tab1" type="text" className="form-control" placeholder="Department Name" value={this.state.tab1} required onChange={this.onChange}/>
                                    </div>
                                : this.state.type == 'process'?
                                <>
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        {this.state.dept.filter((i)=>{ if(i.deptId === this.state.tab1 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.department} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Process Name</label>
                                        <input name="tab2" type="text" className="form-control" placeholder="Process Name" value={this.state.tab2} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : this.state.type == 'subprocess'?
                                <>
                                    <div className="col-sm-4">
                                        <label>Department Name</label>
                                        {this.state.dept.filter((i)=>{ if(i.deptId === this.state.tab1 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.department} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-4">
                                        <label>Process Name</label>
                                        {this.state.process.filter((i)=>{ if(i.processId === this.state.tab2 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.process} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Sub Process Name</label>
                                        <input name="tab3" type="text" className="form-control" placeholder="Sub Process Name" value={this.state.tab3} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : this.state.type == 'superprocess'?
                                <>
                                    <div className="col-sm-3">
                                        <label>Department Name</label>
                                        {this.state.dept.filter((i)=>{ if(i.deptId === this.state.tab1 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.department} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Process Name</label>
                                        {this.state.process.filter((i)=>{ if(i.processId === this.state.tab2 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.process} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-3">
                                        <label>Sub Process Name</label>
                                        {this.state.subprocess.filter((i)=>{ if(i.subprocessId === this.state.tab3 ){ return i }}).map((i,index)=>( <input key={index} className="form-control" value={i.subprocess} readOnly/> ))}
                                    </div>
                                    <div className="col-sm-12">
                                        <label>Super Process Name</label>
                                        <input name="tab4" type="text" className="form-control" placeholder="Super Process Name" value={this.state.tab4} required onChange={this.onChange}/>
                                    </div>
                                </>
                                : null }
                            </>
                        : null}
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>
        </>
        )
    }
}

export default Basics