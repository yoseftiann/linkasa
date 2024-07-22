import { Button, FormControl, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

export default function VisaForm(props) {
  //props
  const { passenger, onSubmit, setOpenPopUp, isEdit, visa, onUpdate} = props;

  //Usestate
  const [passportNumber, setPassportNumber] = React.useState("");
  const [issueCountry, setIssueCountry] = React.useState("");
  const [dateIssue, setDateIssue] = React.useState(dayjs());
  const [dateExpiry, setDateExpiry] = React.useState(dayjs());

  //Handler
  const handleDateIssueChange = (newDate) => setDateIssue(dayjs(newDate));
  const handleDateExpiry = (newDate) => setDateExpiry(dayjs(newDate));

  const handlePassportNumberChange = (event) => {
    setPassportNumber(event.target.value);
  };

  const handleIssueCountryChange = (event) => {
    setIssueCountry(event.target.value);
  };

  //Handle Submit
  const handleButton = async () => {
    const visaData = {
      passportNumber,
      issueCountry,
      dateIssue: dateIssue.format(),
      dateExpiry: dateExpiry.format(),
      passengerID: passenger.id,
    };
    try {
      if(isEdit)
      { 
        await onUpdate(visa.id, visaData, "visas");
        console.log("succeed updating visa details");
      }
      else
      {
        await onSubmit(visaData, "visas");
        console.log("succeed adding visa details");
      }
      setOpenPopUp(false);
    } catch (error) {
      console.log("error adding visa details ", error);
    }
  };

  React.useEffect(() => {
    if (visa) {
      setPassportNumber(visa.passportNumber);
      setIssueCountry(visa.issueCountry);
      setDateIssue(dayjs(visa.dateIssue));
      setDateExpiry(dayjs(visa.dateExpiry));
    }else
    {
      //set to null
    }
  }, [visa]);

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
          <TextField
            id="outlined-basic"
            value={passportNumber}
            onChange={handlePassportNumberChange}
            label="Passport Number"
            variant="outlined"
          />
        </FormControl>
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <TextField
          fullWidth
          onChange={handleIssueCountryChange}
          value={issueCountry}
          id="outlined-basic"
          label="Issuing Country"
          variant="outlined"
        />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Issue"
              value={dateIssue}
              onChange={(newDate) => handleDateIssueChange(newDate)}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expired Date"
              value={dateExpiry}
              onChange={(newDate) => handleDateExpiry(newDate)}
            />
          </LocalizationProvider>
        </FormControl>
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Button fullWidth color="primary" onClick={() => handleButton()}>
          {isEdit? 'update' : 'submit'}
        </Button>
      </div>
    </div>
  );
}
