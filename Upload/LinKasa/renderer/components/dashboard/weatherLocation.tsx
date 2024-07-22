import React, { useEffect } from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import search_icon from '../../public/images/WeatherAssets/search.png'
import clear_icon from '../../public/images/WeatherAssets/clear.png'
import cloud_icon from '../../public/images/WeatherAssets/cloud.png'
import drizzle_icon from '../../public/images/WeatherAssets/drizzle.png'
import rain_icon from '../../public/images/WeatherAssets/rain.png'
import snow_icon from '../../public/images/WeatherAssets/snow.png'
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import WeatherPaper from '../cards/WeatherPaper';
import Image from 'next/image';
import { Typography } from '@mui/material';

export default function WeatherLocation({onWeatherDataChange}){
    const default_search = "Jakarta";

    const [weatherData, setWeatherData] = React.useState({
        humidity: 88,
        windSpeed: 12,
        location: 'Jakarta',
        degreesCelsius: 24,
        temp_max : 27,
        temp_min: 15,
        feels_like : 31
    })

    const [searchQuery, setSearchQuery] = React.useState("");

    useEffect( () => {
        fetchAndSetWeatherData(default_search);
    },[])

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        
    };

    const api_key = "dd94f859a0e52d6e4767fddf735f04a7";
    const [weatherIcon, setWeatherIcon] = React.useState(rain_icon);
    const [weatherCondition, setWeatherCondition] = React.useState('Rain');

    const getWeatherCondition = (condition) => {
        if(condition ==='01d' || condition ==='01n')
        {
            setWeatherIcon(clear_icon);
            setWeatherCondition("Clear")
        }
        else if(condition ==='02d' || condition ==='02n')
        {
            setWeatherIcon(cloud_icon)
            setWeatherCondition("Cloudy")
        }
        else if(condition ==='03d' || condition ==='03n')
        {
            setWeatherIcon(drizzle_icon)
            setWeatherCondition("Drizzle")
        }
        else if(condition ==='04d' || condition ==='04n')
        {
            setWeatherIcon(drizzle_icon)
            setWeatherCondition("Drizzle")
        }
        else if(condition ==='09d' || condition ==='09n')
        {
            setWeatherIcon(rain_icon)
            setWeatherCondition("Rain")
        }
        else if(condition ==='10d' || condition ==='10n')
        {
            setWeatherIcon(rain_icon)
            setWeatherCondition("Rain")
        }
        else if(condition ==='10d' || condition ==='10n')
        {
            setWeatherIcon(snow_icon)
            setWeatherCondition("Snow")
        }
    }

    const search = async () => {

        //Check the input field value
        if(searchQuery === "")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=Metric&appid=${api_key}`;

        fetchAndSetWeatherData(searchQuery);
    }

    const fetchAndSetWeatherData = async (query) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            let data = await response.json();

            getWeatherCondition(data.weather[0].icon);
            
            const newWeatherData = {
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            location: data.name,
            degreesCelsius: Math.round(data.main.temp),
            temp_max: Math.round(data.main.temp_max),
            temp_min: Math.round(data.main.temp_min),
            feels_like: Math.round(data.main.feels_like)
            };

            setWeatherData(newWeatherData);
            onWeatherDataChange(newWeatherData);
            setSearchQuery("");

        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }

    return(
        <WeatherPaper flexDirection={'column'} height={'40vh'} marginLeft={'0'} marginRight={'0'} condition={weatherCondition}>
            {/* Top Bar */}
            <div style={{
                height: '50px',
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: '10px',
                gap: '10px'
            }}>
                {/* <form> */}
                    <TextField
                        value={searchQuery}
                        onChange={handleInputChange}
                        id = 'search-bar'
                        variant='outlined'
                        placeholder='Search . . .'
                        size='small'
                        sx={{
                            display:'flex',
                            alignItems:'flex-start',
                            justifyContent: 'center',
                            height: 'auto',
                            padding: '4px',
                            width: '250px',
                            borderRadius: '80px',
                            backgroundColor: 'white',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'transparent',
                                    outline: 'none'
                                },
                            }
                        }}
                    />
                {/* </form> */}
                <IconButton onClick={() => search()} type="submit" aria-label='search' style={{
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        width: '40px',
                        borderRadius: '40px',
                        backgroundColor: 'white'
                    }}>
                    <SearchIcon 
                        style={{
                            fill: "grey",
                        }}
                    />
                </IconButton>
            </div>

            {/* Weather Header*/}
            <div style={{
                height:'auto',
                display:'flex',
                flexDirection:'row',
                alignItems: 'center',
                flexGrow: '1',
                padding:'0',
            }}>
                {/* 1. Image Weather */}
                <div style={{
                    // height:'100%',
                    width:'50%',
                    overflow:'hidden',
                }}>
                    <Image 
                        src={weatherIcon}
                        height={'160%'}
                        width={'180%'}
                    />
                </div>

                {/* 2. Image Location and Celcius */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width:'50%',
                    alignItems:'center'
                }}>
                    <Typography variant='h3' sx={{ fontWeight: 'normal', color:'#f8f9fa', letterSpacing: '1px' }}>
                        {weatherData.degreesCelsius}°C
                    </Typography>
                    <Typography variant='h5' sx={{ fontWeight: 'normal', color:'#f8f9fa', letterSpacing:'4px'}}>
                        {weatherData.location}
                    </Typography>
                </div>
            </div>
            {/* Weather Detail */}
            <div style={{
                height:'20%',
                // backgroundColor:'red',
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-around',
            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'2px'
                }}>
                    <WaterIcon sx={{
                        fontSize:'50px',
                        color: '#f8f9fa'
                    }}/>
                    <div>
                        <Typography sx={{ fontWeight: 'normal', color:'#f8f9fa',fontSize:'16px'}}>
                                {weatherData.humidity}%
                            </Typography>
                        <Typography sx={{ fontWeight: 'normal', color:'#f8f9fa', fontSize:'16px'}}>
                            Humidity
                        </Typography>
                    </div>
                </div>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:'2px'
                }}>
                    <AirIcon sx={{
                        fontSize:'50px',
                        color: '#f8f9fa'
                    }}/>
                    <div>
                        <Typography sx={{ fontWeight: 'normal', color:'#f8f9fa',fontSize:'16px'}}>
                            {weatherData.windSpeed} km/h
                        </Typography>
                        <Typography sx={{ fontWeight: 'normal', color:'#f8f9fa',fontSize:'14px'}}>
                            Wind Speed
                        </Typography>
                    </div>
                </div>
            </div>
        </WeatherPaper>
    )
}