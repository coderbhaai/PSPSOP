import React, { Component } from 'react'

export class Subscribe extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            email:              ''
        }
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    addSubscribe = (e) => {
        e.preventDefault()
        const data={
            email:                              this.state.email,
            status:                             1,
        }
        axios.post('/api/addSubscribe', data)
        .then( res=> {
            if(res.data.success){
                this.resetData()
            }
            this.callSwal(res.data.message)
        })
    }

    resetData=()=>{ this.setState({ email : '' }) }

    render() {
        return (
            <div className="subscribe">
                <div>
                    <h3>Subscribe us</h3>
                    <p>Subscribe to stay on top of industry trends</p>
                </div>
                <form encType="multipart/form-data" onSubmit={this.addSubscribe}>
                    <div>
                        <input name="email" type="email" className="form-control" placeholder="Email ID" value={this.state.email} required onChange={this.onChange}/>
                    </div>
                    <div className="my-div"><button className="amitBtn" type="submit">Submit</button></div>
                </form>
            </div>
        )
    }
}

export default Subscribe
