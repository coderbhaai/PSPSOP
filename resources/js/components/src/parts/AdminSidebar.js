import React, { Component } from 'react'

export class AdminSidebar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            active:                     '',
            role:                       '',
            dept:                       []
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if(typeof(Storage) !== "undefined" ){ 
            this.setState({ role: JSON.parse(localStorage.getItem('user')).role || '' })
        }
        this.setState({ active: window.location.pathname })
        if(window.location.pathname === '/createSop'){ this.setState({ active: '/sopList' }) }
        if(window.location.pathname.split("/")[1] === 'updateSop'){ this.setState({ active: '/sopList' }) }
        
    }

   
    render() {
        const admin =[
            {text: 'Basics', url: '/admin-basics', active: '/admin-basics'},
            {text: 'Users', url: '/admin-users', active: '/admin-users'},
            {text: 'All SOPs', url: '/sopList', active: '/admin-sop'},
        ]

        const org =[
            {text: 'Basics', url: '/org-basics', active: '/org-basics'},
            {text: 'Users', url: '/org-users', active: '/org-users'},
            {text: 'All SOPs', url: '/sopList', active: '/org-sop'},
        ]
        return (
            <div className="col-sm-2 sidebar">                                
                <ul>
                    {this.state.role==='Admin'?
                        admin.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))
                    :this.state.role==='Org'?
                        org.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))
                    : null}
                </ul>
            </div>
        )
    }
}

export default AdminSidebar
