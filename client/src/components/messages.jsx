import React from 'react'
import {Typography} from '@material-ui/core'
const Messages = ({name,text,user}) => {
    return (
        <div>
       {(name===user)?
       <div className="message">
        <Typography className="name" variant="subtitle1">{name}</Typography> 
        <Typography className="text" variant="body1">{text}</Typography>
        </div>
        :
        <div className="message-rev">
        <Typography className="text" variant="body1">{text}</Typography>
        <Typography className="name" variant="subtitle1">{name}</Typography> 
        </div>
        }
    </div>
    )
}

export default Messages
