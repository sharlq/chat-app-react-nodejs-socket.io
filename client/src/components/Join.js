import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Card,CardContent,Button,Typography,TextField} from '@material-ui/core'


const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    return (
        <Card className="container">
        <CardContent className="container-inner">
            <Typography className="title" variant="h4">Join</Typography>
            <div><TextField variant="outlined" className="input" onChange={(e)=>{setName(e.target.value)}} placeholder="name"/></div>
            <div><TextField variant="outlined" className="input" onChange={(e)=>{setRoom(e.target.value)}} placeholder="room"/></div>
            <Link onClick={e=>(!name||!room)?e.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
            <Button className="btn" type="submit" variant="contained" color="primary">JOIN</Button>
            </Link>
        </CardContent>
        </Card>
    )
}

export default Join
