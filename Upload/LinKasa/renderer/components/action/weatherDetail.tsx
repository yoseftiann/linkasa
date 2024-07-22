import React from 'react'
import {Typography } from "@mui/material";
import CircularProgressWeather from './circularProgressWeater';


export default function WeatherDetail({header,value})
{
    return (
        <div style={{
            // backgroundColor: 'red',
            height:' 100%',
            width:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'space-around',
            padding: '1rem'
        }}>
            <CircularProgressWeather condition={header} value={value}/>
            <Typography sx={{ fontWeight: 'bold', color:'#f8f9fa', letterSpacing: '1px', textAlign: 'center'}}>{header}</Typography>
        </div>
    )
}