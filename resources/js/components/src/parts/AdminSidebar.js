import React, { Component } from 'react'

export class AdminSidebar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            active:                     '',
            dept:                     []
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        this.setState({ active: window.location.pathname })
        if(window.location.pathname === '/admin-createSop'){ this.setState({ active: '/admin-sop' }) }
        if(window.location.pathname.split("/")[1] === 'admin-updateSop'){ this.setState({ active: '/admin-sop' }) }
        axios.get('/api/adminBasic').then(res =>{ 
            this.setState({ dept: res.data.dept },()=>this.checkUrl(res.data.dept)) })
        
    }

    checkUrl=(data)=>{
        if(window.location.pathname.split('/')[2]){
            this.setState({ 
                active:             window.location.pathname.split('/')[2].replace(/%20/g, ' ')
            })
            if( data.some(el => el.department === window.location.pathname.split('/')[2].replace(/%20/g, ' ') ) ){
                console.log("Exists")
            }else{
                window.location.href = '/admin-sop'
            }
        }        
    }
    
    render() {
        const url =[
            {text: 'Basics', url: '/admin-basics', active: '/admin-basics'},
            {text: 'Users', url: '/admin-users', active: '/admin-users'},
            {text: 'User model', url: '/admin-usermodel', active: '/admin-usermodel'},
            {text: 'All SOPs', url: '/admin-sop', active: '/admin-sop'},
        ]
        return (
            <div className="col-sm-2 sidebar">                                
                <ul>
                    {url.map((i, index)=>( <li key={index}><a href={i.url} className={i.url == this.state.active? 'active' : null}>{i.text}</a></li> ))}
                    {this.state.dept.map((i, index)=>( <li key={index}><a href={'/admin-createSop/'+i.department} className={i.department == this.state.active? 'active' : null}>{i.department} SOP</a></li> ))}
                </ul>
            </div>
        )
    }
}

export default AdminSidebar
