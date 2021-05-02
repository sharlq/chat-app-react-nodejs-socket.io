//helper functions to contro the operations on the users

const users= [];

const addUser = ({id,name,room}) =>{
    name =name.trim().toLowerCase();
    room =room.trim().toLowerCase();
    //to unify the for of the data we are dealing with so we can control it and comprare it

    const exitsingUser = users.find((user)=>user.room===room&&user.name === name)
    if(exitsingUser){
    return { error: 'User is taken'};}

    const user = {id,name,room}
    users.push(user)
    return {user}
}

const removeUser =(id)=>{
 const index = users.findIndex((user)=>user.id === id)
 if(index !==-1){
     return users.splice(index,1)[0];
 }
 //it could also be done using .filter 
}

const getUser=(id)=> users[users.findIndex((user)=>user.id === id)]




module.exports ={ addUser,removeUser,getUser}