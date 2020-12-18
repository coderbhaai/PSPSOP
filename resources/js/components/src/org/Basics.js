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
            step:                           '',
            head:                           '',
            name:                           '',
            id:                             '',
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
            console.log('res.data.data', res.data.data[5].order)
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

    changeBasicStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }               
        axios.post('/api/changeBasicStatus', data)
        .then( res=>{
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    addDepartment = ()=>{ 
        this.setState({ 
            addDepartment:          true,
            step:                   0,
            head:                   0
        })
    }

    addProcess = (i)=>{ 
        this.setState({ 
            editmodalIsOpen:            true,
            step:                       i.step+1,
            head:                       i.id
        })
    }

    resetData = ()=>{
        this.setState({
            addDepartment:                  false,
            editmodalIsOpen:                false,
            changeNameModel:                false,
            step:                           '',
            head:                           '',
            name:                           '',
            id:                             '',
        })
    }

    createBasic = (e) => {
        e.preventDefault()
        const data={
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

    render() {
        // console.log('this.state', this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        {i.order.map((j,index2)=>( <span key={index2}>{index2!== i.order.length-1 ? j+' => ' : j }</span>))}
                    </td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={index} onChange={(e)=>this.changeBasicStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={index}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
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
                    {this.state.loading? <div className="loading"><img src="/images/icons/loading.gif"/></div> :<>
                        <div className="btn-pag">
                            <button className="amitBtn" onClick={this.addDepartment}>Add Department</button>
                            <div>
                            <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{width:'400px'}}/>
                                <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                    <option>{itemsPerPage}</option>
                                    <option value="10">10</option> 
                                    <option value="25">25</option> 
                                    <option value="50">50</option> 
                                    <option value="100">100</option> 
                                </select>
                                <div><ul className="page-numbers">{renderPagination}</ul></div>
                            </div>
                        </div>
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
                        <table className="table table-hover table-responsive">
                            <thead><tr><td>Sl No.</td><td>Hierarchy</td><td>Date</td><td>Status</td><td>Add a step</td><td>Change name</td></tr></thead>
                            <tbody>{renderItems}</tbody>
                        </table>
                    </>}
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
        </>
        )
    }
}

export default Basics