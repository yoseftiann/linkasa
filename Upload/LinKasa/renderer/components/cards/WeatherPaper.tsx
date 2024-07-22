import React from 'react';
import { Paper } from '@mui/material';

const WeatherPaper = ({ children, flexDirection, height, marginLeft, marginRight, condition }) => {
    const getWeatherColor = (condition) => {
        if(condition ==='Clear')
        {
            return 'linear-gradient(180deg, #FCE793 0%, #A83203 100%)'
        }
        else if(condition ==='Cloudy')
        {
            return 'linear-gradient(180deg, #0AC6DF 0%, #03357B 100%)'
        }
        else if(condition ==='Drizzle')
        {
            return 'linear-gradient(180deg, #4A666B 0%, #0A4584 100%)'
        }  
        else if(condition ==='Snow')
        {
            return 'linear-gradient(180deg, #90CFF1 0%, #035DF8 100%)'
        }else if(condition ==='Rain')
        {
            return 'linear-gradient(180deg, #719499 0%, #2A3D51 100%)'
        }
    }

    return (
        <div style={{ width: '25vw', marginRight: marginRight, marginLeft: marginLeft}}>
            <Paper style={{
                gap:'1rem',
                padding: '16px',  
                display: 'flex', 
                flexDirection: flexDirection,
                borderRadius: '12px', 
                boxShadow: '0px 0px 4px rgba(31, 38, 135, 0.1)', 
                overflow: 'hidden',
                //  maxHeight: height,
                justifyContent:'flex-start',
                height: height,
                backgroundImage: getWeatherColor(condition)
                }}>
                {children}
            </Paper>
        </div>
    );
};

export default WeatherPaper;