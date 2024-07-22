import MediumPaper from "../cards/FlexiblePaper";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import React, { useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cookies from 'universal-cookie';
import UserService from "./singleton/UserService";
import { Avatar, Divider, InputBase, ListItemText, Typography } from "@mui/material";
import ChatPaper from "../cards/ChatPaper";
import SendIcon from '@mui/icons-material/Send';
const cookies = new Cookies();

export default function ChatBox({selectedRoom})
{
    //Delete [Buat coba coba doang]
    const deleteAllMessages = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'messages'));
            const deletePromises = [];
    
            querySnapshot.forEach((docSnapshot) => {
                deletePromises.push(deleteDoc(doc(db, 'messages', docSnapshot.id)));
            });
    
            await Promise.all(deletePromises);
            console.log(`All documents in 'messages' have been deleted.`);
        } catch (error) {
            console.error("Error deleting messages:", error);
        }
    };

    //Auth ?
    
    //Chat Detail System
    const room = selectedRoom.name;
    const desc = selectedRoom.desc;
    const [newMessage,setNewMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState(null);

    const [userID, setUserID] = React.useState(null);

    const messageRef = collection(db, 'messages')

    useEffect(() => {
        // Fetch the current user data
        const userService = UserService.getInstance();
        userService.fetchUserData().then((userData) => {
            setCurrentUser(userData);
            setUserID(userService.getUserID ? userService.getUserID() : null);
        });
    }, []);
    
    //Scroll behaviour
    const bottomListRef = React.useRef(null);
    useEffect( () => {
        if (bottomListRef.current) {
            bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(newMessage === "")return;

        setNewMessage("");

        const name = currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : 'Anonymous';
        const uid = userID ? {userID} : 'null';

        await addDoc(messageRef, {
            text : newMessage,
            createdAt : serverTimestamp(),
            user : name,
            room : room,
            uid : uid
        })

        //Success new message
        console.log(currentUser);
    }

    useEffect( () => {
        if(!room) return;

        const queryMessage = query(
            messageRef, 
            where("room", "==", room ),
            orderBy("createdAt","asc")
        )
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id});
            })
            setMessages(messages);
        });


        return () => unsubscribe();
    }, [room])

    return (
        <MediumPaper flexDirection={'column'} width={'70%'} height={'100%'} color={'white'}>
            <div style={{
                height:'100%',
                display:'flex',
                flexDirection:'column',
                overflow:'hidden',
                // backgroundColor:'blue'
            }}>
                {/* 1. Top */}
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'1rem',
                    alignItems:'center',
                    height: '9%',
                    // backgroundColor:'red'
                }}>
                    <>
                        <Avatar></Avatar>
                        <ListItemText primary={
                            <span style={{ fontWeight: 'bold' }}>{room}</span>
                        } secondary={desc}></ListItemText>
                    </>
                    <MoreVertIcon></MoreVertIcon>
                </div>  
                <Divider sx={{
                    paddingY: '0.25rem',
                }}/>

                {/* 2. Message Card */}
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    gap:'1rem',
                    alignItems:'flex-start',
                    height: '80%',
                    paddingTop:'0.5rem',
                    paddingBottom:'0.5rem',
                    overflowY: 'auto',
                }}>
                    {messages.map((msg) => {
                        const type = msg.user === `${currentUser.firstname} ${currentUser.lastname}` ? true : false;
                        return (
                            <div key={msg.id} style={{
                                display:'flex',
                                flexDirection: type ? 'row-reverse' : 'row',
                                gap:'1rem',
                                width:'100%',
                            }}>
                                <Avatar></Avatar>
                                <div style={{
                                    display:'flex',
                                    flexDirection: 'column',
                                    gap:'0.25rem'
                                }}>
                                    <ListItemText 
                                    sx={{
                                        display: 'flex',
                                        flexDirection: type ? 'row-reverse' : 'row',
                                    }}
                                    secondary={
                                        <div style={{
                                            display:'flex',
                                            flexDirection:type? 'row-reverse' : 'row'
                                        }}>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                                paddingX={"0.25rem"}
                                                fontWeight={"bold"}
                                            >
                                                {msg.user}
                                            </Typography>
                                            {msg.createdAt && msg.createdAt.seconds ? 
                                                new Date(msg.createdAt.seconds * 1000).toLocaleString('en-ID', {
                                                    year: 'numeric', 
                                                    month: '2-digit', 
                                                    day: '2-digit', 
                                                    hour: '2-digit', 
                                                    minute: '2-digit',  
                                                    hour12: true
                                                }) : ". . ."
                                            }
                                        </div>
                                    }/>
                                    {/* Validasi kalau sama beda tipe sender{msg.user === `${currentUser.firstname} ${currentUser.lastname}` ? "sender" : "receiver"}*/}
                                    <div style={{
                                        display:'flex',
                                        flexDirection:'column',
                                        alignItems: type? 'flex-end' : 'flex-start'
                                    }}>
                                        <ChatPaper type={msg.user === `${currentUser.firstname} ${currentUser.lastname}` ? true : false} msg={msg.text}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomListRef}></div>
                </div>
                <Divider sx={{
                    paddingY: '0.25rem',
                }}/>
                {/* Search Bar */}
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'1rem',
                    alignItems:'center',
                    justifyContent:'space-between',
                    height: '10%',
                    // backgroundColor:'#414141',
                    borderRadius: '14px',
                    padding:'1rem'
                }}>
                    <InputBase
                        
                        onChange={ (e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Type your message here"
                        inputProps={{ 'aria-label': 'type your message here' }}
                    />
                    <Avatar 
                        onClick={handleSubmit}
                        sx={{
                            bgcolor:'#4da2e8'
                        }}
                    >
                        <SendIcon 
                            
                            sx={{
                                fontSize:'20px'
                            }}
                        />
                    </Avatar>
                </div>  
            </div>
            {/* <form onSubmit={handleSubmit}>
                <input onChange={ (e) => setNewMessage(e.target.value)} value={newMessage}/>
                <button type='submit'>Send</button>
            </form>
            <button onClick={deleteAllMessages}>Delete</button> */}
        </MediumPaper>
    )
}