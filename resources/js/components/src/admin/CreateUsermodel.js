import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import AdminSidebar from '../parts/AdminSidebar'

export class CreateUsermodel extends Component {
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
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    render() {
        console.log('this.state', this.state)
        return (
            <>
            <div className="container-fluid admin mb-5">
                <h1 className="heading">Admin Panel (Create User Model)</h1>
                <div className="row">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <div className="row">
                            <div className="col-sm-6">
                                <select className="form-control" required name="dept" onChange={this.onChange} value={this.state.dept}>
                                    <option value=''>Select Deparment</option>
                                    <option value="cat">Costing</option>
                                    <option value="subcat">HR</option>
                                </select>
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control" required name="process" onChange={this.onChange} value={this.state.process}>
                                    <option value=''>Select Deparment</option>
                                    <option value="cat">Process 1</option>
                                    <option value="subcat">Process 2</option>
                                </select>
                            </div>
                            <div className="col-sm-12">
                                <ul className="subProcessList">
                                    <li>Sub Porcess 1 <input type="checkbox" name="subprocess" className="onoffswitch-checkbox"/><label className="onoffswitch-label"><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label></li>
                                    <li>Sub Porcess 2 <input type="checkbox" name="subprocess" className="onoffswitch-checkbox"/><label className="onoffswitch-label"><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label></li>
                                    <li>Sub Porcess 3 <input type="checkbox" name="subprocess" className="onoffswitch-checkbox"/><label className="onoffswitch-label"><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label></li>
                                    <li>Sub Porcess 4 <input type="checkbox" name="subprocess" className="onoffswitch-checkbox"/><label className="onoffswitch-label"><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default CreateUsermodel