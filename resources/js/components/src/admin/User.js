import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import moment from "moment"

export class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users:                  [],
            currentPage:            1,
            itemsPerPage:           100,
            search:                 '',
            loading:                true,
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({ active: window.location.pathname })
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get('/api/adminUsers').then(res =>{
            console.log('res.data', res.data)
            this.setState({ 
                users:                  res.data.data,
                loading:                false,
            }) 
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }

    makeOrgAdmin=(id, value)=>{
        if(value == 1){ var role = 'User' }else{ var role = 'Org'}
        console.log('value, role', value, role)

        const data={
            id:                         id,
            role:                       role
        }        
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.post('/api/makeOrgAdmin', data)
        .then( res=>{
            if(res.data.success){
                this.setState({ users: this.state.users.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    changeUserStatusByAdmin=(id, value)=>{
        if(value == 1){ var status = 0 }else{ var status = 1}
        const data={
            id:                         id,
            status:                     status
        }               
        axios.post('/api/changeUserStatusByAdmin', data)
        .then( res=>{
            console.log('res.data', res.data)
            if(res.data.success){
                this.setState({ users: this.state.users.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.message)
        })
        .catch(err=>console.log('err', err))
    }

    render() {
        console.log('this.state', this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.users.filter((i)=>{ if(this.state.search == null) return i; else if(i.org.toLowerCase().includes(this.state.search.toLowerCase()) || i.name.toLowerCase().includes(this.state.search.toLowerCase()) || i.role.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.orgName}<br/>{i.orgStatus==1? 'Approved': 'Not Approved'}</td>
                    <td>{i.name}<br/>{i.email}</td>
                    <td>{i.role=='Org'? 'Org Admin' : i.role}</td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td>{i.userStatus==1? 'Approved' : 'Not Approved'}</td>
                    <td>
                        {i.role != 'Admin'?
                            <div className="onoffswitch">
                                <input type="checkbox" name="category" className="onoffswitch-checkbox" id={'Switch-'+i.id} onChange={(e)=>this.makeOrgAdmin(i.id, e.target.value)} value={i.role=='Org'? 1 : 0} checked={i.role=='Org'? true : false}/>
                                <label className="onoffswitch-label" htmlFor={'Switch-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                            </div>
                        :null}
                    </td>
                    <td>
                        {i.role != 'Admin'?
                            <div className="onoffswitch">
                                <input type="checkbox" name="user" className="onoffswitch-checkbox" id={'Switch2-'+i.id} onChange={(e)=>this.changeUserStatusByAdmin(i.id, e.target.value)} value={i.userStatus} checked={i.userStatus==1? true : false}/>
                                <label className="onoffswitch-label" htmlFor={'Switch2-'+i.id}><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
                            </div>
                        :null}
                    </td>
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
                                    <td>Organisation</td>
                                    <td>Name | Email</td>
                                    <td>Role</td>                                              
                                    <td>Date</td>
                                    <td>Status</td>
                                    <td>Make Admin of Org</td>
                                    <td>User Status</td>
                                </tr>
                                </thead>
                                <tbody>{this.state.loading? <tr className="loading"><td colSpan="7" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                </div>
            </div>
        )
    }
}

export default User
