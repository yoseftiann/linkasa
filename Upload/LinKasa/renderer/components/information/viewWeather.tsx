import React from 'react'
import WeatherLocation from '../dashboard/weatherLocation'
import WeatherHighlight from '../dashboard/weatherHighlight'

export default function ViewWeather(){
    const [data, setData] = React.useState('');

    const handleWeatherData = (newData) => {
        setData(newData);
    };

    return (
        <div>
            <div style={{
                display:'flex',
                flexDirection: 'row',
                gap:'1rem'
            }}>
                <WeatherLocation onWeatherDataChange={handleWeatherData} />
                {/* UV Index */}
                <WeatherHighlight data={data}/>
            </div>
        </div>
    )
}