import {Typography } from '@mui/material'
import React from 'react'
import MediumPaper from '../cards/FlexiblePaper'
import WeatherDetail from '../action/weatherDetail'

export default function WeatherHighlight({data})
{
    return (
        <MediumPaper flexDirection={'column'} height={'40vh'} width={'100%'} color={'black'}>
            <Typography component="h1" variant="h6" color="#f8f9fa" gutterBottom paddingTop={'12px'}>Today Highlight</Typography>
            <div style={{
                display:'flex',
                flexDirection:'row',
                height: '100%',
                width:'100%',
            }}>
                <WeatherDetail header={"Minimal Temperature"}value={data.temp_min}/>
                <WeatherDetail header={"Maximum Temperature"} value={data.temp_max}/>
                <WeatherDetail header={"Feels Like"} value={data.feels_like}/>
            </div>
        </MediumPaper>
    )
}
