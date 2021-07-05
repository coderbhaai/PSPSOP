import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import moment from "moment"
import { Modal } from 'reactstrap'
const func = require('../parts/functions')
import api from '../parts/api'

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users:                  [],
            currentPage:            1,
            itemsPerPage:           100,
            search:                 '',
            loading:                true,
            changeRoleModel:        false,
            id:                     '',
            name:                   '',
            email:                  '',
            role:                   ''
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({ active: window.location.pathname })
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get(api.userUsers).then(res =>{
            this.setState({ 
                users:              res.data.data,
                loading:            false 
            }) 
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    changeUserStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     parseInt(status)
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`           
        axios.post(api.changeUserStatus, data)
        .then( res=>{
            console.log('res.data', res.data)
            if(res.data.success){
                this.setState({ users: this.state.users.map(x => x.id == res.data.data.id ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    changeRole=(i)=>{
        console.log(`i`, i)
        this.setState({
            changeRoleModel:                true,
            id:                             i.id,
            name:                           i.name,
            email:                          i.email,
            role:                           i.role,
        })
    }

    resetData=()=>{
        this.setState({
            changeRoleModel:                false,
            id:                             '',
            name:                           '',
            email:                          '',
            role:                           '',
        })
    }

    updateRole= (e) => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            role:                           this.state.role
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post(api.updateRole, data)
        .then( res=> {
            if(res.data.success){
                this.setState({ users: this.state.users.map(x => x.id === res.data.data.id ? x= res.data.data : x ) })
                this.resetData()
            }
            func.callSwal(res.data.message)
        })
        .catch(err=>func.printError(err))
    }

    render() {
        console.log('this.state', this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.users.filter((i)=>{ if(this.state.search == null) return i; else if( i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.email.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.name}<br/>{i.email}</td>
                    <td>{
                        i.role =='Org'? 'Admin' :
                        i.role =='User'? 'Employee' :
                        i.role =='Manager'? 'Manager' : i.role
                    }</td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={i.email} onChange={(e)=>this.changeUserStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={i.email}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.changeRole(i)}/></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.users.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })

        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Users)</h1>
                <div className="row">
                    <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <input type="text" placeholder="Search here" className="form-control" onChange={(e)=>this.searchSpace(e)} style={{width:'400px'}}/>
                                <div>
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
                            <table className="table table-hover table-responsive">
                                <thead>
                                <tr>
                                    <td>Sl No.</td>
                                    <td>Name | Email</td>
                                    <td>Role</td>                                              
                                    <td>Date</td>
                                    <td>Status</td>
                                    <td>Change Role</td>
                                </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="5" className="text-center"><img src="/images/icons/loading.gif" className="loading"/></td></tr> : renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                </div>
                <Modal isOpen={this.state.changeRoleModel} className="adminModal"> 
                    <div className="modal-header"><h2>Change Role of User</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                    <form encType="multipart/form-data" onSubmit={this.updateRole}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Name</label>
                                <input type="text" className="form-control" value={this.state.name} readOnly/>
                            </div>
                            <div className="col-sm-4">
                                <label>Email</label>
                                <input type="email" className="form-control" value={this.state.email} readOnly/>
                            </div>
                            <div className="col-sm-4">
                                <label>Change Role</label>
                                <select className="form-control" name="role" value={this.state.role} required onChange={this.onChange}>
                                    <option value=''>Select Role</option>
                                    <option value='Org'>Admin</option>
                                    <option value='User'>Employee</option>
                                    <option value='Manager'>Manager</option>
                                </select>
                            </div>
                            <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default User
