import React, { useEffect } from "react";
import MediumPaper from "../cards/FlexiblePaper";
import {db} from "../../firebase/firebase"
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import GroupCard from "../cards/GroupCard";
import { Button, List, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import { departments } from "../utils/const";
import UserService from "./singleton/UserService";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Title from "../utils/title";

export default function ChatRoom(props)
{
    const {onclick} = props;
    const role = UserService.getInstance().getUserRole();
    const department = UserService.getInstance().getUserDepartmentByRole(role);
    const [joinedGroups, setJoinedGroups] = React.useState([]);
    const [unjoinedGroups, setUnjoinedGroups] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [groupToJoin, setGroupToJoin] = React.useState(null);

    //Group To Join
    const handleListItemClick = (group) => {
        setGroupToJoin(group);
        console.log(group);
        
    };

    //Join Handler
    const handleJoin = () => {
        if (groupToJoin && !joinedGroups.some(group => group.id === groupToJoin.id)) {
            setJoinedGroups(prevGroups => [...prevGroups, groupToJoin]);
            setUnjoinedGroups(prevGroups => prevGroups.filter(group => group.id !== groupToJoin.id));
            console.log('Joined new group:', groupToJoin);
        }
    };
    

    //Anchor 
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    //Add
    const addGroups =async (newGroup) => {
        await addDoc(collection( db, 'groups'), newGroup)
    }

    //Delete
    const deleteGroup = async (groupId) => {
        try {
            await deleteDoc(doc(db, 'groups', groupId));
            console.log('Group deleted:', groupId);
        } catch (error) {
            console.error("Error deleting group:", error);
        }
    };

    const deleteAllGroups = async () => {
        const groupsCollectionRef = collection(db, 'groups');
        const snapshot = await getDocs(groupsCollectionRef);
        snapshot.docs.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    };

    const initializeGroups = async () => {
        const groupsCollectionRef = collection(db, 'groups');
        const snapshot = await getDocs(groupsCollectionRef);
        const existingGroupNames = snapshot.docs.map(doc => doc.data().name);

        for (const department of departments) {
            if (!existingGroupNames.includes(department.value)) {
                try {
                    await addGroups({ name: department.value, desc: `Group for ${department.value} department` });
                } catch (error) {
                    console.error('Error adding group:', error);
                }
            }
        }
    };

    const fetchGroupsByDepartment = async () => {
        try{
            //Get the data to set
            const q = query(collection(db,'groups'), where('name', '==',department));
            const snapShot = await getDocs(q);
            const departmentGroups = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setJoinedGroups(departmentGroups);
        } catch(error){
            console.error("error fetching groups : ", error);
        }
    }

    const fetchAllGroups = async () => {
        try {
            const allGroupsSnapshot = await getDocs(collection(db, 'groups'));
            const allGroups = allGroupsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUnjoinedGroups(allGroups.filter(group => 
                !joinedGroups.some(joinedGroup => joinedGroup.id === group.id)
            ));
        } catch (error) {
            console.error("error fetching all groups:", error);
        }
    };

    useEffect(() => {
        // Initialize and fetch groups
        initializeGroups();
        fetchGroupsByDepartment();
        fetchAllGroups();
    }, []);

    useEffect(() => {
        fetchAllGroups();
    },[departments])
    
    return (
        <MediumPaper flexDirection={'column'} width={'100%'} height={'300px'} color={'#1a1a1a'}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <Typography component="h1" variant="h6" color="white" gutterBottom>
                        Groups ({joinedGroups.length})
                    </Typography>
                    
                    <SupervisedUserCircleIcon style={{ color: 'white', fontSize: 26 }} onClick={handleClick}/>
                    <Popover 
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        >
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            margin:'0.25rem'
                        }}>
                            {/* Header */}
                            {/* List Map */}
                            <List>
                                {unjoinedGroups.map((group) => (
                                    <ListItem 
                                        key={group.id}
                                        onClick={() => handleListItemClick(group)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#e0e0e0',
                                                cursor: 'pointer'
                                            },
                                            backgroundColor: groupToJoin?.id === group.id ? 'action.selected' : 'inherit'
                                            
                                        }}
                                    >
                                        <ListItemText primary={group.name} />
                                    </ListItem>
                                ))}
                            </List>
                            {/* Button Wide */}
                            <div style={{
                                width:'100%'
                            }}>
                            <Button 
                                sx={{
                                    width:'100%'
                                }}
                                variant="contained" 
                                disabled={!groupToJoin}
                                onClick={handleJoin}
                            >
                                <b>join</b>
                            </Button>
                            </div>
                        </div>
                    </Popover>
                </div>
                {/* Mapping from firebase */}
                <div style={{
                    overflowY:'auto',
                    borderRadius:'12px 12px 12px 12px'
                }}>
                    {joinedGroups.map(group => (
                        <GroupCard key={group.id} onclick={onclick} group={group}/>
                    ))}
                </div>
        </MediumPaper>
    )
}