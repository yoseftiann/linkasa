import React from 'react';
import { Chip, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Title from '../utils/title';
import LargePaper from '../cards/LargePaper';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PopUp from '../action/popUp';
import FlightPopUpForm from '../action/flightPopUpForm';
import dayjs from 'dayjs';

const ViewFlight = (props) => {
    const {flights, onClick, onDelete, onUpdate, openPopUp, setOpenPopUp, selectedFlight} = props;

    // Color Map
    const getChipColor = (status) => {
        if (status === 'cancelled') {
            return '#ffe6e2'; // red
        }
        else if(status === 'arrived')
        {
            return '#e0f6e8'; // green
        }
        else if (status === 'on-going') {
            return '#EEF5FF'; // blue
        }
        else if(status === 'delayed')
        {
            return '#fff2df'; // yellow
        }
    };

    //Text Color Map
    const getTextColor = (status) => {
        if (status === 'cancelled') {
            return '#b71d18'; // red
        }
        else if(status === 'arrived')
        {
            return '#128d57'; // green
        }
        else if (status === 'on-going') {
            return '#1c74d6'; // blue
        }
        else if(status === 'delayed')
        {
            return '#c88f49'; // yellow
        }
    };

  return (
    <>
            <LargePaper height={'500px'} flexDirection={'column'} marginRight={'2rem'} marginLeft={'0px'}>
                <Title>Arrival and Departure Flights</Title>
                <TableContainer sx={{ 
                    maxHeight: 440, 
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }, 
                }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>                
                            <TableRow>
                                {/* <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8',borderRadius: '8px 0 0 8px'}}>Time</TableCell> */}
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8'}}>Gate</TableCell>
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8'}}>Departure</TableCell>
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8'}}>Arrival</TableCell>
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8'}}>Flight</TableCell>
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8'}}>Remarks</TableCell>
                                <TableCell sx={{color: '#626263',border:'none',boxShadow: 'none', backgroundColor: '#f5f6f8',borderRadius: '0 8px 8px 0'}} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {flights.map((row) => (
                            <TableRow key={row.id}>
                                {/* Gate */}
                                <TableCell>{row.gate}</TableCell>
                                {/* Departure / Time */}
                                <TableCell>                            
                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary={row.departure} secondary={dayjs(row.departureTime).format('DD/MM hh:mm A')} />
                                    </ListItem>
                                </TableCell>
                                {/* Arrival / Time */}
                                <TableCell>
                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary={row.arrival} secondary={dayjs(row.departureTime).format('DD/MM hh:mm A')} />
                                    </ListItem>
                                </TableCell>
                                {/* Serial Number */}
                                <TableCell>
                                    <ListItem sx={{ py: 1, px: 0 }}>
                                        <ListItemText primary={row.serialNumber} secondary="Garuda Airline" />
                                    </ListItem>
                                </TableCell>
                                {/* Remarks */}
                                <TableCell align="left">
                                    <Chip 
                                        label={row.status.toUpperCase()}
                                        sx={{
                                            backgroundColor: getChipColor(row.status),
                                            color: getTextColor(row.status), // Set the text color
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </TableCell>
                                {/* Actions */}
                                <TableCell align='center'>
                                    <EditRoundedIcon 
                                        onClick={() => onClick(row)}
                                        sx={{color: '#bbbbbb', paddingX: '1px', marginRight:'1px', '&:hover':{
                                            color:'#6a6a6a'
                                        }}}
                                    />
                                    <DeleteRoundedIcon 
                                        onClick={() => onDelete(row.id)}
                                        sx={{color: '#efbbb8', paddingX: '1px', marginRight:'1px', '&:hover':{
                                            color:'red'
                                        }}}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LargePaper>
            <PopUp
                openPopUp = {openPopUp}
                setOpenPopUp = {setOpenPopUp}
                title = {"Flight Detail"}
            >
                <FlightPopUpForm
                    key={selectedFlight ? selectedFlight.id : 'new'}
                    onUpdate={onUpdate}
                    onClick={onClick}
                    setOpenPopUp={setOpenPopUp}
                    flight ={selectedFlight}
                />
            </PopUp>
    </>
  );
};

export default ViewFlight;
