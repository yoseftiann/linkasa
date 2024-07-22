import { CircularProgress, Typography, makeStyles } from '@mui/material';
import { color } from 'framer-motion';
import React, { useState } from 'react';

const CircularProgressWeather = ({value, condition}) => {
    
    // Mapping color based on type
    const getProgressColor = (condition) => {
        if(condition === 'Minimal Temperature')
        {
            return '#2399ee';
        }
        else if(condition === 'Maximal Temperature')
        {
            return '#8c8dfe';
        }
        else if(condition === 'Feels Like')
        {
            return '#f6c98e'
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100px',
            width:'100%',
        }}>
            <CircularProgress 
                variant="determinate" 
                value={100}
                thickness={3.9}
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    fontSize: '20px',
                    color:'#222b36',
                    opacity:'0.9'
                }} 
                
                size={'120px'}
                className="custom-rounded-progress"
            />
            <CircularProgress 
                thickness={4}
                variant="determinate" 
                value={((value - 1) * (100 - 1) / (40 - 1)) + 1} 
                style={{
                    position: 'absolute',
                    zIndex: 2,
                    fontSize: '20px',
                    color:getProgressColor(condition),
                    opacity:'0.95'
                }} 
                
                size={'120px'}
                className="custom-rounded-progress"
            />
            <Typography sx={{
                position: 'absolute',
                zIndex: 1,
                fontSize:'1.15rem',
                fontWeight:'bold',
                color:'#f8f9fa' 
            }}>
                {value}°C
            </Typography>
        </div>
    );
};

export default CircularProgressWeather;
