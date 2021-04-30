import React from 'react'
import {Button,Typography,AppBar,Toolbar} from '@material-ui/core'
import {Link} from 'react-router-dom' 
const Infobar = ({room}) => {
    return (
        <AppBar position="static">
        <Toolbar className="bar">
            <Typography variant="h6" >
            {room}
            </Typography>
            <Link to="/">
            <Button className="logout-btn" color="inherit">Logout</Button>
            </Link>
        </Toolbar>
     </AppBar>
    )
}

export default Infobar
