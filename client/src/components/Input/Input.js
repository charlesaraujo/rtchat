import React from 'react';

const Input = () => (
    <form className="form">
        <input 
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
        />
        <button></button>
    </form>
)

export default Input;