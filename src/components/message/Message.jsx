import React from 'react';

const Message = ({message, user}) => {
    console.log(message, user)
    return (
    <li className={`chat ${user.metadata.name === message.username ? "right" : "left"}`}>
        {/* {user.metadata.name !== message.username
            && <img src={message.img} alt={`${message.username}'s profile pic`} />
        } */}
        {`${message.username}: ${message.content}`}
    </li>
);
}

export default Message;
