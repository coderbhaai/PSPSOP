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
            data:                           [],
            addDepartment:                  false,
            addProcess:                     false,
            changeNameModel:                false,
            uploadSopModel:                 false,
            updateSopModel:                 false,
            sopfor:                         '',
            step:                           '',
            head:                           '',
            name:                           '',
            id:                             '',
            image:                          null,
            loading:                        true,
            currentPage:                    1,
            itemsPerPage:                   100,
            search:                         '',
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" && localStorage.getItem('user') ){
            this.setState({ orgId: JSON.parse(localStorage.getItem('user')).id || '' })
        }
        this.callApi()
    }

    callApi(){
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get('/api/userBasic').then(res =>{
            console.log('res.data', res.data)
            this.setState({ 
                data:                           res.data.data,
                loading: false 
            }) 
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    coverImage = (e) =>{ this.setState({ image: e.target.files[0] }) }
    changeBasicStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }   
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`     
        axios.post('/api/changeBasicStatus', data)
        .then( res=>{
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    uploadFile=(i)=>{
        console.log('i', i)
        this.setState({ 
            uploadSopModel:         true,
            sopfor:                 i.id
        })
    }

    updateFile=(i)=>{
        console.log('i', i)
        this.setState({ 
            updateSopModel:         true,
            sopfor:                 i.id,
            oldFile:                i.sop
        })
    }

    addDepartment = ()=>{ 
        this.setState({ 
            addDepartment:          true,
            step:                   0,
            head:                   0,
            dept:                   0
        })
    }

    addProcess = (i)=>{ 
        console.log('i', i)
        this.setState({ 
            editmodalIsOpen:            true,
            step:                       parseInt(i.step)+1,
            head:                       i.id,
            dept:                       i.dept
        })
    }

    resetData = ()=>{
        this.setState({
            addDepartment:                  false,
            editmodalIsOpen:                false,
            changeNameModel:                false,
            uploadSopModel:                 false,
            updateSopModel:                 false,
            sopfor:                         '',
            step:                           '',
            head:                           '',
            name:                           '',
            id:                             '',
            image:                          null
        })
    }

    createBasic = (e) => {
        e.preventDefault()
        const data={
            dept:                           this.state.dept,
            step:                           this.state.step,
            head:                           this.state.head,
            name:                           this.state.name,
            status:                         1,
        }
        axios.post('/api/createBasic', data)
        .then( res=> {
            if(res.data.success){
                this.setState({ data: [...this.state.data, res.data.data ] })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    changeName=(i)=>{
        this.setState({ 
            changeNameModel:            true,
            id:                         i.id,
            name:                       i.name
        })
    }

    updateBasic = (e) => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            name:                           this.state.name
        }
        axios.post('/api/updateBasic', data)
        .then( res=> {
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === res.data.data.id ? x= res.data.data : x ) })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    uploadSop=(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.image)
        data.append('sopfor', this.state.sopfor)
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/uploadSop', data)
        .then( res=> {
            console.log('res', res)
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === res.data.data.id ? x= res.data.data : x ) })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    updateSop=(e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.image)
        data.append('sopfor', this.state.sopfor)
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/updateSopFile', data)
        .then( res=> {
            console.log('res', res)
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === res.data.data.id ? x= res.data.data : x ) })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    render() {
        console.log('this.state', this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data
        // .filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }})
        .slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {/* {i.order.map((j,index2)=>( <span key={index2}>{index2!== i.order.length-1 ? j+' => ' : j }</span>))} */}
                    </td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.changeBasicStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.addProcess(i)}/></td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.changeName(i)}/></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Basics)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <div className="accordion" id="accordionExample">
                            { this.state.data.filter((i)=>{ if( i.step == 0 ) return i; }).map((i,index)=>(
                                <div className="card" key={index}>
                                    <div className="card-header" id={"heading-"+i.id}>
                                        <h2 className="mb-0"><button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#head-"+i.id} aria-expanded="true" aria-controls={"head-"+i.id}>{i.name}</button></h2>
                                    </div>
                                    <div id={"head-"+i.id} className="collapse" aria-labelledby={"heading-"+i.id} data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="accordion" id="accordionExample2">
                                                { this.state.data.filter((el)=>{ if( el.step == 1 && el.head == i.id ) return i; }).map((j,index)=>( 
                                                    <div className="card" key={index}>
                                                        <div className="card-header" id={"heading2-"+j.id}>
                                                            <h2 className="mb-0"><button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#step1"+j.id} aria-expanded="true" aria-controls={"step1"+j.id}>{j.name}</button></h2>
                                                        </div>
                                                        <div id={"step1"+j.id} className="collapse" aria-labelledby={"heading2-"+j.id} data-parent="#accordionExample2">
                                                            <div className="card-body">
                                                                <div className="accordion" id="accordionExample3">
                                                                    { this.state.data.filter((el)=>{ if( el.step == 2 && el.head == j.id ) return i; }).map((k,index)=>( 
                                                                        <div className="card" key={index}>
                                                                            <div className="card-header" id={"heading2-"+k.id}>
                                                                                <h2 className="mb-0"><button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#step2"+k.id} aria-expanded="true" aria-controls={"step1"+k.id}>{k.name}</button></h2>
                                                                            </div>
                                                                            <div id={"step2"+k.id} className="collapse" aria-labelledby={"heading2-"+k.id} data-parent="#accordionExample3">
                                                                                <div className="card-body">
                                                                                    <div className="accordion" id="accordionExample4">
                                                                                        { this.state.data.filter((el)=>{ if( el.step == 3 && el.head == k.id ) return i; }).map((l,index)=>( 
                                                                                            <div className="card" key={index}>
                                                                                                <div className="card-header" id={"heading3-"+k.id}>
                                                                                                    <h2 className="mb-0"><button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#step3"+l.id} aria-expanded="true" aria-controls={"step3"+l.id}>{l.name}</button></h2>
                                                                                                </div>
                                                                                                <div id={"step3"+l.id} className="collapse" aria-labelledby={"heading3-"+l.id} data-parent="#accordionExample4">
                                                                                                    <div className="card-body">
                                                                                                        <div className="accordion" id="accordionExample5">
                                                                                                            { this.state.data.filter((el)=>{ if( el.step == 4 && el.head == l.id ) return i; }).map((m,index)=>( 
                                                                                                                <div className="card" key={index}>
                                                                                                                    <div className="card-header" id={"heading4-"+k.id}>
                                                                                                                        <h2 className="mb-0"><button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target={"#step4"+m.id} aria-expanded="true" aria-controls={"step4"+m.id}>{m.name}</button></h2>
                                                                                                                    </div>
                                                                                                                    <div id={"step4"+m.id} className="collapse" aria-labelledby={"heading4-"+m.id} data-parent="#accordionExample5">
                                                                                                                        <div className="card-body">
                                                                                                                            { m.sop != null ? 
                                                                                                                                <>
                                                                                                                                    <a target="_blank" href={"/psp/storage/app/public/sop/"+m.sop}><button className="amitBtn" style={{marginRight: '1em'}}>Download SOP</button></a>
                                                                                                                                    <button onClick={()=>this.updateFile(m)} className="amitBtn">Update SOP</button>
                                                                                                                                </>
                                                                                                                                : 
                                                                                                                                <button onClick={()=>this.uploadFile(m)} className="amitBtn">Upload SOP</button> 
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                            <div className="text-center"><img onClick={()=>this.addProcess(l)} src="/images/icons/blue-plus.svg" className="plusBtn"/></div>
                                                                                                            {/* <button onClick={()=>this.addProcess(l)} className="amitBtn">Add Another Step</button> */}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                        <div className="text-center"><img onClick={()=>this.addProcess(k)} src="/images/icons/blue-plus.svg" className="plusBtn"/></div>
                                                                                        {/* <button onClick={()=>this.addProcess(k)} className="amitBtn">Add Another Step</button> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    <div className="text-center"><img onClick={()=>this.addProcess(j)} src="/images/icons/blue-plus.svg" className="plusBtn"/></div>
                                                                    {/* <button onClick={()=>this.addProcess(j)} className="amitBtn">Add Another Step</button> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="text-center"><img onClick={()=>this.addProcess(i)} src="/images/icons/blue-plus.svg" className="plusBtn"/></div>
                                                {/* <button onClick={()=>this.addProcess(i)} className="amitBtn">Add Another Step</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="amitBtn" onClick={this.addDepartment}>Add Department</button>
                        <div>
                            {this.state.addDepartment?
                                <form encType="multipart/form-data" onSubmit={this.createBasic}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label>Department Name</label>
                                            <input name="name" type="text" className="form-control" placeholder="Add Department Name" value={this.state.name} required onChange={this.onChange}/>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                        <div className="btn-pag">  
                                            <button className="amitBtn" onClick={this.resetData}>Close Department</button>
                                        </div>
                                    </div>
                                </form>
                            : null}
                        </div>

                        {/* <div className="accordion userModel">
                            <div className="accordion-group">
                                <div className="accordion-heading area">
                                    { this.state.data.filter((i)=>{ if( i.step == 0 ) return i; }).map((i,index)=>(
                                        <div key={index}>
                                            <a className="accordion-toggle" data-toggle="collapse" href={"#head-"+i.id}>{i.name}</a> 
                                            <div className="accordion-body collapse card" id={"head-"+i.id} key={index}>
                                                <div className="accordion-inner">
                                                    <div className="accordion" style={{paddingLeft: '1em'}}>
                                                        { this.state.data.filter((el)=>{ if( el.step == 1 && el.head == i.id ) return i; }).map((j,index)=>( 
                                                            <div className="accordion-group" key={index}>
                                                                <div className="accordion-heading equipamento">
                                                                    <a className="accordion-toggle" data-parent={"#step1"+j.id} data-toggle="collapse" href={"#step1"+j.id}>{j.name}</a>
                                                                </div>            
                                                                <div className="accordion-body collapse card" id={"step1"+j.id}>
                                                                    <div className="accordion-inner">
                                                                        <div className="accordion flex-h" style={{paddingLeft: '1em'}}>
                                                                            { this.state.data.filter((el)=>{ if( el.step == 2 && el.head == j.id ) return i; }).map((k,index)=>( 
                                                                                <div className="accordion-group" key={index}>
                                                                                    <div className="accordion-heading ponto">
                                                                                        <a className="accordion-toggle" data-parent={"#step2"+k.id} data-toggle="collapse" href={"#step2"+k.id}>{k.name}</a>
                                                                                    </div>
                                                                                    <div className="accordion-body collapse card" id={"step2"+k.id}>
                                                                                        <div className="accordion-inner">
                                                                                            <div className="accordion" style={{paddingLeft: '1em'}}>
                                                                                                { this.state.data.filter((el)=>{ if( el.step == 3 && el.head == k.id ) return i; }).map((l,index)=>( 
                                                                                                    <div className="accordion-group" key={index}>
                                                                                                        <div className="accordion-heading ponto">
                                                                                                            <a className="accordion-toggle" data-parent={"#step3"+l.id} data-toggle="collapse" href={"#step3"+l.id}>{l.name}</a>
                                                                                                        </div>
                                                                                                        <div className="accordion-body collapse card" id={"step3"+l.id}>
                                                                                                            <div className="accordion-inner">
                                                                                                                <div className="accordion" style={{paddingLeft: '1em'}}>
                                                                                                                    { this.state.data.filter((el)=>{ if( el.step == 4 && el.head == l.id ) return i; }).map((m,index)=>( 
                                                                                                                        <div className="accordion-group" key={index}>
                                                                                                                            <div className="accordion-heading ponto">
                                                                                                                                <a className="accordion-toggle" data-parent={"#step4"+m.id} data-toggle="collapse" href={"#step4"+m.id}>{m.name}</a>
                                                                                                                            </div>
                                                                                                                            <div className="accordion-body collapse card" id={"step4"+m.id}>
                                                                                                                                <div className="accordion-inner">
                                                                                                                                    { m.sop != null ? 
                                                                                                                                        <>
                                                                                                                                            <a target="_blank" href={"/storage/sop/"+m.sop}><button className="amitBtn">Download SOP</button></a>
                                                                                                                                            <button onClick={()=>this.updateFile(m)} className="amitBtn">Update SOP</button>
                                                                                                                                        </>
                                                                                                                                        : 
                                                                                                                                        <button onClick={()=>this.uploadFile(m)} className="amitBtn">Upload SOP</button> 
                                                                                                                                    }
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    ))}
                                                                                                                </div>
                                                                                                                <button onClick={()=>this.addProcess(l)} className="amitBtn">Add Another Step</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                            <button onClick={()=>this.addProcess(k)} className="amitBtn">Add Another Step</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <button onClick={()=>this.addProcess(j)} className="amitBtn">Add Another Step</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <button onClick={()=>this.addProcess(i)} className="amitBtn">Add Another Step</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>

            <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                <div className="modal-header"><h2>Add a step Below</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.createBasic}>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Add another step</label>
                            <input name="name" type="text" className="form-control" placeholder="Add Department Name" value={this.state.name} required onChange={this.onChange}/>
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={this.state.changeNameModel} className="adminModal"> 
                <div className="modal-header"><h2>Add a step Below</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.updateBasic}>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Process name</label>
                            <input name="name" type="text" className="form-control" placeholder="Add Department Name" value={this.state.name} required onChange={this.onChange}/>
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={this.state.uploadSopModel} className="adminModal"> 
                <div className="modal-header"><h2>Upload SOP</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.uploadSop}>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Upload Sop</label>
                            <input className="form-control" type="file" onChange={this.coverImage}/>
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={this.state.updateSopModel} className="adminModal"> 
                <div className="modal-header"><h2>Upload SOP</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.updateSop}>
                    <div className="row">
                        <div className="col-sm-12">
                            <label>Update Sop</label>
                            <input className="form-control" type="file" onChange={this.coverImage}/>
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>
        </>
        )
    }
}

export default Basics