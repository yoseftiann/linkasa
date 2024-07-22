import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box } from '@mui/material';

const newTheme = (theme) => createTheme({
    ...theme,
    components: {
        MuiDateCalendar: {
        styleOverrides: {
          root: {
            color: '#626263', //ubah jadi
            borderRadius: 16,
            borderWidth: 0,
            borderColor: '#2196f3',
            border: '0px solid',
            backgroundColor: '#f5f6f8',
            width: '300px',
            height: '260px',
            marginLeft: '0',
            padding: '10',
            fontWeight: 'bold',
          }
        }
      },
      MuiPickersToolbar: {
        styleOverrides: {
          root: {
            padding: '15px 0'
          }
        }
      },
      MuiPickersDay: {
        styleOverrides: {
          today: {
            "&:not(:focus)":{
                outline: 'none'
            },
            "&:focus":{
                outline: 'none',
            },
            color: '#128d57',
            borderRadius: 25,
            border: '0px',
            // backgroundColor: '#e0f6e8',
          },
          root:{
            "&:focus": {
                outline: 'none',
              },
              "&.Mui-focusVisible": { // This targets the focus-visible state specifically
                outline: 'none',
              },
          }
        }
      },
      MuiDialogActions:{
        styleOverrides:{
            root:{
                justifyContent:'left',
                padding:'10px 0'
            }
        }
      }
    }
  });

const CalendarDatePicker = ({selectedDate,onChange}) => {
    return (
        <>
            <Box sx={{ maxWidth: 'auto', overflow: 'hidden' }}> {/* Set the maximum width and overflow here */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ThemeProvider theme={newTheme}>
                        <StaticDatePicker 
                        value={selectedDate}
                        onChange={onChange}
                        sx={{
                            display: 'flex',
                            flexDirection:'column',
                            alignItems: "left",
                        }}/>
                    </ThemeProvider>
                </LocalizationProvider>
            </Box>
        </>
    );
}

export default CalendarDatePicker;
