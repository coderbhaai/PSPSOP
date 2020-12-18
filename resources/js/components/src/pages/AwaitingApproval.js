import React, { Component } from 'react'

export class AwaitingApproval extends Component {
    render() {
        return (
            <div className="container my-5">
                <h1 className="heading">Awaiting Approval</h1>
                <p className="text-center">Thank you for registering with us.</p>
                <p className="text-center">Your registration has been done and is yet to be approved by the administrators.</p>
                <p className="text-center">You can either wait for the approval or call ---</p>
            </div>
        )
    }
}

export default AwaitingApproval
