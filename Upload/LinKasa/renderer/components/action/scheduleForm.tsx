import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  DateField,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export default function ScheduleForm(props) {
  // Props
  const {onSubmit, setOpenPopUp, generateID, schedule, onUpdate, isEdit} = props;

  //State
  const [id, setId] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [participant, setParticipant] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [time, setTime] = React.useState<Dayjs | null>(dayjs());

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };
  const handleParticipantChange = (event) => {
    setParticipant(event.target.value);
  };
  const handleDateChange = (newDate) => setDate(dayjs(newDate));
  const handleTimeChange = (newDate) => setTime(dayjs(newDate));

  //Handler
  const handleButton = async () => {
    const scheduleData = {id, activity, location, date: date.format('MMMM DD, YYYY'),time: time? time.format('hh:mm A') : '', participant};

    try{
        if(isEdit)
        {
            await onUpdate(schedule.firestoreID, scheduleData)
        }
        else
        {
            await onSubmit(scheduleData);
            console.log("New Schedule has been added.");
        }

        setOpenPopUp(false);
    }catch(error){
        console.log("error found : ", error);
    }
  }

  React.useEffect(() => {
    if (schedule) {
      setId(schedule.id);
      setLocation(schedule.location);
      setActivity(schedule.activity);
      setDate(dayjs(schedule.date))
      setTime(dayjs(schedule.time, 'hh:mm A'))
      setParticipant(schedule.participant)
    } else {
      setId(generateID());
    }
  }, []);
  

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <TextField
            disabled
            id="outlined-basic"
            value={id}
            label="Schedule ID"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            value={activity}
            label="Activity Name"
            variant="outlined"
            onChange={handleActivityChange}
          />
          <TextField
            id="outlined-basic"
            value={location}
            label="Location"
            variant="outlined"
            onChange={handleLocationChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Date"
              value={date}
              onChange={handleDateChange}
              format="LL"
            />
            <TimeField label="Time" value={time} onChange={handleTimeChange} />
          </LocalizationProvider>

          {/* Participant */}
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Participant
            </FormLabel>
            <RadioGroup
              row
              value={participant}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleParticipantChange}
            >
              <FormControlLabel
                value="staff"
                control={<Radio />}
                label="Staff"
              />
              <FormControlLabel
                value="applicant"
                control={<Radio />}
                label="Applicant"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Button
          fullWidth
          color="primary"
          onClick={() => handleButton()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
