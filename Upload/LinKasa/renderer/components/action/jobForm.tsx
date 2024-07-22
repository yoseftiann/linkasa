import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { roles } from "../utils/const";
import React from "react";
import {
  DateCalendar,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function JobForm(props) {
  //Props
  const {onSubmit, setOpenPopUp, onUpdate, job, isEdit} = props;
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [description, setDescription] = React.useState("");
  const [role, setRole] = React.useState("");

  const handleDateChange = (newDate) => setDate(dayjs(newDate));

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRole(selectedRole);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleButton = async () => {
    const jobData = {role, description, date: date.format()};
    try{
        if(isEdit)
        {
            //Edit
            await onUpdate(job.id, jobData);
            console.log("Job has been updated");
            
        }
        else
        {
            await onSubmit(jobData);
            console.log("Job Created");
        }        
        setOpenPopUp(false);
    }catch(error)
    {
        console.log(error);
    }
  }

  React.useEffect(() => {
    if(job)
    {
        setRole(job.role),
        setDescription(job.description),
        setDate(dayjs(job.date))
    }
    else
    {
        setRole(""),
        setDescription(""),
        setDate(dayjs())
    }
  }, [job])

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        {/* Role */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={role}
            label="Role"
            onChange={handleRoleChange}
          >
            {roles.map((role) => (
              <MenuItem value={role.value}>{role.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        {/*  Name */}
        <TextField
          fullWidth
          id="outlined-basic"
          value={description}
          onChange={handleDescriptionChange}
          label="Description"
          variant="outlined"
        />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={date} onChange={(newDate) => handleDateChange(newDate)} />
        </LocalizationProvider>
      </div>
      <div
        style={{
          width: "50%",
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
