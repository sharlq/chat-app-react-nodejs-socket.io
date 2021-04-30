import React from 'react'
import {Typography} from '@material-ui/core'
const Message = ({name,text,user}) => {

    return (
        <div>
       {(name===user)?
       <div className="message" key={new Date()}>
        <Typography className="name" key={`${new Date()} ${name}`} variant="subtitle1">{name}</Typography> 
        <Typography className="text" key={`${new Date()} ${text}`} variant="body1">{text}</Typography>
        </div>
        :
        <div className="message-rev" key={new Date()}>
        <Typography className="text" key={`${new Date()}${name}`} variant="body1">{text}</Typography>
        <Typography className="name" key={`${new Date()} ${text}`} variant="subtitle1">{name}</Typography> 
        </div>
        }
    </div>
    )
}

export default Message
