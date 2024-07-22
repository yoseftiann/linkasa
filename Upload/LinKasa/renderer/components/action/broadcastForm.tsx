import { Button, TextField } from "@mui/material";
import React from "react";

export default function BroadcastForm(props){
    const {onSubmit, setOpenPopUp} = props;

    const [newBroadcast, setNewBroadcast] = React.useState('');

    const handleNewBroadcast = (event) => {
        setNewBroadcast(event.target.value);
    }

    //Add new broadcast
    const handleSubmit = async () => {
        if(newBroadcast.trim() === ''){
            console.log("broadcast is empty [!]");
            return;
        }
        
        try{
            await onSubmit(newBroadcast);

            setOpenPopUp(false);
            console.log("Broadcast send succeed!");
            
        }catch(error){
            console.log("Error while sending new broadcast : ", error);
            
        }
    }

    //Handle Reset
    const handleReset= () => {
        setNewBroadcast('');
    }

    return(
        <div style={{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            gap:'1rem'
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                width:'100%'
            }}>
            <TextField
                id="filled-multiline-static"
                multiline
                rows={4}
                label="Insert new broadcast"
                variant="filled"
                onChange={handleNewBroadcast}
                value={newBroadcast}
            />
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                gap:'1rem',
                justifyContent:'flex-end',
                margin:'0',
                padding:'0',
            }}>
                <Button variant="contained" onClick={handleSubmit}>send</Button>
                <Button variant="outlined" onClick={handleReset}>reset</Button>
            </div>
        </div>
    )
}