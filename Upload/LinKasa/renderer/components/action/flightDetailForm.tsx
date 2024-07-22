import { TextField } from "@mui/material";
import WhiteGap from "../utils/whiteGap";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FlightDetailForm = ({flightDetails, onChange}) => {
    return(
        <>
        {/* 1 */}
            <div>
                <TextField
                    onChange = {onChange}
                    value = {flightDetails.airline}
                    sx={{
                        paddingBottom: '4px',
                    }}
                    required
                    id="airline"
                    name="airline"
                    label="Airline"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                />
            </div>
            {/* 2 (Dropdown list)*/}
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <TextField
                    onChange = {onChange}
                    value = {flightDetails.departure}
                    required
                    id="departure"
                    name="departure"
                    label="Departure"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{
                        paddingBottom: '4px',
                    }}
                />
                <WhiteGap/>
                <TextField
                    onChange = {onChange}
                    value = {flightDetails.arrival}
                    required
                    id="arrival"
                    name="arrival"
                    label="Arrival"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    sx={{
                        paddingBottom: '4px',
                    }}
                />
            </div>
            <div style={{
                display:'flex',
                flexDirection:'column',
                gap:'1rem'
            }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    name="departureTime"
                    label="Departure Date & Time"
                    value={flightDetails.departureTime}
                    onChange={(date) =>
                        onChange({ target: { name: "departureTime", value: date } })
                    }
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    name="arrivalTime"
                    label="Arrival Date & Time"
                    value={flightDetails.arrivalTime}
                    onChange={(date) =>
                        onChange({ target: { name: "arrivalTime", value: date } })
                    }
                />
            </LocalizationProvider>
            </div>
            {/* 4 (Dropdown list) */}
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <TextField
                    onChange = {onChange}
                    value = {flightDetails.serialNumber}
                    sx={{
                        paddingBottom: '4px',

                    }}
                    required
                    id="serialNumber"
                    name="serialNumber"
                    label="Serial Number"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                />
                <WhiteGap/>
                <TextField
                    onChange = {onChange}
                    value = {flightDetails.gate}
                    sx={{
                        paddingBottom: '4px',
                    }}
                    required
                    id="gate"
                    name="gate"
                    label="Gate"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                />
            </div>      
        </>
    );
}

export default FlightDetailForm;