import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'

export class Sop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:                           [],
            currentPage:                    1,
            itemsPerPage:                   100,
            search:                         '',
            addmodalIsOpen:                 false,
            editmodalIsOpen:                false,
            userId:                         '',
            loading:                        true
        }
    } 
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi(){
        if(typeof(Storage) !== "undefined"){ var userId = JSON.parse(localStorage.getItem('user')).id || '' }
        const token = JSON.parse(localStorage.getItem('access_token'))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        axios.get('/api/sopList').then(res =>{
            this.setState({ 
                data: res.data.data,
                loading: false
            })
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else 
            if( i.sopForName.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{i.order.map((j,index2)=>( <span key={index2}>{index2!== i.order.length-1 ? j+' => ' : <strong>{j}</strong> }</span>))}</td>
                    <td className="editIcon text-center"><a href={"/updateSop/"+i.sopfor}><img src="/images/icons/edit.svg"/></a></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (SOP)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <div className="btn-pag">  
                            <a href="/createSop" className="amitBtn">Create Sop</a>
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
                        <table className="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <td>Sl No.</td>
                                <td>SOP For</td>
                                <td>Update SOP</td>
                            </tr>
                            </thead>
                            <tbody>{this.state.loading? <tr className="loading"><td colSpan="3" className="text-center"><img src="/images/icons/loading.gif"/></td></tr> : renderItems}</tbody>
                        </table>
                        <ul className="page-numbers">{renderPagination}</ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sop