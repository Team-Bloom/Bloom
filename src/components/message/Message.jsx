import React from 'react';

const Message = ({message, user}) => {
    return (
    <li className={`chat ${user.metadata.name === message.username ? "right" : "left"}`}>
        {`${message.username}: ${message.content}`}
    </li>
);
}

export default Message;
