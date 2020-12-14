import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'
import { Modal } from 'reactstrap'

export class Usermodel extends Component {
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
            dept:                           '',
            process:                        '',
            subprocess:                     '',

            // loading:                        true
        }
    }
    
    componentDidMount(){
        window.scrollTo(0, 0)
        this.callApi()
    }

    callApi(){
        axios.get('/api/adminUsermodel').then(res =>{
            console.log('res.data.data', res.data.data)
            // this.setState({ data: res.data.data, loading: false })
        })
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    searchSpace=(e)=>{ this.setState({search:e.target.value}) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:                 false,
            editmodalIsOpen:                false,
            userId:                         '',
            dept:                           '',
            process:                        '',
            subprocess:                     '',
        })
    }

    addModal = (e) => {
        e.preventDefault()
        const data={
            type:               this.state.type,
            cat:                this.state.cat,
            subcat:             this.state.subcat,
        }
        axios.post('/api/createBasic', data)
        .then( res=> {
            if(res.data.success){
                this.setState({ basics: [...this.state.basics, res.data.data ] })
            }
            this.callSwal(res.data.message)
        })
        this.resetData()
    }
    
    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:                true,
            id:                             i.id,
            type:                           i.type,
            cat:                            i.cat,
            subcat:                         i.subcat,
        })
    }

    updateModal = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.id,
            type:               this.state.type,
            cat:                this.state.cat,
            subcat:             this.state.subcat,
        }
        axios.post('/api/updateBasic', data)
        .then( res=> {
            console.log('res.data.data', res.data.data)
            if(res.data.success){ 
                this.setState({ basics: this.state.basics.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data : x ) })
            }
            this.callSwal(res.data.message)
        })
        this.resetData()
    }

    render() {
        console.log('this.state', this.state)
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.data.filter((i)=>{ if(this.state.search == null) return i; else if(i.type.toLowerCase().includes(this.state.search.toLowerCase()) || i.tab1.toLowerCase().includes(this.state.search.toLowerCase()) ){ return i }}).slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{ i.type =='cat'? 'Category' : 'Sub Category'}</td>
                    <td>{i.cat}</td>
                    <td>{i.subcat ? i.subcat : "---" }</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" onClick={()=>this.editModalOn(i)}/></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.data.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })

        return (
            <>
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (SOP Models)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                    {this.state.loading? <div className="loading"><img src="/images/icons/loading.gif"/></div> :<>
                        <div className="btn-pag">  
                            <a href="/admin-createUsermodel" className="amitBtn">Add SOP Model</a>
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
                                <td>Type</td>                                              
                                <td>Category</td>
                                <td>SubCategory</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                            <tbody>{renderItems}</tbody>
                        </table>
                        <ul className="page-numbers">{renderPagination}</ul>
                    </>}
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default Usermodel