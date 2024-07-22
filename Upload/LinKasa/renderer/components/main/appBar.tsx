import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import prof1 from '../../public/images/1.png'
import Image from 'next/image';

const ButtonAppBar = ({drawerOpen, handleDrawerToggle, userName}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        px:4,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <AppBar position="static" sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          boxShadow: '0 2px 4px 0px rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(14.5px)',
          WebkitBackdropFilter: 'blur(14.5px)',
          borderRadius: '10px',
          marginLeft: '2px',
          width: '100%',
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
        <Toolbar>
          <IconButton 
            sx={{
              mr:1,
              color:"black" 
            }}
            size="large"
            edge="start"
            onClick={handleDrawerToggle}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black'}}>
            {userName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
  {/* notification */}
  <Box sx={{ mx: 1.5
   }}>
    <IconButton 
      sx={{
        color: "black",
      }}
      size="large"
      edge="start"
    >
      <NotificationsIcon />
    </IconButton>
  </Box>
  {/* friend */}
  <Box sx={{ mx: 1.5
   }}>
    <IconButton 
      sx={{
        color: "black",
      }}
      size="large"
      edge="start"
    >
      <PeopleAltIcon />
    </IconButton>
  </Box>
  {/* profile */}
  <Box sx={{ 
      mx: 1.5
      ,
}}>
<Image 
  width='40%'
  height='40%'
  src={prof1}
  style={{
    borderRadius: '50%',
  }}
      >
    </Image>
  </Box>
  </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar;