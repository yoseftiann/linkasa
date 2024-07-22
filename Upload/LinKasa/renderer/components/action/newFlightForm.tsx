import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import SmallPaper from "../cards/SmallPaper";
import Title from "../utils/title";
import FlightDetailForm from "./flightDetailForm";
import NextButton from '../button/nextButton';
import FlightReview from '../action/flightReview'
import React from "react";
import CalendarDatePicker from "./calendarForm";
import dayjs from "dayjs";

export default function FlightForm(props) 
{
  const {addFlight} = props;
  const [flightDetails, setFlightDetails] = React.useState({
    airline: '',
    departure: '',
    arrival: '',
    serialNumber: '',
    gate: '',
    departureTime: dayjs(),
    arrivalTime: dayjs()
  });

    const handleFlightDetailChange = (event) => {
      const { name, value } = event.target;
      setFlightDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
      }));
  };

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        if(activeStep === steps.length - 1)
        {
          const dataToInput = {
            ...flightDetails,
            departureTime: flightDetails.departureTime.format(),
            arrivalTime: flightDetails.arrivalTime.format(),
            status : 'on-going'
          }
          try{
            await addFlight(dataToInput);
            //refresh after input
            setFlightDetails({
              airline: '',
              departure: '',
              arrival: '',
              serialNumber: '',
              gate: '',
              departureTime: dayjs(),
              arrivalTime: dayjs()
            })
            setSelectedDate(new Date(0))
            setActiveStep(0);
          }catch(error){
            console.log(dataToInput)
            console.log("Error happend while adding flight : ", error);
          }
        }
        else
        {
          setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
  
    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };

    const steps = ['Input Flight Detail', 'Select Date' , 'Review Flight Detail'];

    function getStepContent(step: number) {
      switch (step) {
        case 0:
          return <FlightDetailForm flightDetails={flightDetails} onChange ={handleFlightDetailChange}/>;
        case 1:
          return <CalendarDatePicker selectedDate={selectedDate} onChange ={handleDateChange}/>;
        case 2:
          return <FlightReview flightDetails={flightDetails} date={selectedDate}/> //ganti sama review
        default:
          throw new Error('Unknown step');
      }
    }

    return (
      <>
        <SmallPaper flexDirection={'column'} height={'500px'} marginLeft={'5px'} marginRight={'0'}>
            <Title>Insert Flight</Title>
            {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <NextButton onHandle={handleNext}/>
              </Box>
            </React.Fragment>
          )}
        </SmallPaper>
      </>
    );
  }