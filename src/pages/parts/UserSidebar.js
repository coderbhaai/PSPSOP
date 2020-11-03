import React from 'react'

function UserSidebar(props) {
    const links=[
        {url:"costing", text:"Costing"}
    ]
    return (
        <div className="col-sm-3">
            <ul className="adminSidebar">
                {links.map((i,index)=>( <li key={index}><a href={"/user/"+i.url} className={i.text===props.active? "active" : null}>{i.text}</a></li> ))}
            </ul>
        </div>
    )
}

export default UserSidebar
