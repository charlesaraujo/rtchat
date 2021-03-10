import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; 
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket; 

const Chat = ({ location }) => {
    const [ name, setName ] = useState('');
    const [ room, setRoom ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const ENDPOINT = 'https://5000-orange-hippopotamus-bs8do4tl.ws-us03.gitpod.io';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        
        socket.emit('join', {name, room}, (error) => {
            console.log(error)
        });
        
        return () =>{
            socket.emit('disconnect');

            socket.off();
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })

    },[messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () =>setMessage(''))
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Input />
            </div>
        </div>
    )
}

export default Chat;