import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase/firebase";

export default function CrewForm(props) {
  //Props
  const { onSubmit, setOpenPopUp, onUpdate, crew, isEdit} = props;

  //Const
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [age, setAge] = React.useState();
  const [position, setPosition] = React.useState("");
  const [flight, setFlight] = React.useState('');
  const [flights, setFlights] = React.useState([]);

  //Handler
  const handleFlightChange = (event) => {
    setFlight(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  //Handle Button
  const handleButton = async () => {
    const crewData = { name, age, flight, gender, position };

    try{
        if(isEdit)
        {
            await onUpdate(crew.id, crewData);
        }
        else
        {
            await onSubmit(crewData);
        }
        setOpenPopUp(false);
        console.log("finished adding new crew data.");
    }catch(error){
        console.log("error found : ", error);
    }
  };

  //Use effect to fetch flight data
  React.useEffect(() => {
    const flightCollectionRef = collection(db, "flights");

    const unsubscribe = onSnapshot(flightCollectionRef, (snapshot) => {
      const updatedFlights = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlights(updatedFlights);
    });

    console.log(flights);

    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (crew) {
        setName(crew.name);
        setAge(crew.age);
        setGender(crew.gender);
        setFlight(crew.flight || "");
        setPosition(crew.position);
        console.log("Default flight set to:", crew.flight);
        
    }
  }, [isEdit, flights]);

  return (
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
          id="outlined-basic"
          value={name}
          label="Name"
          variant="outlined"
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-basic"
          value={age}
          label="Age"
          variant="outlined"
          onChange={handleAgeChange}
        />

        {/* Select by fetch flight data */}
        <FormControl>
          <InputLabel id="demo-simple-select-helper-label">
            Assigned To
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={flight}
            label="Assigned To"
            onChange={handleFlightChange}
          >
            {flights.map((fl) => (                
              <MenuItem key={fl.serialNumber} value={fl.serialNumber}>
                {fl.serialNumber} / {fl.airline}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            value={gender}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Position
          </FormLabel>
          <RadioGroup
            row
            value={position}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handlePositionChange}
          >
            <FormControlLabel
              value="Pilot/Co"
              control={<Radio />}
              label="Pilot/Co-Pilot"
            />
            <FormControlLabel
              value="Flight Crew"
              control={<Radio />}
              label="Flight Crew"
            />
            <FormControlLabel
              value="Cabin Crew"
              control={<Radio />}
              label="Cabin Crew"
            />
          </RadioGroup>
        </FormControl>

        <div
          style={{
            display: "flex",
            flexDirection: "row",   
            gap: "1rem",
            justifyContent: "flex-end",
            margin: "0",
            padding: "0",
          }}
        >
          <Button variant="contained" onClick={handleButton}>
            submit
          </Button>
          <Button
          // variant="outlined" onClick={() => handleReset()}
          >
            reset
          </Button>
        </div>
      </div>
    </div>
  );
}
