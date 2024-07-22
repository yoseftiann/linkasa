import { Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import React from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function FlightPopUpForm(props)
{
    const {flight , onUpdate, setOpenPopUp} = props

    React.useEffect(() => {
        if (flight) {
            setSerialNumber(flight.serialNumber)
            setAirline(flight.airline)
            setDeparture(flight.departure)
            setDepartureTime(dayjs(flight.departureTime))
            setArrival(flight.arrival)
            setArrivalTime(dayjs(flight.arrivalTime))
            setGate(flight.gate)
            setStatus(flight.status)

            console.log("ada flight data : " + dayjs(departureTime).format());
        }else{
            handleReset();
        }
    }, [flight]);

    // Define state variables for each form field
    const [serialNumber, setSerialNumber] = React.useState(flight?.serialNumber || '');
    const [airline, setAirline] = React.useState(flight?.airline || '');
    const [departure, setDeparture] = React.useState(flight?.departure || '');
    const [arrival, setArrival] = React.useState(flight?.arrival || '');
    const [gate, setGate] = React.useState(flight?.gate || '');
    const [status, setStatus] = React.useState(flight?.status || 'ongoing');

    // Handlers for changing state
    const handleSerialNumberChange = (event) => setSerialNumber(event.target.value);
    const handleAirlineChange = (event) => setAirline(event.target.value);
    const handleDepartureChange = (event) => setDeparture(event.target.value);
    const handleArrivalChange = (event) => setArrival(event.target.value);
    const handleGateChange = (event) => setGate(event.target.value);
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    //Handle Date and Time
    const [departureTime, setDepartureTime] = React.useState(
        flight?.departureTime ? dayjs(flight.departureTime) : dayjs()
      );
      const [arrivalTime, setArrivalTime] = React.useState(
        flight?.arrivalTime ? dayjs(flight.arrivalTime) : dayjs()
      );
      
    const handleDeparturTimeChange = (newDate) => setDepartureTime(dayjs(newDate));;
    const handleArrivalTimeChange = (newDate) => setArrivalTime(newDate);

    //Handle reset
    const handleReset = () => {
        setSerialNumber('');
        setAirline('');
        setDeparture('');
        setDepartureTime(dayjs().hour(0).minute(0).second(0));
        setArrival('');
        setArrivalTime(dayjs().hour(0).minute(0).second(0));
        setGate('');
        setStatus('on-going');
        console.log("handle reset");
    }

    //Handle button
    const handleButton = async ()=>{
        const flightData = {arrival, arrivalTime: arrivalTime.format(), departure, departureTime: departureTime.format(), status, gate, serialNumber};
        // const flightData = {arrival, departure, status, gate, serialNumber};
        try{
            await onUpdate(flight.id, flightData)
            setOpenPopUp(false)
            console.log("finished updating : ", flight.departureTime);
            
        }catch(error)
        {
            console.error("Error while updating the data : ", error);
        }
    }
    
    return(
        <div style={{
            display:'flex',
            flexDirection:'row',
            padding:'0.5rem',
            gap:'1rem'
        }}>
            <div style={{
                display:'flex',
                flexDirection:'column',
                width:'55%',
                gap:'1.25rem'
            }}>
                <div style={{
                display:'flex',
                flexDirection:'row',
                width:'100%',
                justifyContent:'space-between'
                }}>
                    <TextField id="outlined-basic" disabled value={serialNumber} onChange={handleSerialNumberChange} label="Flight Serial" variant="outlined"/>
                    <FormControl sx={{
                        width:'40%'
                    }}>
                        <InputLabel id="demo-simple-select-helper-label">Airline</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={airline}
                        label="Role"
                        onChange={handleAirlineChange}
                        >
                            <MenuItem value={"Singapore Airline"}>Singapore Airline</MenuItem>
                            <MenuItem value={"Batik Airline"}>Batik Airline</MenuItem>
                            {/* <MenuItem value={30}>Thirty</MenuItem> */}
                        </Select>
                    </FormControl>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'100%',
                    justifyContent:'space-between'
                }}>
                    <TextField id="outlined-basic" value={departure} onChange={handleDepartureChange} label="Departure" variant="outlined"/>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Departure Date & Time"
                            value={departureTime}
                            onChange={(newDate) => handleDeparturTimeChange(newDate)}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    width:'100%',
                    justifyContent:'space-between'
                }}>
                    <TextField id="outlined-basic" value={arrival} onChange={handleArrivalChange} label="Arrival" variant="outlined"/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Arrival Date & Time"
                            value={dayjs(arrivalTime)}
                            onChange={(newDate) => handleArrivalTimeChange(newDate)}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                width:'45%',
                gap:'0.75rem'
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    width:'100%',
                }}>
                    <TextField id="outlined-basic" value={gate} onChange={handleGateChange} label="Gate" variant="outlined"/>
                </div>
                <div style={{

                }}>
                    <FormControl>
                        <FormLabel id="demo-form-control-label-placement">Remark's</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-form-control-label-placement"
                            name="position"
                            defaultValue="top"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <FormControlLabel
                            value="on-going"
                            control={<Radio size="small" />}
                            label="On-going"
                            labelPlacement="bottom"
                            style={{ margin: 0, padding: '0.25rem 0.75rem' }}
                            />
                            <FormControlLabel
                            value="cancelled"
                            control={<Radio size="small" />}
                            label="Cancelled"
                            labelPlacement="bottom"
                            style={{ margin: 0, padding: '0.25rem 0.75rem' }}
                            />
                            <FormControlLabel
                            value="delayed"
                            control={<Radio size="small" />}
                            label="Delayed"
                            labelPlacement="bottom"
                            style={{ margin: 0, padding: '0.25rem 0.75rem' }}
                            />
                            <FormControlLabel
                            value="arrived"
                            control={<Radio size="small" />}
                            label="Arrived"
                            labelPlacement="bottom"
                            style={{ margin: 0, padding: '0.25rem 0.75rem' }}
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'1rem',
                    justifyContent:'flex-end',
                    margin:'0',
                    padding:'0',
               }}> 
                    <Button variant="contained" onClick={() => handleButton()}>Update</Button>
                    <Button variant="outlined" onClick={() => handleReset()}>reset</Button>
                </div>
            </div>
        </div>
    )   
}