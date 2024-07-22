import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const DrawerItemList = ({ title, referencedTo, IconComponent, open, isActive, onClick }) => {
  return (
    <ListItem disablePadding sx={{ display: 'block', px : 1.5, py : 0.25}}>
      <ListItemButton
        sx={{
          height: 60,
          minHeight: 60,
          justifyContent: open ? 'initial' : 'center',
          borderRadius: '6px',
          boxShadow: isActive ? 'rgba(0, 0, 0, 0.3) 0px 4px 8px, rgba(0, 0, 0, 0.22) 0px 2px 2px' : 'none',
          my: isActive ? 1.5 : 0,
          backgroundColor: isActive ? '#ffffff' : 'transparent',
          transition: 'background-color 0.3s, box-shadow 0.3s, margin 0.3s',
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            fontWeight: 'bold',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 2px 2px 0px rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(14.5px)',
            WebkitBackdropFilter: 'blur(14.5px)',
            '& .MuiSvgIcon-root': {
              fontSize: '1.5rem', // Adjust this value to make the icon smaller
            },
          }}
        >
          <IconComponent />
        </ListItemIcon>
        <ListItemText 
          primary={title} 
          sx={{
            color: 'text.secondary',
            my: 0,
            opacity: open ? 1 : 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            '.MuiListItemText-primary': {
              fontSize: '1rem',
              fontWeight: 'bold',
            }
          }} 
        />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItemList;
