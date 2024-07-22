import { Button, FormControl, TextField } from "@mui/material";
import React from "react";

export default function CustomDeclarationForm(props) {

    //props
    const { passenger, onSubmit, setOpenPopUp, isEdit, customDeclaration, onUpdate} = props;

    //Use state
    const [passportNumber, setPassportNumber] = React.useState('');
    const [flightNumber, setFlightNumber] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [purpose, setPurpose] = React.useState('');

    const handlePassportNumberChange = (event) => {
        setPassportNumber(event.target.value);
    };

    const handleFlightNumberChange = (event) => {
        setFlightNumber(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handlePurposeChange = (event) => {
        setPurpose(event.target.value);
    };

  //Handle Submit
  const handleButton = async () => {
    const customDeclarationData = {
      passportNumber,
      flightNumber,
      purpose,
      country,
      passengerID: passenger.id,
    };
    try {
      if(isEdit)
      { 
        await onUpdate(customDeclaration.id, customDeclarationData, "customDeclarations");
        console.log("succeed updating customDeclarations details");
      }
      else
      {
        await onSubmit(customDeclarationData, "customDeclarations");
        console.log("succeed adding customDeclarations details");
      }
      setOpenPopUp(false);
    } catch (error) {
      console.log("error adding customDeclarations details ", error);
    }
  };

  React.useEffect(() => {
    if (customDeclaration) {
      setPassportNumber(customDeclaration.passportNumber);
      setFlightNumber(customDeclaration.flightNumber);
      setCountry(customDeclaration.country);
      setPurpose(customDeclaration.purpose);
    }else
    {
      //set to null
    }
  }, [customDeclaration]);

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
        <TextField fullWidth onChange={handleFlightNumberChange} value={flightNumber} id="outlined-basic" label="Flight Number" variant="outlined" />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <TextField fullWidth onChange={handleCountryChange} value={country} id="outlined-basic" label="Country To Visit" variant="outlined" />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <TextField fullWidth onChange={handlePurposeChange} value={purpose} id="outlined-basic" label="Purpose of Visit" variant="outlined" />
      </div>
      <div
        style={{
          width: "50%",
        }}
      >
        <Button fullWidth color="primary" 
        onClick={() => handleButton()}
        >
          {isEdit? 'update':'submit'}
        </Button>
      </div>
    </div>
  );
}
