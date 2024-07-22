import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

export default function PassportForm(props)
{
    //props
    const {passenger, onSubmit, setOpenPopUp, isEdit, passport, onUpdate} = props;

    //Usestate
    const [name, setName] = React.useState('');
    const [placeBirth, setPlaceBirth] = React.useState('');
    const [nationality, setNationality] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [dob, setDob] = React.useState<Dayjs | null>(dayjs());

    //Handler
    const handleDateChange = (newDate) => setDob(dayjs(newDate));

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePlacebirthChange = (event) => {
        setPlaceBirth(event.target.value);
    };

    const handleNationality = (event) => {
        setNationality(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

//Handle Submit
  const handleButton = async () => {
    const passportData = {
      name,
      placeBirth,
      nationality,
      gender,
      dob: dob.format(),
      passengerID : passenger.id
    };
    try {
      if(isEdit)
      { 
        await onUpdate(passport.id, passportData, "passports");
        console.log("succeed updating passport details");
      }
      else
      {
        await onSubmit(passportData, "passports");
        console.log("succeed adding passport details");
      }
      setOpenPopUp(false);
    } catch (error) {
      console.log("error adding passport details ", error);
    }
    console.log(passportData);
    
  };

  React.useEffect(() => {
    console.log("is edit : ",passport);
    
    if (passport) {
      setName(passport.name);
      setPlaceBirth(passport.placeBirth);
      setNationality(passport.nationality);
      setGender(passport.gender);
      setDob(dayjs(passport.dob))
    }else
    {
      //set to null
    }
  }, [passport]);

    return(
        <div style={{
            display: "flex",
            flexDirection: 'row',
            width:'100%',
            gap: '1rem',
            padding:'0.5rem'
        }}>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                width:'50%',
                gap:'1rem',
                justifyContent:'space-between',
            }}>
                <TextField onChange={handleNameChange} value={name} id="outlined-basic" label="Name" variant="outlined" />
                <TextField onChange={handlePlacebirthChange} value={placeBirth} id="outlined-basic" label="Place Of Birth" variant="outlined"/>
                <TextField onChange={handleNationality} value={nationality} id="outlined-basic" label="Nationality" variant="outlined" />
            </div>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                width:'50%',
                gap:'0.5rem',
                justifyContent:'space-between'
            }}>
                {/* Gender */}
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        value={gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleGenderChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                
                {/* Role */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="DOB"
                            value={dob}
                            onChange={(newDate) => handleDateChange(newDate)}
                        />
                    </LocalizationProvider>

                <div style={{
                    height:'20px'
                }}>
                </div>
                
               <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'1rem',
                    justifyContent:'flex-end',
                    margin:'0',
                    padding:'0',
               }}> 
                    <Button variant="contained" onClick={() => handleButton()}>{isEdit? 'update' : 'submit'}</Button>
                    <Button variant="outlined">reset</Button>
                </div>
            </div>
        </div>
    )
}