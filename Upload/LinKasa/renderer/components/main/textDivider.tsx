import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const DrawerDivider = ({ text, open }) => {
  return (
    <ListItem sx={{ pt: 3, pb: 0, color: 'text.secondary' }}>
      <ListItemText primary={
        <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.875rem',  opacity: open ? 1 : 0 }}>
          {text}
        </Typography>
      } />
    </ListItem>
  );
};

export default DrawerDivider;
