import React from 'react';
import ChatBox from '../action/chatBox';
import ChatRoom from '../action/chatRoom';
import ChatBroadcast from '../action/chatBroadcast';

export default function Chat(){
    const [selectedRoom, setSelectectRoom] = React.useState('Chat 1');

    const handleGroupClick = (group) => {
        setSelectectRoom(group);
        console.log(group.name)
    };
    
    //Room - - > Nama, Description
    return(
        <div style={{
            height: '75vh',
            width:'100%',
            display:'flex',
            flexDirection:'row',
            gap:'1rem'
            // backgroundColor:'red'
        }}>
            {/* 1. Friends and Groups */}
            <div style={{
                // backgroundColor:'blue',
                height: 'auto',
                display:'flex',
                flexDirection:'column',
                justifyContent:'space-between',
                width:'30%'
            }}>
                {/* Broadcast */}
                <ChatBroadcast/>
                {/* Create Room */}
                <ChatRoom onclick={handleGroupClick}/>
            </div>
            {/* 2. Chat Detail */}
            <ChatBox selectedRoom={selectedRoom}/>
        </div>
    );
}