import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'

export class Org extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                           [],
            addOrg:                         false,
            changeOrgModel:                 false,
            name:                           '',
            email:                          '',
            status:                         '',
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
        axios.get('/api/adminOrg').then(res =>{
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
    addOrg = ()=>{ this.setState({  addOrg: true }) }

    changeOrgStatus=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/changeOrgStatus', data)
        .then( res=>{
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    resetData = ()=>{
        this.setState({
            addOrg:                         false,
            changeOrgModel:                 false,
            name:                           '',
            email:                          '',
            id:                             '',
            status:                         '',
        })
    }

    createOrg = (e) => {
        e.preventDefault()
        const data={
            name:                           this.state.name,
            email:                          this.state.email,
            status:                         parseInt( this.state.status ),
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/createOrg', data)
        .then( res=> {
            if(res.data.success){
                this.setState({ data: [...this.state.data, res.data.data ] })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    changeOrg=(i)=>{
        this.setState({ 
            changeOrgModel:             true,
            id:                         i.id,
            name:                       i.name,
            email:                      i.email,
            status:                     i.status,
        })
    }

    updateOrg = (e) => {
        e.preventDefault()
        const data={
            id:                             this.state.id,
            name:                           this.state.name,
            email:                          this.state.email,
            status:                         parseInt( this.state.status ),
        }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/updateOrg', data)
        .then( res=> {
            if(res.data.success){
                this.setState({ data: this.state.data.map(x => x.id === res.data.data.id ? x= res.data.data : x ) })
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else if(i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.email.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td>
                    <td>
                        <div className="onoffswitch">
                            <input type="checkbox" name="category" className="onoffswitch-checkbox" id={'switch-'+i.id} onChange={(e)=>this.changeOrgStatus(i.id, e.target.value)} value={i.status} checked={i.status==1? true : false}/>
                            <label className="onoffswitch-label" htmlFor={'switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                        </div>
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.changeOrg(i)}/></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Organisation)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <div className="btn-pag">
                            <button className="amitBtn" onClick={this.addOrg}>Add Organisation</button>
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
                            {this.state.addOrg?
                                <form encType="multipart/form-data" onSubmit={this.createOrg}>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label>Organisation Name</label>
                                            <input name="name" type="text" className="form-control" placeholder="Add Organisation Name" value={this.state.name} required onChange={this.onChange}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Organisation Email</label>
                                            <input name="email" type="email" className="form-control" placeholder="Add Organisation Email" value={this.state.email} required onChange={this.onChange}/>
                                        </div>
                                        <div className="col-sm-4">
                                            <label>Organisation Status</label>
                                            <select className="form-control" name="status" value={this.state.status} required onChange={this.onChange}>
                                                <option value=''>Select Status</option>
                                                <option value='1'>Active</option>
                                                <option value='0'>Not Active</option>
                                            </select>
                                        </div>
                                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                                        <div className="btn-pag">  
                                            <button className="amitBtn" onClick={this.resetData}>Close Organisation</button>
                                        </div>
                                    </div>
                                </form>
                            : null}
                        </div>
                        <table className="table table-hover table-responsive">
                            <thead><tr><td>Sl No.</td><td>Name</td><td>Email</td><td>Status</td><td>Edit Org</td></tr></thead>
                            <tbody>{this.state.loading? <tr className="loading"><td colSpan="5" className="text-center"><img src="/images/icons/loading.gif" className="loading"/></td></tr> : renderItems}</tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={this.state.changeOrgModel} className="adminModal"> 
                <div className="modal-header"><h2>Add a step Below</h2><div className="closeModal" onClick={this.resetData}>X</div></div>
                <form encType="multipart/form-data" onSubmit={this.updateOrg}>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Organisation Name</label>
                            <input name="name" type="text" className="form-control" placeholder="Add Organisation Name" value={this.state.name} required onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>Organisation Email</label>
                            <input name="email" type="email" className="form-control" placeholder="Add Organisation Email" value={this.state.email} required onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>Organisation Status</label>
                            <select className="form-control" name="status" value={this.state.status} required onChange={this.onChange}>
                                <option value=''>Select Status</option>
                                <option value='1'>Active</option>
                                <option value='0'>Not Active</option>
                            </select>
                        </div>
                        <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                    </div>
                </form>
            </Modal>
        </>
        )
    }
}

export default Org