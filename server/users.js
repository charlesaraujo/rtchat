const users = [];

const addUser = ({ id, name, room}) => {
    
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    
    const existingUser = users.find((users) => users.room === rom && users.name === name);

    if(existingUser) return {error: 'Username is taken'};

    const user = {id, name, room};

    user.push(user);

    return {user};
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) return users.splice(inex,1)[0];
};

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInroom = (room) => users.filter((user) => user.room === room); 

module.exports = { addUser, removeUser, getUser, getUsersInroom };