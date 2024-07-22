import { Button, TextField, Typography } from "@mui/material";
import MediumPaper from "../cards/FlexiblePaper";
import React, { useEffect } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import PendingIcon from '@mui/icons-material/Pending';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import SwipeableViews from 'react-swipeable-views';
import UserService from "./singleton/UserService";
import PopUp from "./popUp";
import BroadcastForm from "./broadcastForm";


export default function ChatBroadcast()
{
    //props
    const currentUserRole = UserService.getInstance().getUserRole();
    const [openPopUp, setOpenPopUp] = React.useState(false);
    
    //Content Handler
    const [newBroadcast, setNewBroadcast] = React.useState('');

    const addBroadcast = async (newBroadcastText) => {
        try {
            const newBroadcastRef = await addDoc(collection(db, 'broadcast'), {
                text: newBroadcastText,
                createdAt: new Date()
            });

            const newBroadcast = {
                id: newBroadcastRef.id, 
                text: newBroadcastText,
                createdAt: new Date()
            };
    
            setBroadcasts(prevBroadcasts => [...prevBroadcasts, newBroadcast]);
        } catch (error) {
            console.log("Error adding document broadcast:", error);
        }
    };
    

    const handleSendBroadcast = async () => {
        if (newBroadcast.trim() !== '') {
            try {
                await addDoc(collection(db, 'broadcast'), { text: newBroadcast, createdAt: new Date() });
                setNewBroadcast('');
            } catch (error) {
                console.error("Error sending new broadcast: ", error);
            }
        }
    };

    //Fetch
    const [broadcasts, setBroadcasts] = React.useState([]);

    useEffect(() => {
        const fetchBroadcasts = async () => {
            const querySnapshot = await getDocs(collection(db, 'broadcast'));
            const fetchedBroadcasts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBroadcasts(fetchedBroadcasts);
        };

        fetchBroadcasts();
    }, []);
    
    //Sliding View
    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        // Change slide every 5 seconds
        const interval = setInterval(() => {
            setActiveStep(prevActiveStep => (prevActiveStep + 1) % broadcasts.length);
        }, 5000);
    
        return () => clearInterval(interval);
    }, [broadcasts.length]);
    
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return(
        <MediumPaper flexDirection={'column'} width={'100%'} height={'300px'} color={'#1a1a1a'}>
            <div style={{
                backgroundColor:'',
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <Typography component="h1" variant="h6" color="white" gutterBottom>
                    Broadcast
                </Typography>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'0.5rem'
                }}>
                    {currentUserRole === 'Customer Service Manager' && (
                        <PlaylistAddCircleIcon onClick={() => setOpenPopUp(true)} style={{ color: 'white', fontSize: 26 }} />
                    )}
                    <PendingIcon onClick={() => setOpenPopUp(true)} style={{ color: 'white', fontSize: 26 }} />
                </div>
            </div>
            {/* Content / Children */}
            <div style={{ height:'100%',width:'100%', backgroundColor:'', borderRadius:'4px', paddingTop: '1rem'}}>
            <SwipeableViews 
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                    style={{
                        width:'100%',
                        height:'80%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        backgroundColor : ''
                    }}
                >
                    {broadcasts.map(broadcast => (
                        <div key={broadcast.id} style={{ width: '100%', boxSizing: 'border-box' }}>
                            <Typography 
                                color="white" 
                                // noWrap
                                sx={{
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    textOverflow: 'ellipsis',
                                    width: '100%',
                                    // height:'100%',
                                    overflow: 'hidden',
                                    // whiteSpace: 'wrap',
                                    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.25)', 
                                    display:'box'
                                }}
                            >
                                {broadcast.text}
                            </Typography>
                        </div>
                    ))}
                </SwipeableViews>
            </div>
            <PopUp
                openPopUp = {openPopUp}
                setOpenPopUp = {setOpenPopUp}
                title={"Broadcast Detail"}
            >
                <BroadcastForm
                    setOpenPopUp={setOpenPopUp}
                    onSubmit={addBroadcast}
                />
            </PopUp>
        </MediumPaper>
    )
}