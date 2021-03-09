import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; 
import io from 'socket.io-client';

let socket; 

const Chat = ({ location }) => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');
    const ENDPOINT = 'https://5000-copper-dragon-25o2fs7q.ws-us03.gitpod.io/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
    }, [ENDPOINT, location.search])

    return (
        <h1>Chat</h1>
    )
}

export default Chat;