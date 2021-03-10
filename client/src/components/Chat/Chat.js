import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; 
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

import './Chat.css';

let socket; 

/**TODO:
 * Show users in room nicely
 * resolve disconnect
 * https://github.com/adrianhajdin/project_chat_application
 */
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
            console.log("chamei o disconnect");
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

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;