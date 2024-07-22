import { List, ListItem, ListItemText, Typography } from "@mui/material";

const FlightReview = ({flightDetails, date}) => {

  const selectedDate = date.toDateString();

  return (
    <>
      <List disablePadding>
        {/* Flight Details */}
        <div style={{
          display: "flex",
          flexDirection: 'row'
        }}>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Departure" secondary={flightDetails.departure} />
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Arrival" secondary={flightDetails.arrival} />
          </ListItem>
        </div>
        
        <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Airline" secondary={flightDetails.airline} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Serial Number" secondary={flightDetails.serialNumber} />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Gate" secondary={flightDetails.gate} />
        </ListItem>
        {/* Selected Date */}
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText primary="Selected Date" secondary={selectedDate} />
        </ListItem>
      </List>
    </>
  )
}

export default FlightReview;