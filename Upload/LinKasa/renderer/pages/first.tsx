import React, { useEffect, useState } from 'react'
import MiniDrawer from '../components/main/miniDrawer'
import ButtonAppBar from '../components/main/appBar';
import ViewFlightInformation from '../components/dashboard/flightInformation';
import ViewWeather from '../components/information/viewWeather';
import Chat from '../components/dashboard/chat';
import UserService from '../components/action/singleton/UserService';
import StaffInformation from '../components/dashboard/staffInformation';
import TestForm from '../components/dashboard/testForm';
import JobVacancies from '../components/dashboard/jobVacancies';
import ViewSchedule from '../components/dashboard/viewSchedule';
import CrewInformation from '../components/dashboard/crewInformation';
import PassengerInformation from '../components/dashboard/passengerInformation';

export default function first() {
    // User
    const [userData, setUserData] = React.useState(null);
    const [content, setContent] = React.useState('flight')

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const userService = UserService.getInstance();
                const data = await userService.fetchUserData();
                setUserData(data);
            }catch{
                console.log("Error");
            }
        };

        fetchUserData();
    },[]);

    if(userData)
    {
        console.log(userData);
    }

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
      };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <div style={{
            minWidth: '100vw',
            minHeight: '100vh',
            backgroundColor: 'rgba(248,249,250,255)',
            display: 'flex',
            flexDirection: 'row',
        }}>
            {/* Drawer */}
            <div style = {{
                backgroundColor: 'rgba(248,249,250,255)',
            }}>
                {userData && (
                    <MiniDrawer 
                        drawerOpen={true} 
                        onSelectContent={(item) => setContent(item)}
                        userRole={userData.role} 
                    />
                )}
            </div>

            {/* Content */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                height: '100vh'
            }}>
                <div style={{
                    height: '120px',
                }}>
                    <ButtonAppBar drawerOpen={true} handleDrawerToggle={handleDrawerToggle} userName={userData? userData.role : "Loading . . . "} ></ButtonAppBar>
                </div>
                <div style = {{
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY : 'auto',
                    padding: '32px',
                    height: 'auto',
                }}> 
                    {/* Content Child */}
                    <div 
                        style={{
                            height: 'auto',
                            overflowY: 'auto',
                        }}
                    >
                        {content === "/flight" && <ViewFlightInformation/>}
                        {content === "/chat" && <Chat/>}
                        {content === "/weather" && <ViewWeather/>}
                        {content === "/staff" && <StaffInformation/>}
                        {content === "/test" && <TestForm/>}
                        {content === "/job" && <JobVacancies/>}
                        {content === "/schedule" && <ViewSchedule/>}
                        {content === "/crew" && <CrewInformation/>}
                        {content === "/passenger" && <PassengerInformation/>}
                    </div>
                </div>
            </div>
        </div>
    );
}